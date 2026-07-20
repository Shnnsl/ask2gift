import { giftCatalog } from "@/data/gifts";
import { budgetOrder } from "@/lib/quiz";
import type { GiftItem, QuizAnswers, RecommendationResult } from "@/types/gift";

const MAX_RESULTS = 6;
const SPECIAL_DIVERSITY_OCCASIONS = new Set([
  "Baby Shower",
  "Anniversary",
  "Graduation",
  "Wedding",
  "Thank You",
  "Holiday",
  "Birthday",
  "Just Because"
]);
const OCCASION_PROFILES = {
  "Baby Shower": {
    categories: ["Home", "Books", "Self-care", "Jewelry"],
    styles: ["Thoughtful", "Personalized", "Practical", "Sentimental"],
    interests: ["Home", "Books", "Self-care", "Jewelry"]
  },
  Anniversary: {
    categories: ["Jewelry", "Self-care", "Travel", "Home"],
    styles: ["Romantic", "Luxury", "Thoughtful", "Sentimental"],
    interests: ["Jewelry", "Travel", "Home", "Self-care"]
  },
  Graduation: {
    categories: ["Books", "Tech / Electronics", "Travel", "Home"],
    styles: ["Practical", "Thoughtful", "Fun", "Personalized"],
    interests: ["Books", "Tech / Electronics", "Travel", "Home"]
  },
  Wedding: {
    categories: ["Home", "Food", "Travel", "Jewelry"],
    styles: ["Thoughtful", "Luxury", "Personalized", "Practical"],
    interests: ["Home", "Food", "Travel", "Jewelry"]
  },
  "Thank You": {
    categories: ["Food", "Self-care", "Home", "Books"],
    styles: ["Thoughtful", "Practical", "Personalized"],
    interests: ["Food", "Self-care", "Home", "Books"]
  },
  Holiday: {
    categories: ["Food", "Tech / Electronics", "Home", "Jewelry", "Books", "Sports", "Self-care", "Travel"],
    styles: ["Thoughtful", "Fun", "Practical", "Luxury"],
    interests: ["Food", "Tech / Electronics", "Home", "Jewelry", "Books", "Sports", "Self-care", "Travel"]
  },
  Birthday: {
    categories: ["Jewelry", "Self-care", "Tech / Electronics", "Food", "Sports", "Books", "Home"],
    styles: ["Thoughtful", "Fun", "Luxury", "Personalized"],
    interests: ["Jewelry", "Self-care", "Tech / Electronics", "Food", "Sports", "Books", "Home"]
  },
  "Just Because": {
    categories: ["Self-care", "Food", "Books", "Home", "Jewelry", "Travel"],
    styles: ["Thoughtful", "Practical", "Fun", "Personalized"],
    interests: ["Self-care", "Food", "Books", "Home", "Jewelry", "Travel"]
  }
} satisfies Partial<
  Record<
    NonNullable<QuizAnswers["occasion"]>,
    { categories: string[]; styles: string[]; interests: string[] }
  >
>;
const SAFE_FALLBACK_IDS = new Set([
  "gourmet-snack-box",
  "tea-and-honey-set",
  "wireless-charging-stand",
  "book-subscription",
  "olive-oil-and-vinegar-set",
  "desk-plant-kit"
]);

function clampScore(score: number): number {
  if (score < 0) return 0;
  if (score > 100) return 100;
  return score;
}

function joinReasonList(items: string[]) {
  if (items.length === 1) return items[0].toLowerCase();
  if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`;

  const allButLast = items
    .slice(0, -1)
    .map((item) => item.toLowerCase())
    .join(", ");

  return `${allButLast}, and ${items[items.length - 1].toLowerCase()}`;
}

function getBudgetIndex(budget: GiftItem["priceRange"] | QuizAnswers["budget"]) {
  if (!budget || budget === "No range") return -1;
  return budgetOrder.indexOf(budget);
}

function getBudgetDistance(quizBudget: QuizAnswers["budget"], giftBudget: GiftItem["priceRange"]) {
  if (!quizBudget || quizBudget === "No range") return 0;

  const quizIndex = getBudgetIndex(quizBudget);
  const giftIndex = getBudgetIndex(giftBudget);

  if (quizIndex === -1 || giftIndex === -1) return Number.POSITIVE_INFINITY;
  return Math.abs(quizIndex - giftIndex);
}

function getBudgetCandidatePool(answers: QuizAnswers) {
  if (!answers.budget || answers.budget === "No range") {
    return {
      pool: giftCatalog,
      exactBudgetIds: new Set<string>(giftCatalog.map((gift) => gift.id))
    };
  }

  const exactMatches = giftCatalog.filter((gift) => gift.priceRange === answers.budget);
  const exactBudgetIds = new Set(exactMatches.map((gift) => gift.id));

  if (exactMatches.length >= MAX_RESULTS) {
    return { pool: exactMatches, exactBudgetIds };
  }

  const expandedPool = [...exactMatches];

  for (let distance = 1; distance <= budgetOrder.length; distance += 1) {
    const nextMatches = giftCatalog.filter(
      (gift) =>
        !expandedPool.some((existingGift) => existingGift.id === gift.id) &&
        getBudgetDistance(answers.budget, gift.priceRange) === distance
    );

    expandedPool.push(...nextMatches);

    if (expandedPool.length >= MAX_RESULTS) {
      break;
    }
  }

  return { pool: expandedPool, exactBudgetIds };
}

function getMatchingInterests(gift: GiftItem, answers: QuizAnswers) {
  return gift.interests.filter((interest) => answers.interests.includes(interest));
}

function getMatchingStyles(gift: GiftItem, answers: QuizAnswers) {
  return gift.styles.filter((style) => answers.styles.includes(style));
}

function getOccasionProfile(occasion: QuizAnswers["occasion"]) {
  if (!occasion) {
    return null;
  }

  if (occasion in OCCASION_PROFILES) {
    return OCCASION_PROFILES[occasion as keyof typeof OCCASION_PROFILES];
  }

  return null;
}

function getMatchSummary(gift: GiftItem, answers: QuizAnswers) {
  const matchingInterests = getMatchingInterests(gift, answers);
  const matchingStyles = getMatchingStyles(gift, answers);

  return {
    matchingInterests,
    matchingStyles,
    recipientMatch: answers.recipientType ? gift.recipientTypes.includes(answers.recipientType) : false,
    occasionMatch: answers.occasion ? gift.occasions.includes(answers.occasion) : false,
    ageMatch: answers.ageRange ? gift.ageRanges.includes(answers.ageRange) : false,
    genderMatch:
      answers.gender && answers.gender !== "Prefer not to say"
        ? gift.genderTargets.includes(answers.gender)
        : false
  };
}

function isStrongMatch(
  gift: RecommendationResult,
  answers: QuizAnswers,
  exactBudgetIds: Set<string>
) {
  const summary = getMatchSummary(gift, answers);
  const budgetMatch = answers.budget === "No range" || !answers.budget || exactBudgetIds.has(gift.id);
  const strongSignalCount = [summary.recipientMatch, summary.occasionMatch, summary.matchingStyles.length > 0].filter(Boolean).length;

  return budgetMatch && summary.matchingInterests.length > 0 && strongSignalCount >= 2;
}

function isCloseMatch(
  gift: RecommendationResult,
  answers: QuizAnswers,
  exactBudgetIds: Set<string>
) {
  const summary = getMatchSummary(gift, answers);
  const budgetMatch = answers.budget === "No range" || !answers.budget || exactBudgetIds.has(gift.id);
  const supportingSignalCount = [
    summary.matchingInterests.length > 0,
    summary.recipientMatch,
    summary.occasionMatch,
    summary.matchingStyles.length > 0
  ].filter(Boolean).length;

  return budgetMatch && supportingSignalCount >= 1;
}

function isInterestMatch(gift: RecommendationResult, answers: QuizAnswers) {
  if (answers.interests.length === 0) {
    return true;
  }

  return getMatchingInterests(gift, answers).length > 0;
}

function isSafeFallback(gift: RecommendationResult, answers: QuizAnswers) {
  const budgetDistance = getBudgetDistance(answers.budget, gift.priceRange);

  if (answers.budget && answers.budget !== "No range" && budgetDistance > 1) {
    return false;
  }

  return SAFE_FALLBACK_IDS.has(gift.id) || gift.score >= 35;
}

function getCategoryCounts(gifts: RecommendationResult[]) {
  return gifts.reduce<Record<string, number>>((counts, gift) => {
    counts[gift.category] = (counts[gift.category] ?? 0) + 1;
    return counts;
  }, {});
}

function shouldUseOccasionDiversity(candidates: RecommendationResult[], answers: QuizAnswers) {
  if (!answers.occasion || !SPECIAL_DIVERSITY_OCCASIONS.has(answers.occasion)) {
    return false;
  }

  const preview = candidates.slice(0, MAX_RESULTS);
  if (preview.length < MAX_RESULTS) {
    return false;
  }

  const categoryCounts = Object.values(getCategoryCounts(preview));
  const highestCategoryCount = Math.max(...categoryCounts);

  if (highestCategoryCount < 4) {
    return false;
  }

  const dominantCategory = preview[0]?.category;
  const occasionAlternatives = candidates.filter((gift) => {
    const summary = getMatchSummary(gift, answers);
    return summary.occasionMatch && gift.category !== dominantCategory;
  });

  return occasionAlternatives.length >= 2;
}

function selectOccasionAwareRecommendations(candidates: RecommendationResult[], answers: QuizAnswers) {
  if (!shouldUseOccasionDiversity(candidates, answers)) {
    return candidates.slice(0, Math.min(MAX_RESULTS, giftCatalog.length));
  }

  const profile = getOccasionProfile(answers.occasion);
  const limit = Math.min(MAX_RESULTS, giftCatalog.length);
  const preview = candidates.slice(0, limit);
  const previewFloorScore = preview.at(-1)?.score ?? 0;
  const categoryCounts: Record<string, number> = {};
  const selected: RecommendationResult[] = [];

  const canUseCategory = (gift: RecommendationResult, relaxed: boolean) => {
    const count = categoryCounts[gift.category] ?? 0;
    if (relaxed) {
      return true;
    }

    return count < 2;
  };

  const addGift = (gift: RecommendationResult) => {
    if (selected.some((item) => item.id === gift.id)) {
      return false;
    }

    selected.push(gift);
    categoryCounts[gift.category] = (categoryCounts[gift.category] ?? 0) + 1;
    return true;
  };

  for (const pass of [false, true]) {
    for (const gift of candidates) {
      if (selected.length >= limit) {
        break;
      }

      const summary = getMatchSummary(gift, answers);
      const strongEnough = gift.score >= Math.max(55, previewFloorScore - 25);
      const profileCategoryMatch = profile ? profile.categories.includes(gift.category) : false;
      const profileStyleMatch = profile
        ? gift.styles.some((style) => profile.styles.includes(style))
        : false;

      if (!pass) {
        if (!strongEnough || !summary.occasionMatch) {
          continue;
        }

        if (!profileCategoryMatch && !profileStyleMatch && summary.matchingInterests.length === 0) {
          continue;
        }
      }

      if (!canUseCategory(gift, pass)) {
        continue;
      }

      addGift(gift);
    }
  }

  return selected.slice(0, limit);
}

export function getRecommendations(answers: QuizAnswers): RecommendationResult[] {
  return getRecommendationResponse(answers).recommendations;
}

export function getRecommendationResponse(answers: QuizAnswers) {
  const { pool, exactBudgetIds } = getBudgetCandidatePool(answers);

  const rankedResults = pool
    .map((gift) => scoreGift(gift, answers, exactBudgetIds))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.matchReasons.length - a.matchReasons.length;
    });

  const interestMatches = rankedResults.filter((gift) => isInterestMatch(gift, answers));
  const nonInterestMatches = rankedResults.filter((gift) => !isInterestMatch(gift, answers));

  const strongMatches = interestMatches.filter((gift) => isStrongMatch(gift, answers, exactBudgetIds));
  const closeMatches = [
    ...interestMatches.filter((gift) => !strongMatches.some((strongGift) => strongGift.id === gift.id)),
    ...nonInterestMatches.filter((gift) => isCloseMatch(gift, answers, exactBudgetIds))
  ];
  const safeFallback = rankedResults.filter(
    (gift) =>
      !strongMatches.some((strongGift) => strongGift.id === gift.id) &&
      !closeMatches.some((closeGift) => closeGift.id === gift.id) &&
      isSafeFallback(gift, answers)
  );

  const orderedCandidates: RecommendationResult[] = [];

  for (const group of [strongMatches, closeMatches, safeFallback, rankedResults]) {
    for (const gift of group) {
      if (orderedCandidates.length >= rankedResults.length) {
        break;
      }

      if (!orderedCandidates.some((existingGift) => existingGift.id === gift.id)) {
        orderedCandidates.push(gift);
      }
    }
  }

  const recommendations = selectOccasionAwareRecommendations(orderedCandidates, answers);

  return {
    recommendations,
    usedFallback: strongMatches.length < MAX_RESULTS
  };
}

function scoreGift(
  gift: GiftItem,
  answers: QuizAnswers,
  exactBudgetIds: Set<string>
): RecommendationResult {
  let score = 0;
  const matchReasons: string[] = [];

  const matchingInterests = getMatchingInterests(gift, answers);
  const matchingStyles = getMatchingStyles(gift, answers);
  const budgetDistance = getBudgetDistance(answers.budget, gift.priceRange);
  const occasionProfile = getOccasionProfile(answers.occasion);

  const budgetMatch = answers.budget === "No range" || !answers.budget || exactBudgetIds.has(gift.id);

  if (answers.occasion) {
    if (gift.occasions.includes(answers.occasion)) {
      score += 75;
      matchReasons.push(`Fits your ${answers.occasion.toLowerCase()} occasion.`);
    } else {
      score -= 45;
    }
  }

  if (occasionProfile) {
    if (occasionProfile.categories.includes(gift.category)) {
      score += 22;
    }

    const occasionStyleMatches = gift.styles.filter((style) => occasionProfile.styles.includes(style));
    if (occasionStyleMatches.length > 0) {
      score += 12;
    }

    const occasionInterestMatches = gift.interests.filter((interest) => occasionProfile.interests.includes(interest));
    if (occasionInterestMatches.length > 0) {
      score += 10;
    }
  }

  if (budgetMatch) {
    score += 45;
    if (answers.budget && answers.budget !== "No range") {
      matchReasons.push("Within your selected budget.");
    }
  } else if (answers.budget && answers.budget !== "No range") {
    if (budgetDistance === 1) {
      score -= 20;
    } else {
      score -= 80;
    }
  }

  if (answers.recipientType) {
    if (gift.recipientTypes.includes(answers.recipientType)) {
      score += 50;
      matchReasons.push(`Fits the ${answers.recipientType.toLowerCase()} you are shopping for.`);
    } else {
      score -= 35;
    }
  }

  if (matchingInterests.length > 0) {
    score += 35 + (matchingInterests.length - 1) * 6;
    matchReasons.push(`Connects with ${joinReasonList(matchingInterests)} interests.`);
  } else if (answers.interests.length > 0) {
    score -= 25;
  }

  if (matchingStyles.length > 0) {
    score += 25 + Math.max(0, matchingStyles.length - 1) * 5;
    matchReasons.push(`Matches your ${joinReasonList(matchingStyles)} style.`);
  } else if (answers.styles.length > 0) {
    score -= 15;
  }

  if (answers.gender && answers.gender !== "Prefer not to say") {
    if (gift.genderTargets.includes(answers.gender)) {
      score += 10;
      matchReasons.push(`Better aligned with ${answers.gender.toLowerCase()} gift preferences.`);
    } else {
      score -= 10;
    }
  }

  if (answers.ageRange) {
    if (gift.ageRanges.includes(answers.ageRange)) {
      score += 10;
      matchReasons.push(`Makes sense for the ${answers.ageRange.toLowerCase()} age range.`);
    }
  }

  if (SAFE_FALLBACK_IDS.has(gift.id)) {
    score += 5;
  }

  return {
    ...gift,
    score: clampScore(score),
    matchReasons: matchReasons.slice(0, 5)
  };
}
