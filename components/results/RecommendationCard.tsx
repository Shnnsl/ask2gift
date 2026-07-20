import { FavoriteButton } from "@/components/results/FavoriteButton";
import { GiftVisual } from "@/components/results/GiftVisual";
import { buildOutboundProductUrl, getOutboundLinkRel } from "@/lib/affiliate";
import type { RecommendationResult } from "@/types/gift";

interface RecommendationCardProps {
  recommendation: RecommendationResult;
  isTopResult?: boolean;
}

function getMatchLabel(score: number) {
  if (score >= 95) {
    return { label: "Perfect match", tone: "bg-spruce text-white" };
  }

  if (score >= 85) {
    return { label: "Great match", tone: "bg-mist text-spruce" };
  }

  if (score >= 70) {
    return { label: "Good match", tone: "bg-sand text-ink" };
  }

  return { label: "Match", tone: "bg-slate-100 text-slate-600" };
}

export function RecommendationCard({ recommendation, isTopResult = false }: RecommendationCardProps) {
  const match = getMatchLabel(recommendation.score);
  const viewGiftUrl = buildOutboundProductUrl(recommendation.link);

  return (
    <article className="result-card p-4 sm:p-5">
      <div className="relative">
        <GiftVisual
          title={recommendation.title}
          category={recommendation.category}
          imageUrl={recommendation.imageUrl}
          link={viewGiftUrl ?? undefined}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isTopResult ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-spruce shadow-sm">
              Best Match
            </span>
          ) : null}
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip">{recommendation.category}</span>
              <span className="chip">{recommendation.priceRange}</span>
              {recommendation.experienceGift ? <span className="chip">Experience gift</span> : null}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{recommendation.title}</h2>
            <p className="mt-3 text-[15px] text-slate-600">{recommendation.description}</p>
          </div>
          <div className={`rounded-full px-4 py-2 text-sm font-semibold ${match.tone}`}>
            {match.label}
            <span className="ml-2 text-xs font-medium opacity-80">{recommendation.score}/100</span>
          </div>
        </div>

        <div className="mt-5 rounded-[1.75rem] bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">Why it matches</p>
          <p className="mt-2 text-sm text-slate-600">{recommendation.whyItFits}</p>
          {recommendation.matchReasons.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {recommendation.matchReasons.slice(0, 3).map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-coral" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {viewGiftUrl ? (
            <a href={viewGiftUrl} target="_blank" rel={getOutboundLinkRel()} className="button-primary w-full sm:w-auto">
              View Gift
            </a>
          ) : (
            <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 sm:w-auto">
              Gift link unavailable
            </span>
          )}
          <FavoriteButton giftId={recommendation.id} />
        </div>
      </div>
    </article>
  );
}
