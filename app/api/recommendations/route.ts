import { NextResponse } from "next/server";
import { getRecommendationResponse } from "@/lib/recommendations";
import type { QuizAnswers } from "@/types/gift";

export async function POST(request: Request) {
  const answers = (await request.json()) as QuizAnswers;
  const { recommendations, usedFallback } = getRecommendationResponse(answers);
  return NextResponse.json({ recommendations, usedFallback });
}
