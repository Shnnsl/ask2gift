import assert from "node:assert/strict";
import test from "node:test";
import { buildAmazonSearchQuery, buildAmazonSearchUrl } from "../lib/affiliate.ts";
import type { QuizAnswers } from "../types/gift.ts";

const baseAnswers: QuizAnswers = {
  gender: "Female",
  recipientType: "Mom",
  ageRange: "45-64",
  occasion: "Birthday",
  budget: "$25-$50",
  interests: ["Jewelry"],
  styles: ["Thoughtful"]
};

test("buildAmazonSearchUrl encodes a normal product name with the associate tag", () => {
  const url = buildAmazonSearchUrl("personalized gardening tool set");
  assert.equal(
    url,
    "https://www.amazon.com/s?k=personalized+gardening+tool+set&tag=ask2gift20-20"
  );
});

test("buildAmazonSearchUrl handles multiple words and apostrophes", () => {
  const url = buildAmazonSearchUrl("children's science kit");
  assert.equal(
    url,
    "https://www.amazon.com/s?k=children%27s+science+kit&tag=ask2gift20-20"
  );
});

test("buildAmazonSearchUrl normalizes ampersands and special characters", () => {
  const url = buildAmazonSearchUrl("bath & body gift set! #1");
  assert.equal(
    url,
    "https://www.amazon.com/s?k=bath+and+body+gift+set+1&tag=ask2gift20-20"
  );
});

test("buildAmazonSearchUrl safely handles blank input", () => {
  assert.equal(buildAmazonSearchUrl("   "), null);
});

test("buildAmazonSearchQuery prioritizes the recommendation title and useful recipient context", () => {
  const query = buildAmazonSearchQuery(
    { title: "Personalized Gardening Tool Set" },
    {
      ...baseAnswers,
      recipientType: "Partner",
      interests: ["Outdoors"],
      occasion: "Birthday"
    }
  );

  assert.equal(query, "Personalized Gardening Tool Set gift for her outdoors birthday gift");
});

test("buildAmazonSearchQuery adds age-specific child context when useful", () => {
  const query = buildAmazonSearchQuery(
    { title: "Science Experiment Kit" },
    {
      ...baseAnswers,
      gender: "Male",
      recipientType: "Child",
      ageRange: "Under 13",
      interests: ["Tech / Electronics"],
      occasion: "Christmas"
    }
  );

  assert.equal(query, "Science Experiment Kit for young boy tech electronics Christmas gift");
});
