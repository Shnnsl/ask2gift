import type { QuizAnswers } from "./gift.ts";

export const FEEDBACK_REASONS = [
  "too_generic",
  "too_expensive",
  "too_cheap",
  "wrong_interests",
  "wrong_age_group",
  "already_owns_it",
  "not_relevant",
  "other"
] as const;

export type FeedbackReason = (typeof FEEDBACK_REASONS)[number];

export const feedbackReasonLabels: Record<FeedbackReason, string> = {
  too_generic: "Too generic",
  too_expensive: "Too expensive",
  too_cheap: "Too cheap",
  wrong_interests: "Wrong interests",
  wrong_age_group: "Wrong age group",
  already_owns_it: "Already owns these",
  not_relevant: "Not relevant",
  other: "Other"
};

export interface RecommendationFeedbackSummary {
  [key: string]: string | number | null;
  title: string;
  category: string;
  explanation: string;
  matchScore: number;
  destinationType: "amazon_search" | "external_link" | "unavailable";
  destinationQuery: string | null;
}

export interface FeedbackSubmission {
  helpful: boolean;
  reasons: FeedbackReason[];
  comment: string;
  sessionId: string | null;
  pagePath: string | null;
  quizContext: Partial<QuizAnswers> | null;
  recommendations: RecommendationFeedbackSummary[];
}
