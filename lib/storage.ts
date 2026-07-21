"use client";

import { favoritesStorageKey, quizStorageKey } from "@/lib/quiz";
import type { QuizAnswers } from "@/types/gift";

const feedbackSessionStorageKey = "ask2gift.feedbackSessionId";
const feedbackResultSubmissionsStorageKey = "ask2gift.feedbackSubmittedResults";

function readLocalStorageItem(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalStorageItem(key: string, value: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function readSessionStorageItem(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorageItem(key: string, value: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

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

export function getAnonymousFeedbackSessionId() {
  const existing = readLocalStorageItem(feedbackSessionStorageKey);
  if (existing) {
    return existing;
  }

  if (typeof window === "undefined" || typeof window.crypto?.randomUUID !== "function") {
    return null;
  }

  const sessionId = window.crypto.randomUUID();
  return writeLocalStorageItem(feedbackSessionStorageKey, sessionId) ? sessionId : null;
}

export function hasSubmittedFeedbackForResultSet(resultSetKey: string) {
  const raw = readSessionStorageItem(feedbackResultSubmissionsStorageKey);
  if (!raw) {
    return false;
  }

  try {
    const keys = JSON.parse(raw) as string[];
    return keys.includes(resultSetKey);
  } catch {
    return false;
  }
}

export function markSubmittedFeedbackForResultSet(resultSetKey: string) {
  const raw = readSessionStorageItem(feedbackResultSubmissionsStorageKey);
  let keys: string[] = [];

  if (raw) {
    try {
      keys = JSON.parse(raw) as string[];
    } catch {
      keys = [];
    }
  }

  const nextKeys = [...new Set([...keys, resultSetKey])];
  writeSessionStorageItem(feedbackResultSubmissionsStorageKey, JSON.stringify(nextKeys));
}
