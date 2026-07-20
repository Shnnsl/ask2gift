"use client";

import { useMemo, useState } from "react";
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

  const step = steps[currentStep];
  const canContinue = useMemo(() => isStepComplete(step, answers), [step, answers]);
  const isLastStep = currentStep === steps.length - 1;

  const updateSingleAnswer = (value: string) => {
    if (step.type !== "single") {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [step.field]: value as SingleValue
    }));
  };

  const updateMultiAnswer = (value: string) => {
    if (step.type !== "multi") {
      return;
    }

    setAnswers((previous) => {
      const list = previous[step.field] as string[];
      const nextList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

      return {
        ...previous,
        [step.field]: nextList as MultiValue
      };
    });
  };

  const goNext = () => {
    if (!canContinue) {
      return;
    }

    if (isLastStep) {
      writeStoredQuizAnswers(answers);
      router.push("/results");
      return;
    }

    setCurrentStep((value) => value + 1);
  };

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl surface p-5 sm:p-8">
          <ProgressBar currentStep={currentStep} totalSteps={quizSteps.length} />
          <div className="mt-8">
            <p className="eyebrow">{quizSteps[currentStep]}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{step.title}</h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg">{step.description}</p>
            {step.type === "multi" ? (
              <p className="mt-3 text-sm text-slate-500">Select all that apply. You can choose more than one.</p>
            ) : step.type === "recipient-with-preference" ? (
              <p className="mt-3 text-sm text-slate-500">Pick one recipient and one preference to keep the results focused.</p>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Choose the closest fit to keep your results focused.</p>
            )}
          </div>

          {step.type === "recipient-with-preference" ? (
            <div className="mt-7 space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Who the gift is for</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {RECIPIENT_OPTIONS.map((option) => {
                    const isActive = answers.recipientType === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        className={clsx("quiz-option", isActive && "quiz-option-active")}
                        onClick={() =>
                          setAnswers((previous) => ({
                            ...previous,
                            recipientType: option
                          }))
                        }
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span>{option}</span>
                          <span
                            className={clsx(
                              "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
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
                        className={clsx("quiz-option", isActive && "quiz-option-active")}
                        onClick={() =>
                          setAnswers((previous) => ({
                            ...previous,
                            gender: option
                          }))
                        }
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span>{option}</span>
                          <span
                            className={clsx(
                              "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
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
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {step.options.map((option) => {
                const isActive =
                  step.type === "multi"
                    ? (answers[step.field] as string[]).includes(option)
                    : answers[step.field] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    className={clsx("quiz-option", isActive && "quiz-option-active")}
                    onClick={() => (step.type === "multi" ? updateMultiAnswer(option) : updateSingleAnswer(option))}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span>{option}</span>
                      <span
                        className={clsx(
                          "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
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

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
              className="button-secondary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              disabled={!canContinue}
            >
              {isLastStep ? "Show Gift Ideas" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
