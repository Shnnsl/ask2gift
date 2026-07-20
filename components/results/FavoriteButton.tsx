"use client";

import { useEffect, useState } from "react";
import { readFavoriteIds, writeFavoriteIds } from "@/lib/storage";

interface FavoriteButtonProps {
  giftId: string;
}

export function FavoriteButton({ giftId }: FavoriteButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(readFavoriteIds().includes(giftId));
  }, [giftId]);

  const toggleSave = () => {
    const favorites = readFavoriteIds();
    const nextFavorites = favorites.includes(giftId)
      ? favorites.filter((id) => id !== giftId)
      : [...favorites, giftId];

    writeFavoriteIds(nextFavorites);
    setIsSaved(nextFavorites.includes(giftId));
  };

  return (
    <button
      type="button"
      onClick={toggleSave}
      className={`w-full rounded-full px-5 py-3 text-sm font-semibold sm:w-auto ${
        isSaved
          ? "border border-spruce/20 bg-mist text-spruce hover:bg-mist/80"
          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {isSaved ? "Saved to favorites" : "Save to favorites"}
    </button>
  );
}
