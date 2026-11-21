import { FavoriteButton } from "@/components/results/FavoriteButton";
import { GiftVisual } from "@/components/results/GiftVisual";
import { getAmazonAffiliateLinkRel, getGiftAmazonUrl } from "@/lib/affiliate";
import type { GiftItem, QuizAnswers } from "@/types/gift";

interface GiftCardProps {
  gift: GiftItem;
  /** Optional context (for example the guide's occasion) used to sharpen the Amazon search. */
  context?: Partial<QuizAnswers>;
  /** Position in a numbered list, starting at 1. */
  position?: number;
}

/** Gift card used on gift guides and the favorites page. */
export function GiftCard({ gift, context, position }: GiftCardProps) {
  const amazonUrl = getGiftAmazonUrl(gift, context);

  return (
    <article className="result-card flex flex-col p-4 sm:p-5">
      <GiftVisual title={gift.title} category={gift.category} imageUrl={gift.imageUrl} compact />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          {position ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-spruce text-xs font-semibold text-white">
              {position}
            </span>
          ) : null}
          <span className="chip">{gift.priceRange}</span>
          {gift.experienceGift ? <span className="chip">Experience gift</span> : null}
        </div>
        <h3 className="mt-4 text-xl font-semibold">{gift.title}</h3>
        <p className="mt-2 text-[15px] text-slate-600">{gift.description}</p>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-ink">Why it works: </span>
          {gift.whyItFits}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
          {amazonUrl ? (
            <a
              href={amazonUrl}
              target="_blank"
              rel={getAmazonAffiliateLinkRel()}
              className="button-primary w-full sm:w-auto"
              aria-label={`View ${gift.title} on Amazon in a new tab (paid link)`}
            >
              View on Amazon
            </a>
          ) : null}
          <FavoriteButton giftId={gift.id} />
        </div>
        <p className="mt-3 text-xs text-slate-500">Paid link</p>
      </div>
    </article>
  );
}
