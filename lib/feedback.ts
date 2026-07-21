import { buildAmazonSearchQuery } from "./affiliate.ts";
import { getSupabaseBrowserClient } from "./supabase/client.ts";
import type { RecommendationResult, QuizAnswers } from "../types/gift.ts";
import type { FeedbackReason, FeedbackSubmission, RecommendationFeedbackSummary } from "../types/feedback.ts";
import type { Database } from "../types/supabase.ts";

export const FEEDBACK_COMMENT_MAX_LENGTH = 1000;
export const FEEDBACK_SUCCESS_MESSAGE = "Your anonymous feedback helps us improve future gift recommendations.";
export const FEEDBACK_RETRY_MESSAGE = "We couldn't submit your feedback. Please try again.";

type RecommendationFeedbackInsert = Database["public"]["Tables"]["recommendation_feedback"]["Insert"];

export type FeedbackUiStatus =
  | "idle"
  | "collecting"
  | "submitting-helpful"
  | "submitting-improvement"
  | "success"
  | "error";

interface InsertResult {
  error: { message: string } | null;
}

interface FeedbackInsertQuery {
  insert: (payload: RecommendationFeedbackInsert) => PromiseLike<InsertResult>;
}

export interface FeedbackInsertClient {
  from: (table: "recommendation_feedback") => FeedbackInsertQuery;
}

export interface FeedbackSubmissionResult {
  ok: boolean;
  errorMessage?: string;
}

function normalizeReasons(helpful: boolean, reasons: FeedbackReason[]) {
  if (helpful) {
    return [] as FeedbackReason[];
  }

  return [...new Set(reasons)];
}

function toRecommendationFeedbackJson(recommendations: RecommendationFeedbackSummary[]) {
  return recommendations as Database["public"]["Tables"]["recommendation_feedback"]["Insert"]["recommendations"];
}

function getRelationshipValue(input: FeedbackSubmission) {
  // The current quiz model does not capture a separate relationship field beyond recipientType.
  return null;
}

export function normalizeFeedbackComment(comment: string) {
  const trimmed = comment.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function createFeedbackResultKey(recommendations: Pick<RecommendationResult, "id">[]) {
  return recommendations.map((recommendation) => recommendation.id).join("|");
}

export function buildRecommendationFeedbackSummaries(
  recommendations: RecommendationResult[],
  answers: QuizAnswers
): RecommendationFeedbackSummary[] {
  return recommendations.map((recommendation) => {
    const amazonSearchQuery = buildAmazonSearchQuery(recommendation, answers);

    return {
      title: recommendation.title,
      category: recommendation.category,
      explanation: recommendation.matchReasons[0] ?? recommendation.whyItFits,
      matchScore: recommendation.score,
      destinationType: amazonSearchQuery
        ? "amazon_search"
        : recommendation.link
          ? "external_link"
          : "unavailable",
      destinationQuery: amazonSearchQuery
    };
  });
}

export function validateFeedbackSubmission(input: FeedbackSubmission) {
  const reasons = normalizeReasons(input.helpful, input.reasons);
  const trimmedComment = input.comment.trim();

  if (!input.helpful && reasons.length === 0) {
    return {
      valid: false,
      errorMessage: "Select at least one reason so we know what to improve."
    };
  }

  if (trimmedComment.length > FEEDBACK_COMMENT_MAX_LENGTH) {
    return {
      valid: false,
      errorMessage: `Comments must be ${FEEDBACK_COMMENT_MAX_LENGTH} characters or fewer.`
    };
  }

  return { valid: true };
}

export function normalizeFeedbackSubmission(input: FeedbackSubmission): RecommendationFeedbackInsert {
  const reasons = normalizeReasons(input.helpful, input.reasons);
  const comment = normalizeFeedbackComment(input.comment);

  return {
    helpful: input.helpful,
    reasons,
    comment,
    session_id: input.sessionId,
    recipient: input.quizContext?.recipientType || null,
    relationship: getRelationshipValue(input),
    occasion: input.quizContext?.occasion || null,
    age_group: input.quizContext?.ageRange || null,
    budget: input.quizContext?.budget || null,
    interests: input.quizContext?.interests ?? [],
    personality: input.quizContext?.styles ?? [],
    recommendations: toRecommendationFeedbackJson(input.recommendations),
    page_path: input.pagePath
  };
}

export function getFeedbackStatusMessage(status: FeedbackUiStatus) {
  if (status === "success") {
    return FEEDBACK_SUCCESS_MESSAGE;
  }

  if (status === "error") {
    return FEEDBACK_RETRY_MESSAGE;
  }

  return "";
}

export function isFeedbackSubmissionLocked(status: FeedbackUiStatus, hasSubmitted: boolean) {
  return (
    hasSubmitted ||
    status === "success" ||
    status === "submitting-helpful" ||
    status === "submitting-improvement"
  );
}

export async function submitRecommendationFeedback(
  input: FeedbackSubmission,
  client: FeedbackInsertClient = getSupabaseBrowserClient()
): Promise<FeedbackSubmissionResult> {
  const validation = validateFeedbackSubmission(input);

  if (!validation.valid) {
    return {
      ok: false,
      errorMessage: validation.errorMessage
    };
  }

  const payload = normalizeFeedbackSubmission(input);

  try {
    const { error } = await client.from("recommendation_feedback").insert(payload);

    if (error) {
      console.error("Recommendation feedback insert failed", error.message);
      return {
        ok: false,
        errorMessage: FEEDBACK_RETRY_MESSAGE
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Recommendation feedback submission threw an error", error);
    return {
      ok: false,
      errorMessage: FEEDBACK_RETRY_MESSAGE
    };
  }
}
