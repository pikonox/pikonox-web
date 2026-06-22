export type AuditStatus = "ok" | "warn" | "error";

export type ConnectionAuditItem = {
  id: string;
  label: string;
  status: AuditStatus;
  detail: string;
};

export type ConnectionAuditResult = {
  items: ConnectionAuditItem[];
  allOk: boolean;
};

const DEFAULT_JWT_PLACEHOLDER = "techelement-super-secret-key-change-in-prod";

export async function getAdminConnectionAudit(): Promise<ConnectionAuditResult> {
  const items: ConnectionAuditItem[] = [];
  const isProd = process.env.NODE_ENV === "production";

  const dbUrl = process.env.DATABASE_URL?.trim();
  if (!dbUrl) {
    items.push({
      id: "database_url",
      label: "DATABASE_URL",
      status: "error",
      detail:
        "Not set. Add a PostgreSQL connection string to `.env` (see Prisma `datasource`). Without it the app cannot save or load admin content.",
    });
  } else {
    try {
      const { prisma } = await import("@/lib/db");
      // Race with a 8s timeout so the dashboard doesn't hang if DB is slow
      await Promise.race([
        prisma.$queryRawUnsafe("SELECT 1"),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("ping timed out after 8s")), 8_000),
        ),
      ]);
      items.push({
        id: "database",
        label: "PostgreSQL (via Prisma)",
        status: "ok",
        detail: "Database is reachable and accepts queries.",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      items.push({
        id: "database",
        label: "PostgreSQL (via Prisma)",
        status: "error",
        detail: `Connection failed: ${msg.slice(0, 120)}`,
      });
    }
  }

  const jwt = process.env.JWT_SECRET?.trim();
  if (!jwt) {
    items.push({
      id: "jwt_secret",
      label: "JWT_SECRET",
      status: isProd ? "error" : "warn",
      detail: isProd
        ? "Required in production for secure admin sessions. Set a long random string in `.env`."
        : "Not set; a development fallback is used. Set JWT_SECRET before going to production.",
    });
  } else if (jwt === DEFAULT_JWT_PLACEHOLDER) {
    items.push({
      id: "jwt_secret",
      label: "JWT_SECRET",
      status: "warn",
      detail: "Still using the default placeholder value. Change it to a unique secret in production.",
    });
  } else {
    items.push({
      id: "jwt_secret",
      label: "JWT_SECRET",
      status: "ok",
      detail: "Set. Admin login sessions are signed with this secret.",
    });
  }

  const uploadDir = process.env.UPLOAD_DIR?.trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (uploadDir && !siteUrl) {
    items.push({
      id: "site_url",
      label: "NEXT_PUBLIC_SITE_URL",
      status: "warn",
      detail:
        "UPLOAD_DIR is set but NEXT_PUBLIC_SITE_URL is missing. Some upload flows expect a public site base URL for absolute links—set it to your deployed origin (e.g. https://example.com).",
    });
  } else if (!uploadDir) {
    items.push({
      id: "uploads",
      label: "File uploads",
      status: "ok",
      detail: "Using default `public/uploads`. Optional: set UPLOAD_DIR to store files elsewhere.",
    });
  } else {
    items.push({
      id: "site_url",
      label: "NEXT_PUBLIC_SITE_URL",
      status: siteUrl ? "ok" : "warn",
      detail: siteUrl
        ? "Set together with UPLOAD_DIR for consistent public asset URLs."
        : "Consider setting NEXT_PUBLIC_SITE_URL when using a custom upload directory.",
    });
  }

  const allOk = items.every((i) => i.status === "ok");
  return { items, allOk };
}
