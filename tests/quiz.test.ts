import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const wizardSource = readFileSync(
  join(process.cwd(), "components", "quiz", "QuizWizard.tsx"),
  "utf8"
);
const storageSource = readFileSync(join(process.cwd(), "lib", "storage.ts"), "utf8");

test("advancing changes the active step and visible question", () => {
  assert.match(wizardSource, /const step = steps\[currentStep\]/);
  assert.match(wizardSource, /setCurrentStep\(\(value\) => value \+ 1\)/);
  assert.match(wizardSource, /\{step\.title\}/);
});

test("Back restores the previous step without clearing selections", () => {
  const goBackSource = wizardSource.match(/const goBack = \(\) => \{([\s\S]*?)\n  \};/)?.[1] ?? "";

  assert.match(goBackSource, /Math\.max\(0, value - 1\)/);
  assert.doesNotMatch(goBackSource, /setAnswers/);
});

test("step transitions focus and reveal the new question heading", () => {
  assert.match(wizardSource, /questionHeadingRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(wizardSource, /questionContainerRef\.current\?\.scrollIntoView/);
  assert.match(wizardSource, /prefers-reduced-motion: reduce/);
  assert.match(wizardSource, /tabIndex=\{-1\}/);
});

test("validation prevents advancement without a required answer", () => {
  assert.match(wizardSource, /if \(!canContinue\) \{/);
  assert.match(wizardSource, /Choose an answer before continuing\./);
  assert.match(wizardSource, /validationMessageRef\.current\?\.focus\(\)/);
  assert.match(wizardSource, /role="alert"/);
});

test("final quiz submission cannot start twice", () => {
  assert.match(wizardSource, /if \(submissionStartedRef\.current\) \{/);
  assert.match(wizardSource, /submissionStartedRef\.current = true/);
  assert.match(wizardSource, /disabled=\{isSubmitting\}/);
});

test("mobile navigation exposes accessible Back and Continue controls", () => {
  assert.match(wizardSource, /role="group"/);
  assert.match(wizardSource, /aria-label="Quiz navigation"/);
  assert.match(wizardSource, /quiz-mobile-actions/);
  assert.match(wizardSource, />\s*Back\s*</);
  assert.match(wizardSource, /isLastStep \? "Show Gift Ideas" : "Continue"/);
});

test("quiz-answer serialization remains unchanged", () => {
  assert.match(
    storageSource,
    /window\.sessionStorage\.setItem\(quizStorageKey, JSON\.stringify\(value\)\)/
  );
});
