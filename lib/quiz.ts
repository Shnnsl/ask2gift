import type {
  AgeRange,
  BudgetRange,
  GiftStyle,
  Interest,
  Occasion,
  QuizAnswers,
  RecipientType
} from "@/types/gift";

export const GENDER_OPTIONS: NonNullable<QuizAnswers["gender"]>[] = [
  "Male",
  "Female",
  "Prefer not to say"
];

export const RECIPIENT_OPTIONS: RecipientType[] = [
  "Partner",
  "Friend",
  "Mom",
  "Dad",
  "Sibling",
  "Child",
  "Coworker",
  "Other"
];

export const AGE_OPTIONS: AgeRange[] = ["Under 13", "13-17", "18-24", "25-34", "35-44", "45-64", "65+"];
export const OCCASION_OPTIONS: Occasion[] = [
  "Birthday",
  "Anniversary",
  "Christmas",
  "Holiday",
  "Valentine's Day",
  "Graduation",
  "Wedding",
  "Baby Shower",
  "Thank You",
  "Just Because"
];
export const BUDGET_OPTIONS: BudgetRange[] = [
  "Under $25",
  "$25-$50",
  "$50-$100",
  "$100+",
  "No range"
];
export const INTEREST_OPTIONS: Interest[] = [
  "Tech / Electronics",
  "Books",
  "Fashion",
  "Beauty",
  "Self-care",
  "Gaming",
  "Fitness",
  "Cooking",
  "Food",
  "Travel",
  "Music",
  "Art",
  "Sports",
  "Jewelry",
  "Home",
  "Home Decor",
  "Pets",
  "Outdoors"
];
export const STYLE_OPTIONS: GiftStyle[] = [
  "Practical",
  "Thoughtful",
  "Sentimental",
  "Romantic",
  "Fun",
  "Personalized",
  "Luxury",
  "Creative",
  "Handmade"
];

export const emptyQuizAnswers: QuizAnswers = {
  gender: "",
  recipientType: "",
  ageRange: "",
  occasion: "",
  budget: "",
  interests: [],
  styles: []
};

export const quizSteps = [
  "Recipient",
  "Age range",
  "Occasion",
  "Budget",
  "Gift style",
  "Interests"
];

export const budgetOrder: BudgetRange[] = [
  "Under $25",
  "$25-$50",
  "$50-$100",
  "$100+"
];

export const quizStorageKey = "ask2gift.quizAnswers";
export const favoritesStorageKey = "ask2gift.favorites";

const QUIZ_GENDER_PARAMS: Record<string, QuizAnswers["gender"]> = {
  him: "Male",
  male: "Male",
  her: "Female",
  female: "Female"
};

function findOption<T extends string>(options: readonly T[], value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return options.find((option) => option.toLowerCase() === normalized);
}

/**
 * Reads quiz answers from a link such as /quiz?occasion=Christmas&recipient=Mom&for=her
 * so gift guides and campaigns can start the quiz with answers already chosen.
 * Unknown values are ignored.
 */
export function getQuizPresetFromParams(params: URLSearchParams): Partial<QuizAnswers> {
  const preset: Partial<QuizAnswers> = {};

  const occasion = findOption(OCCASION_OPTIONS, params.get("occasion"));
  if (occasion) preset.occasion = occasion;

  const recipientType = findOption(RECIPIENT_OPTIONS, params.get("recipient"));
  if (recipientType) preset.recipientType = recipientType;

  const ageRange = findOption(AGE_OPTIONS, params.get("age"));
  if (ageRange) preset.ageRange = ageRange;

  const budget = findOption(BUDGET_OPTIONS, params.get("budget"));
  if (budget) preset.budget = budget;

  const gender = QUIZ_GENDER_PARAMS[(params.get("for") ?? "").trim().toLowerCase()];
  if (gender) preset.gender = gender;

  return preset;
}

export function buildQuizLink(preset: Partial<Pick<QuizAnswers, "occasion" | "recipientType" | "ageRange" | "budget" | "gender">>) {
  const params = new URLSearchParams();
  if (preset.occasion) params.set("occasion", preset.occasion);
  if (preset.recipientType) params.set("recipient", preset.recipientType);
  if (preset.ageRange) params.set("age", preset.ageRange);
  if (preset.budget) params.set("budget", preset.budget);
  if (preset.gender === "Male") params.set("for", "him");
  if (preset.gender === "Female") params.set("for", "her");

  const query = params.toString();
  return query ? `/quiz?${query}` : "/quiz";
}
