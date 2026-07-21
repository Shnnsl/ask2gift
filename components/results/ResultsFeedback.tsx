"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FEEDBACK_COMMENT_MAX_LENGTH,
  buildRecommendationFeedbackSummaries,
  createFeedbackResultKey,
  isFeedbackSubmissionLocked,
  submitRecommendationFeedback,
  type FeedbackUiStatus
} from "@/lib/feedback";
import {
  getAnonymousFeedbackSessionId,
  hasSubmittedFeedbackForResultSet,
  markSubmittedFeedbackForResultSet
} from "@/lib/storage";
import type { FeedbackReason } from "@/types/feedback";
import type { QuizAnswers, RecommendationResult } from "@/types/gift";

interface ResultsFeedbackProps {
  answers: QuizAnswers;
  recommendations: RecommendationResult[];
}

const feedbackReasonOptions: { value: FeedbackReason; label: string }[] = [
  { value: "too_generic", label: "Better gift ideas" },
  { value: "wrong_interests", label: "More personalized recommendations" },
  { value: "too_expensive", label: "Different price range" },
  { value: "not_relevant", label: "More variety" },
  { value: "already_owns_it", label: "Already own these gifts" },
  { value: "other", label: "Other" }
];

const actionButtonClasses =
  "min-h-12 px-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none";

export function ResultsFeedback({ answers, recommendations }: ResultsFeedbackProps) {
  const [mode, setMode] = useState<"choices" | "form">("choices");
  const [status, setStatus] = useState<FeedbackUiStatus>("idle");
  const [selectedReasons, setSelectedReasons] = useState<FeedbackReason[]>([]);
  const [comment, setComment] = useState("");
  const [inlineError, setInlineError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const resultSetKey = useMemo(() => createFeedbackResultKey(recommendations), [recommendations]);
  const recommendationSummaries = useMemo(
    () => buildRecommendationFeedbackSummaries(recommendations, answers),
    [answers, recommendations]
  );
  const isLocked = isFeedbackSubmissionLocked(status, hasSubmitted);
  const isSubmittingHelpful = status === "submitting-helpful";
  const isSubmittingImprovement = status === "submitting-improvement";
  const canSubmitImprovement = selectedReasons.length > 0 && !isLocked;

  useEffect(() => {
    const alreadySubmitted = hasSubmittedFeedbackForResultSet(resultSetKey);
    setHasSubmitted(alreadySubmitted);
    setMode("choices");
    setStatus(alreadySubmitted ? "success" : "idle");
    setSelectedReasons([]);
    setComment("");
    setInlineError("");
  }, [resultSetKey]);

  function toggleReason(reason: FeedbackReason) {
    setSelectedReasons((current) =>
      current.includes(reason)
        ? current.filter((value) => value !== reason)
        : [...current, reason]
    );
  }

  async function handleSubmit(helpful: boolean) {
    if (isLocked) {
      return;
    }

    const nextStatus = helpful ? "submitting-helpful" : "submitting-improvement";
    setStatus(nextStatus);
    setInlineError("");

    const result = await submitRecommendationFeedback({
      helpful,
      reasons: helpful ? [] : selectedReasons,
      comment,
      sessionId: getAnonymousFeedbackSessionId(),
      pagePath: typeof window === "undefined" ? null : window.location.pathname,
      quizContext: answers,
      recommendations: recommendationSummaries
    });

    if (!result.ok) {
      setStatus("error");
      setInlineError(result.errorMessage ?? "We couldn't submit your feedback. Please try again.");
      return;
    }

    markSubmittedFeedbackForResultSet(resultSetKey);
    setHasSubmitted(true);
    setStatus("success");
    setMode("choices");
    setSelectedReasons([]);
    setComment("");
    setInlineError("");
  }

  return (
    <div className="mt-8 surface max-w-3xl p-6 sm:p-8">
      {hasSubmitted ? (
        <div role="status" aria-live="polite" className="rounded-[1.5rem] border border-spruce/15 bg-mist/60 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-spruce/70">Feedback received</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Thank you for your feedback!</h2>
          <p className="mt-3 text-sm text-slate-600">
            Your anonymous feedback helps us improve future gift recommendations.
          </p>
        </div>
      ) : (
        <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-2xl font-semibold">How helpful were these recommendations?</h2>
          <p className="mt-3 text-sm text-slate-600">
            Your anonymous feedback helps us improve future gift recommendations. Please avoid including personal or sensitive information.
          </p>
        </div>
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Anonymous feedback</p>
      </div>

      {inlineError ? (
        <p role="alert" className="mt-5 rounded-2xl border border-coral/25 bg-coral/5 px-4 py-3 text-sm font-medium text-coral">
          {inlineError}
        </p>
      ) : null}

      {mode === "choices" ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => void handleSubmit(true)}
            disabled={isLocked}
            aria-label="Helpful"
            className={`button-primary w-full sm:w-auto ${actionButtonClasses}`}
          >
            {isSubmittingHelpful ? "Submitting..." : "Helpful"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (isLocked) {
                return;
              }

              setMode("form");
              setStatus("collecting");
              setInlineError("");
            }}
            disabled={isLocked}
            aria-label="Needs Improvement"
            className={`button-secondary w-full sm:w-auto ${actionButtonClasses}`}
          >
            Needs Improvement
          </button>
        </div>
      ) : (
        <form
          className="mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(false);
          }}
        >
          <div>
            <h3 className="text-xl font-semibold text-ink">Help us improve Ask2Gift</h3>
            <p className="mt-2 text-sm text-slate-600">What could we have done better?</p>
          </div>

          <fieldset className="space-y-3" aria-describedby="feedback-reason-help">
            <legend className="sr-only">Select at least one reason</legend>
            <p id="feedback-reason-help" className="text-xs font-medium text-slate-500">
              Select at least one option.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {feedbackReasonOptions.map((option) => {
                const isChecked = selectedReasons.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-[1.25rem] border p-4 text-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-coral/40 focus-within:ring-offset-2 ${
                      isChecked
                        ? "border-coral bg-coral/5 shadow-sm"
                        : "border-sand bg-white hover:border-coral/40 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-coral focus:ring-coral"
                      checked={isChecked}
                      onChange={() => toggleReason(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="feedback-comment" className="text-sm font-semibold text-ink">
              Additional feedback (optional)
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              maxLength={FEEDBACK_COMMENT_MAX_LENGTH}
              onChange={(event) => setComment(event.target.value)}
              className="mt-3 min-h-[140px] w-full rounded-[1.5rem] border border-sand bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/20"
              placeholder="Tell us what would have made these recommendations more helpful..."
            />
            <p className="mt-2 text-right text-xs text-slate-500">
              {comment.length} / {FEEDBACK_COMMENT_MAX_LENGTH}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={!canSubmitImprovement}
              className={`button-primary w-full sm:w-auto ${actionButtonClasses}`}
            >
              {isSubmittingImprovement ? "Submitting..." : "Submit Feedback"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (status === "submitting-improvement") {
                  return;
                }

                setMode("choices");
                setStatus("idle");
                setSelectedReasons([]);
                setComment("");
                setInlineError("");
              }}
              disabled={isSubmittingImprovement}
              className={`button-secondary w-full sm:w-auto ${actionButtonClasses}`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
        </>
      )}
    </div>
  );
}
