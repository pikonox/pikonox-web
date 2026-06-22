import { getAdminConnectionAudit } from "@/lib/adminConnectionAudit";
import type { AuditStatus } from "@/lib/adminConnectionAudit";
import { AlertTriangle, CheckCircle2, Plug, XCircle } from "lucide-react";

function statusClasses(status: AuditStatus) {
  if (status === "ok") {
    return {
      ring: "border-emerald-200 bg-emerald-50/70",
      iconBg: "bg-emerald-500/12 text-emerald-700",
      Icon: CheckCircle2,
    };
  }

  if (status === "warn") {
    return {
      ring: "border-amber-200 bg-amber-50/70",
      iconBg: "bg-amber-500/12 text-amber-700",
      Icon: AlertTriangle,
    };
  }

  return {
    ring: "border-rose-200 bg-rose-50/70",
    iconBg: "bg-rose-500/12 text-rose-700",
    Icon: XCircle,
  };
}

export default async function AdminConnectionAudit() {
  const { items, allOk } = await getAdminConnectionAudit();

  return (
    <section
      className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7"
      aria-labelledby="connection-audit-heading"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sky-300">
            <Plug className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Runtime checks
            </p>
            <h2 id="connection-audit-heading" className="mt-2 text-xl font-semibold text-slate-950">
              Environment and service connections
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              These checks only show status, not values. Use them to verify database reachability, auth secrets,
              and upload storage before handoff.
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${
            allOk ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {allOk ? "All required services are ready" : "Some required services still need attention"}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const ui = statusClasses(item.status);
          const Icon = ui.Icon;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 shadow-sm ${ui.ring}`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${ui.iconBg}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-950">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs leading-6 text-slate-500">
        Minimum viable stack: PostgreSQL + <code className="text-slate-700">DATABASE_URL</code>, then{" "}
        <code className="text-slate-700">npx prisma migrate deploy</code> or{" "}
        <code className="text-slate-700">npx prisma db push</code>. Replace demo login before production release.
      </p>
    </section>
  );
}
