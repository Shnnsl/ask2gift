import Link from "next/link";
import type { GiftGuide } from "@/lib/guides";

interface GuideTilesProps {
  guides: GiftGuide[];
  tone?: "festive" | "plain";
}

export function GuideTiles({ guides, tone = "plain" }: GuideTilesProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link
            href={`/gift-guides/${guide.slug}`}
            className={`card-hover flex h-full items-center justify-between gap-4 rounded-[1.5rem] border p-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-coral/40 ${
              tone === "festive"
                ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                : "border-slate-200/80 bg-white text-ink hover:border-coral/40"
            }`}
          >
            <span>
              <span className="block text-lg font-semibold">{guide.label}</span>
              <span className={`mt-1 block text-sm ${tone === "festive" ? "text-white/80" : "text-slate-600"}`}>
                {guide.title}
              </span>
            </span>
            <span aria-hidden="true" className="text-xl">&rarr;</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
