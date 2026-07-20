import type { BudgetRange, Interest, Occasion, QuizAnswers, RecommendationResult, RecipientType } from "../types/gift";

export type AffiliateProgramStatus = "disabled" | "applying" | "approved";

const AMAZON_MARKETPLACE_DOMAIN = "www.amazon.com";
const AMAZON_SEARCH_BASE_URL = `https://${AMAZON_MARKETPLACE_DOMAIN}/s`;
const AMAZON_ASSOCIATE_DEFAULT_TAG = "ask2gift20-20";
const GENERIC_DISCLOSURE =
  "Affiliate links may earn Ask2Gift a commission at no additional cost to you.";
const AMAZON_ASSOCIATE_DISCLOSURE =
  "As an Amazon Associate, Ask2Gift earns from qualifying purchases.";

function normalizeAssociateTag(tag?: string | null) {
  const value = tag?.trim();
  return value ? value : AMAZON_ASSOCIATE_DEFAULT_TAG;
}

export function getAmazonAssociateTag() {
  return normalizeAssociateTag(process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG);
}

export function getAffiliateProgramStatus(): AffiliateProgramStatus {
  return getAmazonAssociateTag() ? "approved" : "applying";
}

export const affiliateProgramStatus = getAffiliateProgramStatus();

export function isAffiliateEnabled() {
  return affiliateProgramStatus !== "disabled";
}

export function getAffiliateDisclosureText() {
  return GENERIC_DISCLOSURE;
}

export function getAmazonAssociateDisclosureText() {
  return AMAZON_ASSOCIATE_DISCLOSURE;
}

export function shouldShowAmazonAssociateDisclosure() {
  return affiliateProgramStatus === "approved";
}

export function hasAmazonAssociateTag() {
  return Boolean(getAmazonAssociateTag());
}

export function buildOutboundProductUrl(url?: string) {
  if (!url) {
    return null;
  }

  return url;
}

export function getOutboundLinkRel() {
  return "noopener noreferrer";
}

export function getAmazonAffiliateLinkRel() {
  return "sponsored noopener noreferrer";
}

function cleanSearchFragment(value: string) {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[\/]+/g, " ")
    .replace(/[^a-zA-Z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleContainsFragment(title: string, fragment: string) {
  const normalizedTitle = cleanSearchFragment(title).toLowerCase();
  const normalizedFragment = cleanSearchFragment(fragment).toLowerCase();
  return normalizedFragment.length > 0 && normalizedTitle.includes(normalizedFragment);
}

function getRecipientPhrase(recipientType: RecipientType | "", gender: QuizAnswers["gender"]) {
  if (!recipientType || recipientType === "Child") {
    return "";
  }

  if (recipientType === "Partner") {
    if (gender === "Male") return "gift for him";
    if (gender === "Female") return "gift for her";
  }

  return `gift for ${recipientType.toLowerCase()}`;
}

function getAgePhrase(ageRange: QuizAnswers["ageRange"], recipientType: QuizAnswers["recipientType"], gender: QuizAnswers["gender"]) {
  if (!ageRange || recipientType !== "Child") {
    return "";
  }

  const genderLabel = gender === "Male" ? "boy" : gender === "Female" ? "girl" : "child";

  if (ageRange === "Under 13") {
    return `for young ${genderLabel}`;
  }

  if (ageRange === "13-17") {
    return `for teen ${genderLabel}`;
  }

  return `for ${genderLabel}`;
}

function getOccasionPhrase(occasion: Occasion | "") {
  if (!occasion) {
    return "";
  }

  switch (occasion) {
    case "Birthday":
      return "birthday gift";
    case "Anniversary":
      return "anniversary gift";
    case "Christmas":
      return "Christmas gift";
    case "Holiday":
      return "holiday gift";
    case "Valentine's Day":
      return "Valentine gift";
    case "Graduation":
      return "graduation gift";
    case "Wedding":
      return "wedding gift";
    case "Baby Shower":
      return "baby shower gift";
    case "Thank You":
      return "thank you gift";
    case "Just Because":
      return "thoughtful gift";
    default:
      return "";
  }
}

function getInterestPhrase(interests: Interest[], recommendationTitle: string) {
  const usefulInterest = interests.find((interest) => !titleContainsFragment(recommendationTitle, interest));
  if (!usefulInterest) {
    return "";
  }

  return usefulInterest.toLowerCase();
}

function compactQueryParts(parts: string[]) {
  const uniqueParts: string[] = [];

  for (const rawPart of parts) {
    const part = cleanSearchFragment(rawPart);

    if (!part) {
      continue;
    }

    const normalizedPart = part.toLowerCase();
    if (!uniqueParts.some((item) => item.toLowerCase() === normalizedPart)) {
      uniqueParts.push(part);
    }
  }

  return uniqueParts;
}

export function buildAmazonSearchQuery(
  recommendation: Pick<RecommendationResult, "title">,
  answers: QuizAnswers
) {
  const recommendationTitle = cleanSearchFragment(recommendation.title);
  if (!recommendationTitle) {
    return "";
  }

  const parts = compactQueryParts([
    recommendationTitle,
    getRecipientPhrase(answers.recipientType, answers.gender),
    getAgePhrase(answers.ageRange, answers.recipientType, answers.gender),
    getInterestPhrase(answers.interests, recommendation.title),
    getOccasionPhrase(answers.occasion)
  ]);

  return parts.slice(0, 4).join(" ");
}

export function buildAmazonSearchUrl(query: string) {
  const sanitizedQuery = cleanSearchFragment(query);
  if (!sanitizedQuery) {
    return null;
  }

  const url = new URL(AMAZON_SEARCH_BASE_URL);
  url.searchParams.set("k", sanitizedQuery);
  url.searchParams.set("tag", getAmazonAssociateTag());
  return url.toString();
}

export function getAmazonBudgetMessage(selectedBudget: BudgetRange | "", recommendationBudget: BudgetRange) {
  if (!selectedBudget || selectedBudget === "No range") {
    return null;
  }

  if (selectedBudget === recommendationBudget) {
    return `Good match for your selected ${selectedBudget} budget.`;
  }

  return `Closest fit to your selected ${selectedBudget} budget.`;
}

