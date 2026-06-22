export const dynamic = "force-dynamic";

import { getSection } from "@/actions/homepage";
import SiteCmsClient from "./SiteCmsClient";
import { getSiteCmsPreset } from "@/lib/site-cms-presets";

export default async function SiteCmsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key: rawKey } = await searchParams;
  const activePreset = getSiteCmsPreset(rawKey && rawKey.trim() ? rawKey.trim() : "page-home-layout");
  const data = await getSection(activePreset.key);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">JSON-backed content</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Global chrome and page shell editor
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          Use this editor for header, footer, page-level breadcrumb copy, and layout blocks that are not part of a
          structured collection. Each key falls back to a file in <code className="text-slate-700">data/</code> until
          you save an override into the database.
        </p>
      </section>

      <SiteCmsClient
        initialKey={activePreset.key}
        initialJson={JSON.stringify(data, null, 2)}
      />
    </div>
  );
}
