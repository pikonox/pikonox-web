"use client";

import { updateSection } from "@/actions/homepage";
import {
  buildSiteCmsHref,
  getSiteCmsPreset,
  SITE_CMS_GROUP_LABELS,
  SITE_CMS_PRESETS,
} from "@/lib/site-cms-presets";
import { cn } from "@/lib/utils";
import { CheckCircle2, Database, FileText, Info, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function SiteCmsClient({
  initialKey,
  initialJson,
}: {
  initialKey: string;
  initialJson: string;
}) {
  const router = useRouter();
  const [jsonText, setJsonText] = useState(initialJson);
  const [pending, startTransition] = useTransition();
  const activePreset = useMemo(() => getSiteCmsPreset(initialKey), [initialKey]);

  useEffect(() => {
    setJsonText(initialJson);
  }, [initialJson, initialKey]);

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sky-300">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">{activePreset.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{activePreset.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {Object.entries(SITE_CMS_GROUP_LABELS).map(([groupKey, groupLabel]) => {
            const groupItems = SITE_CMS_PRESETS.filter((preset) => preset.group === groupKey);

            return (
              <section key={groupKey}>
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {groupLabel}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {groupItems.map((preset) => {
                    const active = preset.key === initialKey;
                    return (
                      <li key={preset.key}>
                        <button
                          type="button"
                          onClick={() => router.replace(buildSiteCmsHref(preset.key))}
                          className={cn(
                            "w-full rounded-2xl px-4 py-3 text-left transition",
                            active
                              ? "bg-slate-950 text-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.9)]"
                              : "hover:bg-slate-50",
                          )}
                        >
                          <span className="block text-sm font-medium">{preset.label}</span>
                          <span
                            className={cn(
                              "mt-1 block text-xs leading-5",
                              active ? "text-slate-300" : "text-slate-500",
                            )}
                          >
                            {preset.description}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </aside>

      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Editor</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">{activePreset.label}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">{activePreset.description}</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
            <Info className="h-4 w-4 text-sky-500" />
            Edit valid JSON only. Keys fall back to <code className="text-slate-800">data/{activePreset.key}.json</code>.
          </div>
        </div>

        <div className="mt-5 rounded-[26px] border border-slate-200 bg-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <FileText className="h-4 w-4 text-sky-300" />
              JSON override
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Database value overrides fallback file after save
            </div>
          </div>

          <textarea
            className="min-h-[680px] w-full resize-y bg-transparent px-4 py-4 font-mono text-xs leading-6 text-slate-100 outline-none"
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                try {
                  const parsed = JSON.parse(jsonText);
                  const res = await updateSection(initialKey, parsed);
                  if (res.success) {
                    toast.success("Section saved");
                    router.refresh();
                  } else {
                    toast.error(res.error ?? "Save failed");
                  }
                } catch {
                  toast.error("Invalid JSON. Fix the syntax and save again.");
                }
              });
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {pending ? "Saving..." : "Save override"}
          </button>

          <button
            type="button"
            onClick={() => setJsonText(initialJson)}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset editor to current value
          </button>
        </div>
      </section>
    </div>
  );
}
