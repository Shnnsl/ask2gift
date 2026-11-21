"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { giftCatalog } from "@/data/gifts";
import { readFavoriteIds } from "@/lib/storage";
import { GiftCard } from "@/components/gifts/GiftCard";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";

export function FavoritesClient() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(readFavoriteIds());
    const syncFavorites = () => setFavoriteIds(readFavoriteIds());
    window.addEventListener("storage", syncFavorites);
    window.addEventListener("focus", syncFavorites);
    window.addEventListener("ask2gift:favorites-updated", syncFavorites);
    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("focus", syncFavorites);
      window.removeEventListener("ask2gift:favorites-updated", syncFavorites);
    };
  }, []);

  const favorites = giftCatalog.filter((gift) => favoriteIds.includes(gift.id));

  if (favorites.length === 0) {
    return (
      <section className="section-space">
        <div className="container-shell">
          <div className="surface max-w-3xl p-6 sm:p-8">
            <span className="chip">Saved picks</span>
            <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">No saved favorites yet</h1>
            <p className="mt-4">
              Save gift ideas from your results and they will show up here in this browser.
            </p>
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm font-semibold text-ink">A simple shortlist for later</p>
              <p className="mt-2 text-sm text-slate-600">When you save gifts, this page becomes your quick comparison space for the ideas worth revisiting.</p>
            </div>
            <div className="mt-8">
              <Link href="/quiz" className="button-primary w-full sm:w-auto">
                Find gift ideas
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="surface p-6 sm:p-8">
          <span className="chip">Saved picks</span>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Your favorite gift ideas</h1>
          <p className="mt-4 max-w-3xl text-lg">
            Your shortlist is saved in this browser, so it will be here when you come back on this device.
          </p>
        </div>
        <div className="mt-6">
          <AffiliateDisclosure compact />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </div>
    </section>
  );
}
