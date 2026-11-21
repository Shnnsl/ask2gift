"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getAffiliateDisclosureText,
  getAmazonAssociateDisclosureText,
  shouldShowAmazonAssociateDisclosure
} from "@/lib/affiliate";
import { readStoredQuizAnswers } from "@/lib/storage";
import type { QuizAnswers, RecommendationResult } from "@/types/gift";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ResultsFeedback } from "@/components/results/ResultsFeedback";

export function ResultsClient() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usedFallback, setUsedFallback] = useState(false);

  const answerSummary = answers
    ? [
        answers.recipientType ? `For: ${answers.recipientType}` : "",
        answers.occasion,
        answers.budget && answers.budget !== "No range" ? answers.budget : "",
        answers.ageRange ? `Age ${answers.ageRange}` : ""
      ].filter(Boolean)
    : [];

  useEffect(() => {
    const storedAnswers = readStoredQuizAnswers();
    setAnswers(storedAnswers);

    if (!storedAnswers) {
      setLoading(false);
      return;
    }

    async function loadRecommendations() {
      try {
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(storedAnswers)
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const payload = (await response.json()) as {
          recommendations: RecommendationResult[];
          usedFallback?: boolean;
        };
        setResults(payload.recommendations);
        setUsedFallback(Boolean(payload.usedFallback));
      } catch {
        setError("We could not load recommendations right now. Please try the quiz again in a moment.");
      } finally {
        setLoading(false);
      }
    }

    void loadRecommendations();
  }, []);

  const uniqueResults = useMemo(() => {
    const seen = new Set<string>();
    return results.filter((recommendation) => {
      if (seen.has(recommendation.id)) {
        return false;
      }

      seen.add(recommendation.id);
      return true;
    });
  }, [results]);

  if (loading) {
    return (
      <section className="section-space">
        <div className="container-shell">
          <div className="surface max-w-3xl p-6 sm:p-8">
            <span className="chip">Preparing results</span>
            <p className="mt-4 text-lg text-slate-600">Finding thoughtful gift matches for you...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!answers) {
    return (
      <section className="section-space">
        <div className="container-shell">
          <div className="surface max-w-3xl p-6 sm:p-8">
            <span className="chip">No quiz yet</span>
            <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">Start the quiz to see your results</h1>
            <p className="mt-4">
              We could not find a recent quiz response in this browser session yet. Start with a few quick answers and we will suggest gift ideas tailored to your needs.
            </p>
            <div className="mt-8">
              <Link href="/quiz" className="button-primary w-full sm:w-auto">
                Start the Gift Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="surface p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="chip">{usedFallback ? "Closest matches" : "Personalized results"}</span>
              <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">
                {answers.occasion && answers.occasion !== "Just Because"
                  ? `Your ${answers.occasion} gift ideas`
                  : "Your gift ideas"}
              </h1>
              {answerSummary.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your quiz answers">
                  {answerSummary.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {usedFallback ? (
                <>
                  <p className="mt-4 max-w-3xl text-lg">
                    We found the closest matches based on your answers.
                  </p>
                  <p className="mt-2 max-w-3xl text-sm text-slate-500">
                    Try broadening your budget, interests, or gift style for more options.
                  </p>
                </>
              ) : (
                <p className="mt-4 max-w-3xl text-lg">
                  These suggestions are chosen for the occasion first, then ranked by interests, recipient, budget, gift style, and age range.
                </p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Ranked results</p>
                <p className="mt-1 text-sm text-slate-600">Your strongest options appear first.</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Easy to refine</p>
                <p className="mt-1 text-sm text-slate-600">Retake the quiz anytime to narrow the list.</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="text-sm font-semibold text-ink">Favorites ready</p>
                <p className="mt-1 text-sm text-slate-600">Save the best ideas as you compare them.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/quiz" className="button-primary w-full sm:w-auto">
              Retake the quiz
            </Link>
            <Link href="/gift-guides" className="button-secondary w-full sm:w-auto">
              Browse gift guides
            </Link>
          </div>
        </div>

        {uniqueResults.length > 0 ? (
          <p className="mt-8 rounded-[1.5rem] border border-slate-200/80 bg-white/90 px-5 py-4 text-sm text-slate-600">
            {shouldShowAmazonAssociateDisclosure() ? getAmazonAssociateDisclosureText() : getAffiliateDisclosureText()}{" "}
            Links to Amazon are paid links, at no extra cost to you.
          </p>
        ) : null}

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {uniqueResults.map((recommendation, index) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              answers={answers}
              isTopResult={index === 0}
            />
          ))}
        </div>

        {error ? (
          <div className="mt-8 surface max-w-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Recommendation service unavailable</h2>
            <p className="mt-3">{error}</p>
            <p className="mt-2 text-sm text-slate-500">
              Your saved favorites stay in this browser, so you can safely come back after retrying.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => window.location.reload()} className="button-primary w-full sm:w-auto">
                Try again
              </button>
              <Link href="/quiz" className="button-secondary w-full sm:w-auto">
                Return to quiz
              </Link>
            </div>
          </div>
        ) : null}

        {uniqueResults.length === 0 && !error ? (
          <div className="mt-8 surface max-w-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">No strong matches yet</h2>
            <p className="mt-3">
              Try broadening the interests or gift style selections to see more recommendations.
            </p>
            <div className="mt-6">
              <Link href="/quiz" className="button-primary w-full sm:w-auto">
                Adjust quiz answers
              </Link>
            </div>
          </div>
        ) : null}

        {uniqueResults.length > 0 && !error ? (
          <ResultsFeedback answers={answers} recommendations={uniqueResults} />
        ) : null}
      </div>
    </section>
  );
}
