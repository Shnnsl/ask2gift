import assert from "node:assert/strict";
import test from "node:test";
import { giftCatalog } from "../data/gifts.ts";
import { OCCASION_OPTIONS } from "../lib/quiz.ts";
import { getRecommendationResponse, getRecommendations } from "../lib/recommendations.ts";
import type { Occasion, QuizAnswers } from "../types/gift.ts";

const baseAnswers: QuizAnswers = {
  gender: "Female",
  recipientType: "Partner",
  ageRange: "25-34",
  occasion: "Birthday",
  budget: "$50-$100",
  interests: ["Tech / Electronics", "Cooking"],
  styles: ["Practical"]
};

function fitsOccasion(occasions: Occasion[], occasion: Occasion) {
  const aliases: Occasion[] =
    occasion === "Christmas" || occasion === "Holiday" ? ["Christmas", "Holiday"] : [occasion];
  return occasions.some((item) => aliases.includes(item));
}

test("catalog ids are unique and bestFor stays inside occasions", () => {
  const ids = giftCatalog.map((gift) => gift.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const gift of giftCatalog) {
    for (const occasion of gift.bestFor ?? []) {
      assert.ok(fitsOccasion(gift.occasions, occasion), `${gift.id} bestFor ${occasion}`);
    }
  }
});

test("every occasion and budget has enough gifts to fill a results page", () => {
  for (const occasion of OCCASION_OPTIONS) {
    for (const budget of ["Under $25", "$25-$50", "$50-$100", "$100+"] as const) {
      const matches = giftCatalog.filter(
        (gift) =>
          fitsOccasion(gift.occasions, occasion) &&
          gift.priceRange === budget &&
          gift.genderTargets.length === 2
      );
      assert.ok(matches.length >= 2, `${occasion} at ${budget} has only ${matches.length} gifts`);
    }
  }
});

test("every recommendation fits the selected occasion", () => {
  for (const occasion of OCCASION_OPTIONS) {
    const results = getRecommendations({ ...baseAnswers, occasion });
    assert.equal(results.length, 6, occasion);

    for (const gift of results) {
      assert.ok(fitsOccasion(gift.occasions, occasion), `${gift.title} shown for ${occasion}`);
    }
  }
});

test("changing only the occasion changes the results", () => {
  const birthday = new Set(getRecommendations(baseAnswers).map((gift) => gift.id));

  for (const occasion of ["Anniversary", "Valentine's Day", "Wedding", "Baby Shower", "Graduation", "Thank You"] as const) {
    const shared = getRecommendations({ ...baseAnswers, occasion }).filter((gift) => birthday.has(gift.id));
    assert.ok(shared.length <= 2, `${occasion} shares ${shared.length} gifts with Birthday`);
  }
});

test("Christmas and Holiday are treated as the same season", () => {
  const christmas = getRecommendations({ ...baseAnswers, occasion: "Christmas" }).map((gift) => gift.id);
  const holiday = getRecommendations({ ...baseAnswers, occasion: "Holiday" }).map((gift) => gift.id);
  assert.deepEqual(christmas, holiday);
});

test("baby shower and wedding results are occasion-specific gifts", () => {
  const babyShower = getRecommendations({ ...baseAnswers, recipientType: "Coworker", occasion: "Baby Shower" });
  assert.ok(babyShower.every((gift) => gift.bestFor?.includes("Baby Shower")));

  const wedding = getRecommendations({ ...baseAnswers, recipientType: "Friend", occasion: "Wedding" });
  assert.ok(wedding.filter((gift) => gift.bestFor?.includes("Wedding")).length >= 3);
});

test("children only see age-appropriate gifts and adults never see children's gifts", () => {
  const child = getRecommendations({
    ...baseAnswers,
    gender: "Male",
    recipientType: "Child",
    ageRange: "Under 13",
    interests: ["Gaming", "Art"],
    styles: ["Fun"]
  });
  assert.ok(child.every((gift) => gift.ageRanges.includes("Under 13")));

  for (const occasion of OCCASION_OPTIONS) {
    const adult = getRecommendations({ ...baseAnswers, occasion });
    assert.ok(
      adult.every((gift) => gift.ageRanges.some((age) => age !== "Under 13" && age !== "13-17")),
      occasion
    );
  }
});

test("gender-specific gifts are not shown for the other gender", () => {
  for (const occasion of OCCASION_OPTIONS) {
    const results = getRecommendations({ ...baseAnswers, gender: "Male", occasion, interests: ["Jewelry", "Fashion"] });
    assert.ok(results.every((gift) => gift.genderTargets.includes("Male")), occasion);
  }
});

test("gaming and pet gifts appear only when that interest is selected", () => {
  for (const occasion of OCCASION_OPTIONS) {
    const results = getRecommendations({ ...baseAnswers, occasion });
    assert.ok(results.every((gift) => gift.category !== "Gaming" && gift.category !== "Pets"), occasion);
  }

  const petLover = getRecommendations({ ...baseAnswers, occasion: "Thank You", interests: ["Pets"] });
  assert.ok(petLover.some((gift) => gift.category === "Pets"));
});

test("results stay within one step of the selected budget", () => {
  const order = ["Under $25", "$25-$50", "$50-$100", "$100+"];

  for (const occasion of OCCASION_OPTIONS) {
    for (const budget of order) {
      const results = getRecommendations({ ...baseAnswers, occasion, budget: budget as QuizAnswers["budget"] });
      for (const gift of results) {
        const distance = Math.abs(order.indexOf(gift.priceRange) - order.indexOf(budget));
        assert.ok(distance <= 1, `${gift.title} (${gift.priceRange}) for ${budget} ${occasion}`);
      }
    }
  }
});

test("results are sorted, scored 0-100, diverse, and free of duplicates", () => {
  for (const occasion of OCCASION_OPTIONS) {
    const results = getRecommendations({ ...baseAnswers, occasion });
    const ids = results.map((gift) => gift.id);
    assert.equal(new Set(ids).size, ids.length);

    results.forEach((gift, index) => {
      assert.ok(gift.score >= 0 && gift.score <= 100);
      if (index > 0) assert.ok(results[index - 1].score >= gift.score, `${occasion} is sorted`);
    });

    const categoryCounts = new Map<string, number>();
    for (const gift of results) categoryCounts.set(gift.category, (categoryCounts.get(gift.category) ?? 0) + 1);
    assert.ok(Math.max(...categoryCounts.values()) <= 3, `${occasion} is not dominated by one category`);
  }
});

test("incomplete answers still return recommendations without throwing", () => {
  const response = getRecommendationResponse({} as QuizAnswers);
  assert.equal(response.recommendations.length, 6);
});
