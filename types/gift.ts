export type RecipientType =
  | "Partner"
  | "Friend"
  | "Mom"
  | "Dad"
  | "Sibling"
  | "Child"
  | "Coworker"
  | "Other";

export type AgeRange =
  | "Under 13"
  | "13-17"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-64"
  | "65+";

export type Occasion =
  | "Birthday"
  | "Anniversary"
  | "Christmas"
  | "Holiday"
  | "Valentine's Day"
  | "Graduation"
  | "Wedding"
  | "Baby Shower"
  | "Thank You"
  | "Just Because";

export type BudgetRange =
  | "Under $25"
  | "$25-$50"
  | "$50-$100"
  | "$100+"
  | "No range";

export type Interest =
  | "Tech / Electronics"
  | "Books"
  | "Fashion"
  | "Beauty"
  | "Self-care"
  | "Gaming"
  | "Fitness"
  | "Cooking"
  | "Food"
  | "Travel"
  | "Music"
  | "Art"
  | "Sports"
  | "Jewelry"
  | "Home"
  | "Home Decor"
  | "Pets"
  | "Outdoors";

export type GiftStyle =
  | "Practical"
  | "Thoughtful"
  | "Sentimental"
  | "Romantic"
  | "Fun"
  | "Personalized"
  | "Luxury"
  | "Creative"
  | "Handmade";

export interface QuizAnswers {
  gender: "Male" | "Female" | "Prefer not to say" | "";
  recipientType: RecipientType | "";
  ageRange: AgeRange | "";
  occasion: Occasion | "";
  budget: BudgetRange | "";
  interests: Interest[];
  styles: GiftStyle[];
}

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  link?: string;
  genderTargets: ("Male" | "Female")[];
  priceRange: BudgetRange;
  ageRanges: AgeRange[];
  recipientTypes: RecipientType[];
  occasions: Occasion[];
  interests: Interest[];
  styles: GiftStyle[];
  fastDeliveryPossible: boolean;
  experienceGift: boolean;
  uniqueIdea: boolean;
  whyItFits: string;
}

export interface RecommendationResult extends GiftItem {
  score: number;
  matchReasons: string[];
}
