import { giftCatalog } from "../data/gifts.ts";
import { budgetOrder } from "./quiz.ts";
import type {
  AgeRange,
  GiftItem,
  Interest,
  Occasion,
  QuizAnswers,
  RecommendationResult
} from "../types/gift.ts";

const MAX_RESULTS = 6;
const GOOD_MATCH_SCORE = 62;

/**
 * How much each quiz answer contributes to the match score. A gift that fits
 * every answered question scores 100. Questions the shopper skipped (or
 * answered with "No range" / "Prefer not to say") are left out of the total.
 */
const WEIGHTS = {
  occasion: 30,
  interests: 22,
  recipient: 18,
  budget: 15,
  styles: 10,
  age: 3,
  gender: 2
} as const;

const CHILD_AGES: ReadonlySet<AgeRange> = new Set<AgeRange>(["Under 13", "13-17"]);

/** Occasions where the gift is really for a couple or household, not one person. */
const SHARED_OCCASIONS: ReadonlySet<Occasion> = new Set<Occasion>(["Wedding", "Baby Shower"]);

/** Gifts in these categories only make sense when the shopper picked the matching interest. */
const INTEREST_GATED_CATEGORIES: Record<string, Interest> = {
  Gaming: "Gaming",
  Pets: "Pets"
};

const OCCASION_LABELS: Record<Occasion, string> = {
  Birthday: "birthdays",
  Anniversary: "anniversaries",
  Christmas: "Christmas",
  Holiday: "the holidays",
  "Valentine's Day": "Valentine's Day",
  Graduation: "graduations",
  Wedding: "weddings",
  "Baby Shower": "baby showers",
  "Thank You": "saying thank you",
  "Just Because": "a just-because surprise"
};

type OccasionFit = "signature" | "suitable" | "none";

interface ScoredGift {
  result: RecommendationResult;
  occasionFit: OccasionFit;
  budgetDistance: number;
}

function normalizeAnswers(answers: QuizAnswers): QuizAnswers {
  return {
    gender: answers?.gender ?? "",
    recipientType: answers?.recipientType ?? "",
    ageRange: answers?.ageRange ?? "",
    occasion: answers?.occasion ?? "",
    budget: answers?.budget ?? "",
    interests: Array.isArray(answers?.interests) ? answers.interests : [],
    styles: Array.isArray(answers?.styles) ? answers.styles : []
  };
}

function joinReasonList(items: string[]) {
  const lower = items.map((item) => item.toLowerCase());
  if (lower.length === 1) return lower[0];
  if (lower.length === 2) return `${lower[0]} and ${lower[1]}`;
  return `${lower.slice(0, -1).join(", ")}, and ${lower[lower.length - 1]}`;
}

/** Christmas and Holiday are treated as the same season when matching. */
function getOccasionAliases(occasion: Occasion): Occasion[] {
  if (occasion === "Christmas") return ["Christmas", "Holiday"];
  if (occasion === "Holiday") return ["Holiday", "Christmas"];
  return [occasion];
}

function getOccasionFit(gift: GiftItem, occasion: QuizAnswers["occasion"]): OccasionFit {
  if (!occasion) return "none";

  const aliases = getOccasionAliases(occasion);
  if (gift.bestFor?.some((item) => aliases.includes(item))) return "signature";
  if (gift.occasions.some((item) => aliases.includes(item))) return "suitable";
  return "none";
}

function hasBudget(answers: QuizAnswers) {
  return Boolean(answers.budget) && answers.budget !== "No range";
}

/** 0 = same range. Negative = cheaper than the shopper's range, positive = pricier. */
function getBudgetOffset(answers: QuizAnswers, gift: GiftItem) {
  if (!hasBudget(answers)) return 0;

  const quizIndex = budgetOrder.indexOf(answers.budget as (typeof budgetOrder)[number]);
  const giftIndex = budgetOrder.indexOf(gift.priceRange as (typeof budgetOrder)[number]);
  if (quizIndex === -1 || giftIndex === -1) return 0;

  return giftIndex - quizIndex;
}

function hasGenderPreference(answers: QuizAnswers): answers is QuizAnswers & { gender: "Male" | "Female" } {
  return answers.gender === "Male" || answers.gender === "Female";
}

function isAgeAppropriate(gift: GiftItem, answers: QuizAnswers) {
  // The shopper's age answer may describe the parent or the baby, so it is not used here.
  if (answers.occasion === "Baby Shower") return true;

  const adultGift = gift.ageRanges.some((age) => !CHILD_AGES.has(age));

  if (answers.ageRange) {
    if (CHILD_AGES.has(answers.ageRange)) {
      return gift.ageRanges.includes(answers.ageRange);
    }
    return adultGift;
  }

  // No age given: keep children's gifts for shoppers who said they are buying for a child.
  return adultGift || answers.recipientType === "Child";
}

function isGenderAppropriate(gift: GiftItem, answers: QuizAnswers) {
  return !hasGenderPreference(answers) || gift.genderTargets.includes(answers.gender);
}

function isInterestAppropriate(gift: GiftItem, answers: QuizAnswers) {
  const requiredInterest = INTEREST_GATED_CATEGORIES[gift.category];
  return !requiredInterest || answers.interests.includes(requiredInterest);
}

function scoreGift(gift: GiftItem, answers: QuizAnswers): ScoredGift {
  let earned = 0;
  let possible = 0;
  const matchReasons: string[] = [];

  // Occasion
  const occasionFit = getOccasionFit(gift, answers.occasion);
  if (answers.occasion) {
    possible += WEIGHTS.occasion;
    if (occasionFit === "signature") {
      earned += WEIGHTS.occasion;
      matchReasons.push(`A popular pick for ${OCCASION_LABELS[answers.occasion]}.`);
    } else if (occasionFit === "suitable") {
      earned += WEIGHTS.occasion * (2 / 3);
      matchReasons.push(`Works well for ${OCCASION_LABELS[answers.occasion]}.`);
    }
  }

  // Recipient
  if (answers.recipientType) {
    possible += WEIGHTS.recipient;
    const directMatch = gift.recipientTypes.includes(answers.recipientType);
    const buyingForChild = Boolean(answers.ageRange) && CHILD_AGES.has(answers.ageRange as AgeRange);
    const sharedOccasionGift =
      Boolean(answers.occasion) && SHARED_OCCASIONS.has(answers.occasion as Occasion) && occasionFit !== "none";

    if (directMatch) {
      earned += WEIGHTS.recipient;
      matchReasons.push(
        answers.recipientType === "Other"
          ? "An easy choice for almost anyone."
          : `Fits the ${answers.recipientType.toLowerCase()} you are shopping for.`
      );
    } else if (sharedOccasionGift || (buyingForChild && gift.recipientTypes.includes("Child"))) {
      earned += WEIGHTS.recipient;
    } else if (answers.recipientType === "Other") {
      earned += WEIGHTS.recipient / 2;
    }
  }

  // Interests
  const matchingInterests = gift.interests.filter((interest) => answers.interests.includes(interest));
  if (answers.interests.length > 0) {
    possible += WEIGHTS.interests;
    if (matchingInterests.length > 0) {
      const primaryMatch =
        answers.interests.includes(gift.interests[0]) ||
        (answers.interests as string[]).includes(gift.category);
      const base = primaryMatch ? WEIGHTS.interests - 3 : WEIGHTS.interests - 8;
      earned += Math.min(WEIGHTS.interests, base + (matchingInterests.length - 1) * 3);
      matchReasons.push(`Connects with their interest in ${joinReasonList(matchingInterests)}.`);
    }
  }

  // Gift style
  const matchingStyles = gift.styles.filter((style) => answers.styles.includes(style));
  if (answers.styles.length > 0) {
    possible += WEIGHTS.styles;
    if (matchingStyles.length > 0) {
      earned += matchingStyles.length > 1 ? WEIGHTS.styles : WEIGHTS.styles - 2;
      matchReasons.push(`Matches the ${joinReasonList(matchingStyles)} style you chose.`);
    }
  }

  // Budget
  const budgetOffset = getBudgetOffset(answers, gift);
  if (hasBudget(answers)) {
    possible += WEIGHTS.budget;
    if (budgetOffset === 0) {
      earned += WEIGHTS.budget;
      matchReasons.push("Within your selected budget.");
    } else if (budgetOffset === -1) {
      earned += WEIGHTS.budget * 0.6;
    } else if (budgetOffset === 1) {
      earned += WEIGHTS.budget / 3;
    }
  }

  // Age
  if (answers.ageRange) {
    possible += WEIGHTS.age;
    if (answers.occasion === "Baby Shower") {
      earned += WEIGHTS.age;
    } else if (gift.ageRanges.includes(answers.ageRange)) {
      earned += WEIGHTS.age;
      matchReasons.push(`Makes sense for the ${answers.ageRange.toLowerCase()} age range.`);
    }
  }

  // Gender
  if (hasGenderPreference(answers)) {
    possible += WEIGHTS.gender;
    if (gift.genderTargets.includes(answers.gender)) {
      earned += WEIGHTS.gender;
    }
  }

  const score = possible > 0 ? Math.round((earned / possible) * 100) : 0;

  return {
    result: { ...gift, score, matchReasons: matchReasons.slice(0, 5) },
    occasionFit,
    budgetDistance: Math.abs(budgetOffset)
  };
}

function compareScored(a: ScoredGift, b: ScoredGift) {
  if (b.result.score !== a.result.score) return b.result.score - a.result.score;

  // Ties: prefer signature picks for the occasion.
  const fitRank = { signature: 0, suitable: 1, none: 2 } as const;
  if (fitRank[a.occasionFit] !== fitRank[b.occasionFit]) return fitRank[a.occasionFit] - fitRank[b.occasionFit];
  // Then gifts aimed at fewer kinds of recipient, which are more specific to this person.
  if (a.result.recipientTypes.length !== b.result.recipientTypes.length) {
    return a.result.recipientTypes.length - b.result.recipientTypes.length;
  }
  if (a.result.occasions.length !== b.result.occasions.length) {
    return a.result.occasions.length - b.result.occasions.length;
  }
  return a.result.id.localeCompare(b.result.id);
}

/**
 * Picks the final list from ranked candidates. Gifts that fit the occasion always
 * come before gifts that do not, and no single category takes over the list.
 */
function selectDiverse(ranked: ScoredGift[], answers: QuizAnswers, limit: number) {
  const selected: ScoredGift[] = [];
  const categoryCounts: Record<string, number> = {};
  const focusedShopper = answers.interests.length > 0 && answers.interests.length <= 2;

  const capFor = (category: string) =>
    focusedShopper && (answers.interests as string[]).includes(category) ? 3 : 2;

  const take = (gift: ScoredGift) => {
    selected.push(gift);
    categoryCounts[gift.result.category] = (categoryCounts[gift.result.category] ?? 0) + 1;
  };

  const tiers = answers.occasion
    ? [ranked.filter((gift) => gift.occasionFit !== "none"), ranked.filter((gift) => gift.occasionFit === "none")]
    : [ranked];

  for (const tier of tiers) {
    for (const enforceCap of [true, false]) {
      for (const gift of tier) {
        if (selected.length >= limit) return selected;
        if (selected.includes(gift)) continue;
        if (enforceCap && (categoryCounts[gift.result.category] ?? 0) >= capFor(gift.result.category)) continue;
        take(gift);
      }
    }
  }

  return selected;
}

export function getRecommendations(answers: QuizAnswers): RecommendationResult[] {
  return getRecommendationResponse(answers).recommendations;
}

export function getRecommendationResponse(rawAnswers: QuizAnswers) {
  const answers = normalizeAnswers(rawAnswers);
  const limit = Math.min(MAX_RESULTS, giftCatalog.length);

  const scored = giftCatalog
    .filter(
      (gift) =>
        isAgeAppropriate(gift, answers) &&
        isGenderAppropriate(gift, answers) &&
        isInterestAppropriate(gift, answers)
    )
    .map((gift) => scoreGift(gift, answers));

  const fitsOccasion = (gift: ScoredGift) => !answers.occasion || gift.occasionFit !== "none";

  // Stay within one step of the shopper's budget. Only look further when the
  // catalog cannot fill the list any other way.
  const nearBudget = scored.filter((gift) => gift.budgetDistance <= 1);
  const relaxed = nearBudget.length < limit;
  const candidates = relaxed ? scored : nearBudget;

  const ranked = [...candidates].sort(compareScored);
  const selected = selectDiverse(ranked, answers, limit).sort((a, b) => {
    // Keep occasion-appropriate gifts ahead of general ideas after diversity selection.
    const aFits = fitsOccasion(a) ? 0 : 1;
    const bFits = fitsOccasion(b) ? 0 : 1;
    return aFits !== bFits ? aFits - bFits : compareScored(a, b);
  });

  const strongCount = selected.filter(
    (gift) => fitsOccasion(gift) && gift.result.score >= GOOD_MATCH_SCORE
  ).length;

  return {
    recommendations: selected.map((gift) => gift.result),
    usedFallback: relaxed || strongCount < Math.min(3, limit)
  };
}
