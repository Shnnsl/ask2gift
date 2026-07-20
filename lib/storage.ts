"use client";

import { favoritesStorageKey, quizStorageKey } from "@/lib/quiz";
import type { QuizAnswers } from "@/types/gift";

const resultsFeedbackStorageKey = "ask2gift.resultsFeedback";

export function readStoredQuizAnswers() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(quizStorageKey);
  return raw ? (JSON.parse(raw) as QuizAnswers) : null;
}

export function writeStoredQuizAnswers(value: QuizAnswers) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(quizStorageKey, JSON.stringify(value));
}

export function readFavoriteIds() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  const raw = window.localStorage.getItem(favoritesStorageKey);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

export function writeFavoriteIds(ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(favoritesStorageKey, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("ask2gift:favorites-updated"));
}

export function readResultsFeedback() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(resultsFeedbackStorageKey) ?? "";
}

export function writeResultsFeedback(value: "yes" | "no") {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(resultsFeedbackStorageKey, value);
}
