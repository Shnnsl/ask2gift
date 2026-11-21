import { FavoriteButton } from "@/components/results/FavoriteButton";
import { GiftVisual } from "@/components/results/GiftVisual";
import {
  buildAmazonSearchQuery,
  buildAmazonSearchUrl,
  getAmazonAffiliateLinkRel,
  getAmazonBudgetMessage
} from "@/lib/affiliate";
import type { QuizAnswers, RecommendationResult } from "@/types/gift";

interface RecommendationCardProps {
  recommendation: RecommendationResult;
  answers: QuizAnswers;
  isTopResult?: boolean;
}

function getMatchLabel(score: number) {
  if (score >= 90) {
    return { label: "Perfect match", tone: "bg-spruce text-white" };
  }

  if (score >= 78) {
    return { label: "Great match", tone: "bg-mist text-spruce" };
  }

  if (score >= 62) {
    return { label: "Good match", tone: "bg-sand text-ink" };
  }

  return { label: "Worth a look", tone: "bg-slate-100 text-slate-600" };
}

export function RecommendationCard({ recommendation, answers, isTopResult = false }: RecommendationCardProps) {
  const match = getMatchLabel(recommendation.score);
  const amazonSearchQuery = buildAmazonSearchQuery(recommendation, answers);
  const amazonUrl = buildAmazonSearchUrl(amazonSearchQuery);
  const budgetMessage = getAmazonBudgetMessage(answers.budget, recommendation.priceRange);

  return (
    <article className="result-card p-4 sm:p-5">
      <GiftVisual title={recommendation.title} category={recommendation.category} imageUrl={recommendation.imageUrl} />

      <div className="px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          {isTopResult ? (
            <span className="inline-flex items-center rounded-full bg-coral px-3 py-1 text-xs font-semibold tracking-[0.08em] text-white">
              Best match
            </span>
          ) : null}
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${match.tone}`}>
            {match.label}
            <span className="ml-2 font-medium opacity-80">{recommendation.score}/100</span>
          </span>
          <span className="chip">{recommendation.priceRange}</span>
          {recommendation.experienceGift ? <span className="chip">Experience gift</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{recommendation.title}</h2>
        <p className="mt-3 text-[15px] text-slate-600">{recommendation.description}</p>

        <div className="mt-5 rounded-[1.75rem] bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ink">Why it matches</p>
          <p className="mt-2 text-sm text-slate-600">{recommendation.whyItFits}</p>
          {budgetMessage ? <p className="mt-3 text-sm text-slate-600">Budget fit: {budgetMessage}</p> : null}
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
          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel={getAmazonAffiliateLinkRel()}
              className="button-primary w-full sm:w-auto"
              aria-label={`View ${recommendation.title} on Amazon in a new tab (paid link)`}
            >
              View on Amazon
            </a>
          ) : (
            <span className="inline-flex w-full items-center justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500 sm:w-auto">
              Amazon link unavailable
            </span>
          )}
          <FavoriteButton giftId={recommendation.id} />
        </div>
        <p className="mt-3 text-xs text-slate-500">Paid link</p>
      </div>
    </article>
  );
}
