"use client";

import { useState } from "react";
import clsx from "clsx";
import { GiftIllustration } from "@/components/gifts/GiftIllustration";
import { getAmazonAffiliateLinkRel } from "@/lib/affiliate";

interface GiftVisualProps {
  title: string;
  category: string;
  imageUrl?: string;
  link?: string;
  compact?: boolean;
}

/**
 * Product photos are off for now: most gifts have no photo and several of the
 * stock photos did not match their gift. Every card shows an illustration of
 * the gift instead. Set this to true to show `imageUrl` photos again.
 */
const SHOW_PHOTOS = false;

// Every theme is dark enough for the white title text that sits on top of it.
const categoryThemes: Record<string, string> = {
  "Tech / Electronics": "from-slate-900 via-slate-800 to-slate-600",
  Gaming: "from-[#312e81] via-[#4338ca] to-[#6d5bd0]",
  Music: "from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6]",
  Art: "from-[#9d174d] via-[#be3a6b] to-[#e0718f]",
  Books: "from-[#78350f] via-[#92541f] to-[#b9783a]",
  Stationery: "from-[#57534e] via-[#78716c] to-[#a39b93]",
  Keepsakes: "from-[#7c2d12] via-[#a8492b] to-[#d0785a]",
  Jewelry: "from-[#854d0e] via-[#a8691a] to-[#c9953f]",
  Fashion: "from-[#3f3f46] via-[#57575f] to-[#7c7c86]",
  Beauty: "from-[#9f1239] via-[#c2416b] to-[#e68aa5]",
  "Self-care": "from-[#155e75] via-[#1f7f97] to-[#4fa9bd]",
  Baby: "from-[#0e7490] via-[#3b93a8] to-[#7fbccb]",
  Toys: "from-[#c2410c] via-[#dd6b20] to-[#f0994a]",
  Games: "from-[#3730a3] via-[#4f46b8] to-[#7a72d6]",
  Food: "from-[#b45309] via-[#c96a1c] to-[#e0934a]",
  Cooking: "from-[#9a3412] via-[#b84f22] to-[#d97b4f]",
  Home: "from-[#365314] via-[#4d6b2a] to-[#7d9654]",
  Travel: "from-[#075985] via-[#0f76a8] to-[#4ba3cc]",
  Outdoors: "from-[#14532d] via-[#1f6b3d] to-[#4a9163]",
  Sports: "from-[#166534] via-[#22804a] to-[#55a873]",
  Fitness: "from-[#115e59] via-[#1a7f78] to-[#4dab9f]",
  Pets: "from-[#7c2d12] via-[#9a4a23] to-[#c48154]",
  Experiences: "from-spruce via-[#285344] to-[#406f60]"
};

function getVisualTheme(category: string) {
  return categoryThemes[category] ?? "from-spruce via-[#285344] to-[#406f60]";
}

export function GiftVisual({ title, category, imageUrl, link, compact = false }: GiftVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = SHOW_PHOTOS && Boolean(imageUrl) && !imageFailed;

  const content = (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br text-white",
        getVisualTheme(category),
        compact ? "h-[164px] p-4" : "h-[184px] p-5"
      )}
    >
      {showImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImageFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10" />
          <GiftIllustration
            title={title}
            category={category}
            className="absolute -bottom-6 right-4 h-36 w-36 text-white/10"
          />
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <span className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-[1.75rem] border border-white/30 bg-white/15 text-white shadow-lg shadow-black/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <GiftIllustration title={title} category={category} className="h-14 w-14" />
            </span>
          </div>
        </>
      )}
      <span className="relative inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
        {category}
      </span>
    </div>
  );

  if (!link) {
    return content;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel={getAmazonAffiliateLinkRel()}
      className="block rounded-[1.75rem] focus:outline-none focus:ring-2 focus:ring-coral/30"
      aria-label={`View ${title} on Amazon in a new tab`}
    >
      {content}
    </a>
  );
}
