"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  AGE_OPTIONS,
  BUDGET_OPTIONS,
  GENDER_OPTIONS,
  INTEREST_OPTIONS,
  OCCASION_OPTIONS,
  RECIPIENT_OPTIONS,
  STYLE_OPTIONS,
  emptyQuizAnswers,
  quizSteps
} from "@/lib/quiz";
import { writeStoredQuizAnswers } from "@/lib/storage";
import type { QuizAnswers } from "@/types/gift";
import { ProgressBar } from "@/components/quiz/ProgressBar";

type SingleField = Exclude<keyof QuizAnswers, "interests" | "styles">;
type MultiField = "interests" | "styles";
type SingleValue = QuizAnswers[SingleField];
type MultiValue = QuizAnswers[MultiField];

type StepConfig =
  | {
      title: string;
      description: string;
      type: "recipient-with-preference";
    }
  | {
      title: string;
      description: string;
      type: "single";
      options: string[];
      field: SingleField;
    }
  | {
      title: string;
      description: string;
      type: "multi";
      options: string[];
      field: MultiField;
    };

const steps: StepConfig[] = [
  {
    title: "Who are you buying for?",
    description: "Choose who the gift is for and add a preference if you want us to gently guide the ranking.",
    type: "recipient-with-preference"
  },
  {
    title: "What is their age range?",
    description: "This helps us balance tone, usefulness, and the types of gifts we recommend.",
    type: "single",
    options: AGE_OPTIONS,
    field: "ageRange"
  },
  {
    title: "What is the occasion?",
    description: "Different moments call for different kinds of gifts.",
    type: "single",
    options: OCCASION_OPTIONS,
    field: "occasion"
  },
  {
    title: "What is your budget?",
    description: "We will prioritize ideas that stay within your budget whenever you choose a range.",
    type: "single",
    options: BUDGET_OPTIONS,
    field: "budget"
  },
  {
    title: "What gift style feels right?",
    description: "Choose one or more styles to shape the overall feel of the final suggestions.",
    type: "multi",
    options: STYLE_OPTIONS,
    field: "styles"
  },
  {
    title: "What are they interested in?",
    description: "Choose all that apply so the gift ideas feel more personal and relevant.",
    type: "multi",
    options: INTEREST_OPTIONS,
    field: "interests"
  }
];

function isStepComplete(step: StepConfig, answers: QuizAnswers) {
  if (step.type === "recipient-with-preference") {
    return answers.recipientType !== "" && answers.gender !== "";
  }

  const value = answers[step.field];
  return Array.isArray(value) ? value.length > 0 : value !== "";
}

export function QuizWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyQuizAnswers);
  const [validationMessage, setValidationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuizCardVisible, setIsQuizCardVisible] = useState(true);
  const quizCardRef = useRef<HTMLDivElement>(null);
  const questionContainerRef = useRef<HTMLDivElement>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const validationMessageRef = useRef<HTMLParagraphElement>(null);
  const previousStepRef = useRef(currentStep);
  const stepTransitionRef = useRef(false);
  const submissionStartedRef = useRef(false);

  const step = steps[currentStep];
  const canContinue = useMemo(() => isStepComplete(step, answers), [step, answers]);
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const headingTop = questionHeadingRef.current?.getBoundingClientRect().top ?? 0;

      if (window.scrollY > 100 && headingTop < 96) {
        questionContainerRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (previousStepRef.current === currentStep) {
      return;
    }

    previousStepRef.current = currentStep;
    stepTransitionRef.current = false;

    const animationFrame = window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      questionHeadingRef.current?.focus({ preventScroll: true });
      questionContainerRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [currentStep]);

  useEffect(() => {
    const quizCard = quizCardRef.current;

    if (!quizCard || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsQuizCardVisible(entry.isIntersecting);
    });

    observer.observe(quizCard);
    return () => observer.disconnect();
  }, []);

  const updateSingleAnswer = (value: string) => {
    if (step.type !== "single") {
      return;
    }

    setValidationMessage("");
    setAnswers((previous) => ({
      ...previous,
      [step.field]: value as SingleValue
    }));
  };

  const updateMultiAnswer = (value: string) => {
    if (step.type !== "multi") {
      return;
    }

    setValidationMessage("");
    setAnswers((previous) => {
      const list = previous[step.field] as string[];
      const nextList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

      return {
        ...previous,
        [step.field]: nextList as MultiValue
      };
    });
  };

  const goBack = () => {
    if (currentStep === 0 || isSubmitting || stepTransitionRef.current) {
      return;
    }

    stepTransitionRef.current = true;
    setValidationMessage("");
    setCurrentStep((value) => Math.max(0, value - 1));
  };

  const goNext = () => {
    if (isSubmitting || stepTransitionRef.current) {
      return;
    }

    if (!canContinue) {
      setValidationMessage("Choose an answer before continuing.");
      window.requestAnimationFrame(() => validationMessageRef.current?.focus());
      return;
    }

    if (isLastStep) {
      if (submissionStartedRef.current) {
        return;
      }

      submissionStartedRef.current = true;
      stepTransitionRef.current = true;
      setIsSubmitting(true);
      writeStoredQuizAnswers(answers);
      router.push("/results");
      return;
    }

    stepTransitionRef.current = true;
    setValidationMessage("");
    setCurrentStep((value) => value + 1);
  };

  return (
    <section className="quiz-section">
      <div className="container-shell">
        <div ref={quizCardRef} className="quiz-card mx-auto max-w-3xl surface">
          <ProgressBar currentStep={currentStep} totalSteps={quizSteps.length} />
          <div ref={questionContainerRef} className="quiz-question-block scroll-mt-24">
            <p className="eyebrow">
              <span className="sm:hidden">Step {currentStep + 1} of {steps.length} - </span>
              {quizSteps[currentStep]}
            </p>
            <h1
              ref={questionHeadingRef}
              tabIndex={-1}
              className="mt-2 text-3xl font-semibold leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 focus-visible:ring-offset-4 sm:mt-3 sm:text-4xl"
            >
              {step.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg">{step.description}</p>
            {step.type === "multi" ? (
              <p className="mt-3 text-sm text-slate-500">Select all that apply. You can choose more than one.</p>
            ) : step.type === "recipient-with-preference" ? (
              <p className="mt-3 text-sm text-slate-500">Pick one recipient and one preference to keep the results focused.</p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Choose the closest fit to keep your results focused.</p>
            )}
            {validationMessage ? (
              <p
                id="quiz-validation-message"
                ref={validationMessageRef}
                role="alert"
                tabIndex={-1}
                className="mt-4 rounded-2xl border border-coral/25 bg-coral/5 px-4 py-3 text-sm font-semibold text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40"
              >
                {validationMessage}
              </p>
            ) : null}
          </div>

          {step.type === "recipient-with-preference" ? (
            <div className="quiz-answer-region mt-6 space-y-6 sm:mt-7">
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Who the gift is for</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {RECIPIENT_OPTIONS.map((option) => {
                    const isActive = answers.recipientType === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isActive}
                        className={clsx("quiz-option", isActive && "quiz-option-active")}
                        onClick={() => {
                          setValidationMessage("");
                          setAnswers((previous) => ({
                            ...previous,
                            recipientType: option
                          }));
                        }}
                      >
                        <span className="flex min-w-0 items-center justify-between gap-4">
                          <span className="min-w-0 break-words">{option}</span>
                          <span
                            className={clsx(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                              isActive
                                ? "border-coral bg-coral text-white"
                                : "border-slate-200 bg-slate-50 text-slate-400"
                            )}
                          >
                            {isActive ? "OK" : ""}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Preference</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {GENDER_OPTIONS.map((option) => {
                    const isActive = answers.gender === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isActive}
                        className={clsx("quiz-option", isActive && "quiz-option-active")}
                        onClick={() => {
                          setValidationMessage("");
                          setAnswers((previous) => ({
                            ...previous,
                            gender: option
                          }));
                        }}
                      >
                        <span className="flex min-w-0 items-center justify-between gap-4">
                          <span className="min-w-0 break-words">{option}</span>
                          <span
                            className={clsx(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                              isActive
                                ? "border-coral bg-coral text-white"
                                : "border-slate-200 bg-slate-50 text-slate-400"
                            )}
                          >
                            {isActive ? "OK" : ""}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-answer-region mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
              {step.options.map((option) => {
                const isActive =
                  step.type === "multi"
                    ? (answers[step.field] as string[]).includes(option)
                    : answers[step.field] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={isActive}
                    className={clsx("quiz-option", isActive && "quiz-option-active")}
                    onClick={() => (step.type === "multi" ? updateMultiAnswer(option) : updateSingleAnswer(option))}
                  >
                    <span className="flex min-w-0 items-center justify-between gap-4">
                      <span className="min-w-0 break-words">{option}</span>
                      <span
                        className={clsx(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                          isActive
                            ? "border-coral bg-coral text-white"
                            : "border-slate-200 bg-slate-50 text-slate-400"
                        )}
                      >
                        {isActive ? "OK" : step.type === "multi" ? "+" : ""}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          role="group"
          aria-label="Quiz navigation"
          aria-busy={isSubmitting}
          className={clsx("quiz-mobile-actions", !isQuizCardVisible && "quiz-mobile-actions-hidden")}
        >
          <div className="quiz-mobile-actions-inner">
            <button
              type="button"
              onClick={goBack}
              className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-disabled={isSubmitting}
              aria-describedby={validationMessage ? "quiz-validation-message" : undefined}
              className={clsx(
                "button-primary",
                !canContinue && !isSubmitting && "cursor-not-allowed opacity-60 shadow-none hover:translate-y-0 hover:scale-100 hover:bg-coral"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Preparing results..." : isLastStep ? "Show Gift Ideas" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
