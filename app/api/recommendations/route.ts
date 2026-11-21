import { NextResponse } from "next/server";
import { getRecommendationResponse } from "@/lib/recommendations";
import type { QuizAnswers } from "@/types/gift";

export async function POST(request: Request) {
  let answers: QuizAnswers;

  try {
    answers = (await request.json()) as QuizAnswers;
  } catch {
    return NextResponse.json({ error: "Quiz answers must be sent as JSON." }, { status: 400 });
  }

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return NextResponse.json({ error: "Quiz answers must be a JSON object." }, { status: 400 });
  }

  const { recommendations, usedFallback } = getRecommendationResponse(answers);
  return NextResponse.json({ recommendations, usedFallback });
}
