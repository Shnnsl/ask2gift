import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  FEEDBACK_COMMENT_MAX_LENGTH,
  FEEDBACK_RETRY_MESSAGE,
  FEEDBACK_SUCCESS_MESSAGE,
  buildRecommendationFeedbackSummaries,
  getFeedbackStatusMessage,
  isFeedbackSubmissionLocked,
  normalizeFeedbackSubmission,
  submitRecommendationFeedback,
  validateFeedbackSubmission
} from "../lib/feedback.ts";
import type { FeedbackSubmission } from "../types/feedback.ts";
import type { QuizAnswers, RecommendationResult } from "../types/gift.ts";

const baseAnswers: QuizAnswers = {
  gender: "Female",
  recipientType: "Mom",
  ageRange: "45-64",
  occasion: "Birthday",
  budget: "$25-$50",
  interests: ["Jewelry"],
  styles: ["Thoughtful"]
};

const baseRecommendation: RecommendationResult = {
  id: "birthstone-necklace",
  title: "Birthstone Necklace",
  description: "A classic necklace with a personalized birthstone accent.",
  category: "Jewelry",
  imageUrl: "https://example.com/necklace.jpg",
  link: "https://example.com/necklace",
  genderTargets: ["Female"],
  priceRange: "$25-$50",
  ageRanges: ["25-34", "35-44", "45-64"],
  recipientTypes: ["Mom", "Partner", "Friend"],
  occasions: ["Birthday", "Holiday", "Anniversary"],
  interests: ["Jewelry"],
  styles: ["Thoughtful", "Personalized"],
  fastDeliveryPossible: true,
  experienceGift: false,
  uniqueIdea: false,
  whyItFits: "A personal jewelry gift that feels thoughtful.",
  score: 94,
  matchReasons: ["Connects with jewelry interests.", "Within your selected budget."]
};

function createSubmission(overrides: Partial<FeedbackSubmission> = {}): FeedbackSubmission {
  return {
    helpful: false,
    reasons: ["wrong_interests"],
    comment: "Looking for something more personal.",
    sessionId: "session-123",
    pagePath: "/results",
    quizContext: baseAnswers,
    recommendations: buildRecommendationFeedbackSummaries([baseRecommendation], baseAnswers),
    ...overrides
  };
}

test("Helpful feedback creates the expected positive payload and clears negative reasons", () => {
  const normalized = normalizeFeedbackSubmission(
    createSubmission({
      helpful: true,
      reasons: ["wrong_interests", "too_generic"],
      comment: "   Thanks!   "
    })
  );

  assert.equal(normalized.helpful, true);
  assert.deepEqual(normalized.reasons, []);
  assert.equal(normalized.comment, "Thanks!");
});

test("Needs Improvement requires at least one reason", () => {
  const validation = validateFeedbackSubmission(
    createSubmission({
      reasons: []
    })
  );

  assert.equal(validation.valid, false);
  assert.equal(validation.errorMessage, "Select at least one reason so we know what to improve.");
});

test("Negative feedback submits selected reasons and optional comment", () => {
  const normalized = normalizeFeedbackSubmission(
    createSubmission({
      reasons: ["wrong_interests", "too_generic"],
      comment: "  More meaningful ideas please.  "
    })
  );

  assert.deepEqual(normalized.reasons, ["wrong_interests", "too_generic"]);
  assert.equal(normalized.comment, "More meaningful ideas please.");
  assert.equal(normalized.recipient, "Mom");
  assert.equal(normalized.relationship, null);
});

test("An omitted optional comment is stored as null", () => {
  const normalized = normalizeFeedbackSubmission(
    createSubmission({
      comment: "   "
    })
  );

  assert.equal(normalized.comment, null);
});

test("Comment length is limited", () => {
  const accepted = validateFeedbackSubmission(
    createSubmission({
      comment: "a".repeat(FEEDBACK_COMMENT_MAX_LENGTH)
    })
  );
  const validation = validateFeedbackSubmission(
    createSubmission({
      comment: "a".repeat(FEEDBACK_COMMENT_MAX_LENGTH + 1)
    })
  );

  assert.equal(accepted.valid, true);
  assert.equal(validation.valid, false);
  assert.match(validation.errorMessage ?? "", /1000 characters or fewer/);
});

test("A successful submission resolves cleanly and maps to the thank-you state", async () => {
  const calls: unknown[] = [];
  const client = {
    from() {
      return {
        async insert(payload: unknown) {
          calls.push(payload);
          return { error: null };
        }
      };
    }
  };

  const result = await submitRecommendationFeedback(createSubmission({ helpful: true, reasons: [] }), client);

  assert.equal(result.ok, true);
  assert.equal(calls.length, 1);
  assert.equal(getFeedbackStatusMessage("success"), FEEDBACK_SUCCESS_MESSAGE);
});

test("A failed submission returns a retry message", async () => {
  const client = {
    from() {
      return {
        async insert() {
          return { error: { message: "boom" } };
        }
      };
    }
  };

  const result = await submitRecommendationFeedback(createSubmission(), client);

  assert.equal(result.ok, false);
  assert.equal(result.errorMessage, FEEDBACK_RETRY_MESSAGE);
  assert.equal(getFeedbackStatusMessage("error"), FEEDBACK_RETRY_MESSAGE);
});

test("Duplicate submissions are prevented by the UI lock helper", () => {
  assert.equal(isFeedbackSubmissionLocked("idle", true), true);
  assert.equal(isFeedbackSubmissionLocked("submitting-helpful", false), true);
  assert.equal(isFeedbackSubmissionLocked("idle", false), false);
});

test("Feedback UI uses production copy and text-only action labels", () => {
  const source = readFileSync(join(process.cwd(), "components", "results", "ResultsFeedback.tsx"), "utf8");

  assert.match(source, /How helpful were these recommendations\?/);
  assert.match(source, /"Helpful"/);
  assert.match(source, /Needs Improvement/);
  assert.doesNotMatch(source, /\?\? Helpful|\?\? Needs Improvement/);
  assert.match(source, /Submitting\.\.\./);
  assert.match(source, /Thank you for your feedback!/);
  assert.match(source, /role="status"/);
  assert.match(source, /role="alert"/);
});

test("Feedback UI preserves form input after a failed submission", () => {
  const source = readFileSync(join(process.cwd(), "components", "results", "ResultsFeedback.tsx"), "utf8");
  const failureBranch = source.match(/if \(!result\.ok\) \{([\s\S]*?)\n    \}/)?.[1] ?? "";

  assert.match(failureBranch, /setStatus\("error"\)/);
  assert.doesNotMatch(failureBranch, /setSelectedReasons|setComment/);
});

test("Feedback UI enforces the comment limit and reason requirement", () => {
  const source = readFileSync(join(process.cwd(), "components", "results", "ResultsFeedback.tsx"), "utf8");

  assert.match(source, /maxLength=\{FEEDBACK_COMMENT_MAX_LENGTH\}/);
  assert.match(source, /selectedReasons\.length > 0/);
  assert.match(source, /disabled=\{!canSubmitImprovement\}/);
});

test("Missing quiz fields do not break submission payload creation", () => {
  const normalized = normalizeFeedbackSubmission(
    createSubmission({
      quizContext: {
        interests: ["Jewelry"],
        styles: ["Thoughtful"]
      }
    })
  );

  assert.equal(normalized.relationship, null);
  assert.equal(normalized.recipient, null);
  assert.deepEqual(normalized.interests, ["Jewelry"]);
  assert.deepEqual(normalized.personality, ["Thoughtful"]);
});

test("Feedback summaries keep only safe recommendation context", () => {
  const summaries = buildRecommendationFeedbackSummaries([baseRecommendation], baseAnswers);

  assert.equal(summaries[0]?.destinationType, "amazon_search");
  assert.match(summaries[0]?.destinationQuery ?? "", /Birthstone Necklace/);
});

test("The Supabase client only references public keys and never a service-role key", () => {
  const source = readFileSync(join(process.cwd(), "lib", "supabase", "client.ts"), "utf8");

  assert.match(source, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(source, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(source, /SERVICE_ROLE/i);
});
