"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { giftCatalog } from "@/data/gifts";
import { buildOutboundProductUrl, getOutboundLinkRel } from "@/lib/affiliate";
import { readFavoriteIds } from "@/lib/storage";
import { FavoriteButton } from "@/components/results/FavoriteButton";
import { GiftVisual } from "@/components/results/GiftVisual";

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
              Save gift ideas from your results and they will show up here in this browser. The code is structured so this can later move to database-backed accounts.
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
            These are stored locally in the browser for now, which keeps the experience simple while leaving room for future account-based saving.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {favorites.map((gift) => {
            const giftUrl = buildOutboundProductUrl(gift.link);

            return (
              <article key={gift.id} className="result-card p-4 sm:p-5">
                <GiftVisual title={gift.title} category={gift.category} imageUrl={gift.imageUrl} link={giftUrl ?? undefined} compact />
                <div className="px-2 pb-2 pt-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="chip">{gift.category}</span>
                    <span className="chip">{gift.priceRange}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{gift.title}</h2>
                  <p className="mt-3 text-[15px] text-slate-600">{gift.description}</p>
                  <p className="mt-5 text-sm text-slate-600">{gift.whyItFits}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {giftUrl ? (
                      <a href={giftUrl} target="_blank" rel={getOutboundLinkRel()} className="button-primary w-full sm:w-auto">
                        View Gift
                      </a>
                    ) : (
                      <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 sm:w-auto">
                        Gift link unavailable
                      </span>
                    )}
                    <FavoriteButton giftId={gift.id} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
