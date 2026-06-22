import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL!;
  const url = new URL(rawUrl);
  const schema = url.searchParams.get("schema") ?? "xiomtech";

  // Parse individual fields to avoid PrismaPg v7 URL parsing bug
  // (adapter was treating ?schema= as part of the database name → P1003)
  const pool = new pg.Pool({
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    options: `-c search_path=${schema}`,
    ssl:
      url.searchParams.get("sslmode") === "require"
        ? { rejectUnauthorized: false }
        : false,
    max: 5,
    idleTimeoutMillis: 60_000,
    connectionTimeoutMillis: 15_000,
    allowExitOnIdle: false,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
  });

  pool.on("error", (err) => {
    console.error("[db] pool error:", err.message);
  });

  const adapter = new PrismaPg(pool, { schema });
  return new PrismaClient({ adapter });
}

// Singleton — prevents pool exhaustion in dev and production
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;
