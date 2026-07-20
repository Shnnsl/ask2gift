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
