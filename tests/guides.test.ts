import assert from "node:assert/strict";
import test from "node:test";
import { giftCatalog } from "../data/gifts.ts";
import { getGuide, getGuideGifts, getGuideQuizPreset, giftGuides } from "../lib/guides.ts";
import { budgetOrder, buildQuizLink, getQuizPresetFromParams } from "../lib/quiz.ts";

test("guide slugs are unique and every guide fills a page", () => {
  const slugs = giftGuides.map((guide) => guide.slug);
  assert.equal(new Set(slugs).size, slugs.length);

  for (const guide of giftGuides) {
    const gifts = getGuideGifts(guide, 12);
    assert.equal(gifts.length, 12, guide.slug);
    assert.equal(new Set(gifts.map((gift) => gift.id)).size, 12, `${guide.slug} has duplicates`);
  }
});

test("featured gifts exist and respect the guide's audience and budget", () => {
  for (const guide of giftGuides) {
    for (const id of guide.featured ?? []) {
      const gift = giftCatalog.find((item) => item.id === id);
      assert.ok(gift, `${guide.slug}: unknown gift ${id}`);

      const seasonal = gift.occasions.includes("Christmas") || gift.occasions.includes("Holiday");
      assert.ok(guide.occasion !== "Christmas" || seasonal, `${guide.slug}: ${id} is not a Christmas gift`);
      if (guide.gender) assert.ok(gift.genderTargets.includes(guide.gender), `${guide.slug}: ${id} gender`);
      if (guide.ages) assert.ok(guide.ages.some((age) => gift.ageRanges.includes(age)), `${guide.slug}: ${id} age`);
      if (guide.maxBudget) {
        const price = budgetOrder.indexOf(gift.priceRange as (typeof budgetOrder)[number]);
        assert.ok(price <= budgetOrder.indexOf(guide.maxBudget), `${guide.slug}: ${id} is over budget`);
      }
    }
  }
});

test("guides for adults never list children's gifts", () => {
  for (const guide of giftGuides.filter((item) => !item.ages)) {
    for (const gift of getGuideGifts(guide, 12)) {
      assert.ok(gift.ageRanges.some((age) => age !== "Under 13" && age !== "13-17"), `${guide.slug}: ${gift.id}`);
    }
  }
});

test("a guide's quiz link round-trips into quiz answers", () => {
  const guide = getGuide("christmas-gifts-for-mom");
  assert.ok(guide);

  const link = buildQuizLink(getGuideQuizPreset(guide));
  assert.equal(link, "/quiz?occasion=Christmas&recipient=Mom&for=her");

  const preset = getQuizPresetFromParams(new URLSearchParams(link.split("?")[1]));
  assert.deepEqual(preset, { occasion: "Christmas", recipientType: "Mom", gender: "Female" });
});

test("quiz links ignore values that are not real quiz options", () => {
  const preset = getQuizPresetFromParams(new URLSearchParams("occasion=Easter&recipient=<script>&budget=free&for=them"));
  assert.deepEqual(preset, {});
});
