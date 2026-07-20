"use client";

import { useState } from "react";
import clsx from "clsx";
import { getOutboundLinkRel } from "@/lib/affiliate";

interface GiftVisualProps {
  title: string;
  category: string;
  imageUrl?: string;
  link?: string;
  compact?: boolean;
}

const categoryThemes: Record<string, string> = {
  "Tech / Electronics": "from-slate-900 via-slate-800 to-slate-700 text-white",
  Art: "from-[#f6e6d8] via-[#f3d4c5] to-[#f8eee7] text-slate-800",
  Books: "from-[#f2e7d8] via-[#e7d2b8] to-[#f8f2ea] text-slate-800",
  Experience: "from-spruce via-[#285344] to-[#406f60] text-white",
  Cooking: "from-[#f6d8c7] via-[#f3c4ac] to-[#fcefe7] text-slate-800",
  Travel: "from-[#dfece7] via-[#cfe3da] to-[#eef6f2] text-slate-800",
  Music: "from-[#ece4f5] via-[#dbd0ec] to-[#f6f2fb] text-slate-800",
  Entertainment: "from-[#f6e4d6] via-[#f5d2bb] to-[#fdf4ed] text-slate-800",
  Sports: "from-[#dfece7] via-[#c7e0d2] to-[#eef7f1] text-slate-800",
  Jewelry: "from-[#f8ead8] via-[#f2dcc4] to-[#fcf5ee] text-slate-800",
  "Home Decor": "from-[#ece7df] via-[#e1d6c7] to-[#f8f5f0] text-slate-800"
};

function getVisualTheme(category: string) {
  return categoryThemes[category] ?? "from-slate-100 via-white to-slate-50 text-slate-800";
}

function getInitials(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function GiftVisual({ title, category, imageUrl, link, compact = false }: GiftVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  const content = (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br",
        getVisualTheme(category),
        compact ? "min-h-[170px] p-5" : "min-h-[240px] p-6 sm:p-7"
      )}
    >
      {showImage ? (
        <>
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImageFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />
        </>
      ) : (
        <>
          <div className="subtle-grid absolute inset-0 opacity-60" />
          <div className="absolute -right-8 top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-white/25 blur-3xl" />
        </>
      )}
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center">
          <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="max-w-[16rem] text-lg font-semibold leading-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.18)]">
              {title}
            </p>
            <p className="mt-2 max-w-[18rem] text-sm text-white/85">
              {showImage ? "Gift idea preview" : "Image unavailable, but the gift details are still ready to explore."}
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-lg font-semibold text-white backdrop-blur-sm">
            {getInitials(title)}
          </div>
        </div>
      </div>
    </div>
  );

  if (!link) {
    return content;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel={getOutboundLinkRel()}
      className="block rounded-[1.75rem] focus:outline-none focus:ring-2 focus:ring-coral/30"
      aria-label={`View ${title}`}
    >
      {content}
    </a>
  );
}
