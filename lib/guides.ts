import { giftCatalog } from "../data/gifts.ts";
import { budgetOrder } from "./quiz.ts";
import type { AgeRange, BudgetRange, GiftItem, Occasion, QuizAnswers, RecipientType } from "../types/gift.ts";

export interface GiftGuide {
  slug: string;
  group: "christmas" | "occasion";
  /** Short label for tiles and navigation. */
  label: string;
  /** Page heading. */
  title: string;
  /** Search-result description. */
  description: string;
  /** Opening paragraph on the page. */
  intro: string;
  occasion: Occasion;
  recipient?: RecipientType;
  gender?: "Male" | "Female";
  ages?: AgeRange[];
  maxBudget?: Exclude<BudgetRange, "No range">;
  /** Hand-picked gift ids shown first, in this order. The rest of the page is filled automatically. */
  featured?: string[];
}

const CHILD_AGES: AgeRange[] = ["Under 13", "13-17"];

/** Categories that only suit shoppers who picked that interest, so guides leave them out by default. */
const NICHE_CATEGORIES = new Set(["Pets"]);

export const giftGuides: GiftGuide[] = [
  {
    slug: "christmas-gifts",
    featured: ["stand-mixer", "plush-fleece-robe", "noise-cancel-earbuds", "hot-cocoa-gift-set", "family-board-game", "cashmere-scarf", "e-reader", "pour-over-coffee-kit", "personalized-ornament", "weighted-blanket", "streaming-stick", "matching-family-pajamas", "gourmet-gift-basket", "digital-picture-frame"],
    group: "christmas",
    label: "All Christmas gifts",
    title: "Christmas gift ideas for everyone on your list",
    description: "Christmas gift ideas for every budget, from stocking stuffers to main presents. Browse the guide or take the quiz for personal picks.",
    intro: "A short list of Christmas gifts people are glad to open, from small stocking stuffers to main presents. Each one links to current options on Amazon.",
    occasion: "Christmas"
  },
  {
    slug: "christmas-gifts-for-mom",
    featured: ["plush-fleece-robe", "digital-picture-frame", "silk-pillowcase-set", "custom-photo-book", "memory-foam-slippers", "cashmere-scarf", "luxe-skincare-set", "personalized-ornament", "pour-over-coffee-kit", "e-reader", "plush-throw-blanket", "perfume-discovery-set", "cozy-reading-kit", "hot-cocoa-gift-set"],
    group: "christmas",
    label: "For Mom",
    title: "Christmas gifts for Mom",
    description: "Thoughtful Christmas gifts for Mom, from cozy comforts to keepsakes she will use all year.",
    intro: "Comforts, keepsakes, and useful upgrades that show you thought about her, at a range of budgets.",
    occasion: "Christmas",
    recipient: "Mom",
    gender: "Female"
  },
  {
    slug: "christmas-gifts-for-dad",
    featured: ["bbq-grill-tool-set", "whiskey-glass-set", "stainless-multi-tool", "pour-over-coffee-kit", "streaming-stick", "memory-foam-slippers", "insulated-camp-mug-set", "forged-chefs-knife", "percussion-massage-gun", "portable-fire-pit", "gourmet-sauce-kit", "sport-socks-set", "smart-mug", "digital-picture-frame"],
    group: "christmas",
    label: "For Dad",
    title: "Christmas gifts for Dad",
    description: "Christmas gifts for Dad that he will actually use, from kitchen and grill tools to tech and outdoor gear.",
    intro: "Dads are hard to shop for. These are practical gifts he will reach for, with a few that feel like a treat.",
    occasion: "Christmas",
    recipient: "Dad",
    gender: "Male"
  },
  {
    slug: "christmas-gifts-for-her",
    featured: ["cashmere-scarf", "perfume-discovery-set", "silk-sleep-set", "birthstone-necklace", "luxe-skincare-set", "plush-fleece-robe", "custom-photo-book", "multi-styler-hair-tool", "leather-tote-bag", "e-reader", "pasta-making-kit", "silk-pillowcase-set", "spa-gift-card", "personalized-necklace"],
    group: "christmas",
    label: "For her",
    title: "Christmas gifts for her",
    description: "Christmas gift ideas for your wife or girlfriend, from everyday luxuries to personal keepsakes.",
    intro: "Gifts for a wife or girlfriend that feel personal: small luxuries, things to enjoy together, and pieces she will keep.",
    occasion: "Christmas",
    recipient: "Partner",
    gender: "Female"
  },
  {
    slug: "christmas-gifts-for-him",
    featured: ["engraved-leather-wallet", "classic-minimalist-watch", "cologne-discovery-set", "noise-cancel-earbuds", "whiskey-glass-set", "beard-and-shave-kit", "forged-chefs-knife", "percussion-massage-gun", "pour-over-coffee-kit", "cashmere-scarf", "smart-mug", "hiking-daypack", "streaming-stick", "bbq-grill-tool-set"],
    group: "christmas",
    label: "For him",
    title: "Christmas gifts for him",
    description: "Christmas gift ideas for your husband or boyfriend, from everyday carry to tech, kitchen, and outdoor gear.",
    intro: "Gifts for a husband or boyfriend that get used: well-made everyday items, good tools, and a few indulgences.",
    occasion: "Christmas",
    recipient: "Partner",
    gender: "Male"
  },
  {
    slug: "christmas-gifts-for-kids",
    featured: ["building-brick-set", "kids-science-kit", "coding-robot-kit", "personalized-storybook", "kids-kick-scooter", "family-board-game", "kids-baking-set", "jewelry-making-kit", "soccer-ball-goal-set", "kids-art-caddy", "cookie-decorating-kit", "kids-headphones", "soft-plush-animal", "matching-family-pajamas"],
    group: "christmas",
    label: "For kids",
    title: "Christmas gifts for kids",
    description: "Christmas gifts for kids under 13: building sets, books, creative kits, and active outdoor toys.",
    intro: "Presents for children under 13 that hold their attention past Christmas morning: things to build, read, make, and play with.",
    occasion: "Christmas",
    ages: ["Under 13"]
  },
  {
    slug: "christmas-gifts-for-teens",
    featured: ["gaming-headset", "instant-camera", "hoodie-blanket", "smart-led-room-lights", "portable-speaker", "everyday-wireless-earbuds", "e-reader", "ukulele-starter-kit", "watercolor-paint-set", "family-board-game", "slim-portable-charger", "guided-journal", "indoor-outdoor-basketball", "cozy-sock-gift-box"],
    group: "christmas",
    label: "For teens",
    title: "Christmas gifts for teens",
    description: "Christmas gifts teenagers want: tech, room decor, games, music, and creative kits.",
    intro: "Teenagers know what they like. These are gifts for ages 13 to 17 that fit how they spend their time.",
    occasion: "Christmas",
    ages: ["13-17"]
  },
  {
    slug: "christmas-gifts-under-25",
    featured: ["hot-cocoa-gift-set", "cozy-sock-gift-box", "personalized-ornament", "cookie-decorating-kit", "memory-foam-slippers", "heated-neck-wrap", "gourmet-sauce-kit", "hand-poured-candle-trio", "cooperative-card-game", "slim-portable-charger", "personalized-apron", "insulated-camp-mug-set", "jam-and-honey-trio", "sketchbook-pencil-set"],
    group: "christmas",
    label: "Under $25",
    title: "Christmas gifts under $25",
    description: "Christmas gifts under $25 that still feel thoughtful, for stockings, gift swaps, and long lists.",
    intro: "Small gifts for stockings, gift swaps, and long lists. Each one is under $25 and still feels chosen.",
    occasion: "Christmas",
    maxBudget: "Under $25"
  },
  {
    slug: "christmas-gifts-for-coworkers",
    featured: ["hot-cocoa-gift-set", "desk-plant-kit", "artisan-coffee-box", "cookie-gift-tin", "hand-poured-candle-trio", "desk-organizer-set", "gourmet-snack-box", "tea-and-honey-set", "cozy-sock-gift-box", "jam-and-honey-trio", "slim-portable-charger", "cooperative-card-game"],
    group: "christmas",
    label: "For coworkers",
    title: "Christmas gifts for coworkers",
    description: "Christmas gifts for coworkers and office gift exchanges that are friendly, useful, and under $50.",
    intro: "Friendly, easy gifts for coworkers, a boss, or an office exchange. Everything here is under $50 and safe for the workplace.",
    occasion: "Christmas",
    recipient: "Coworker",
    maxBudget: "$25-$50"
  },
  {
    slug: "birthday-gifts",
    group: "occasion",
    label: "Birthday",
    title: "Birthday gift ideas",
    description: "Birthday gift ideas for friends, family, and partners, across every budget.",
    intro: "Birthday gifts that feel like a celebration, for friends, family, and partners.",
    occasion: "Birthday"
  },
  {
    slug: "anniversary-gifts",
    group: "occasion",
    label: "Anniversary",
    title: "Anniversary gift ideas",
    description: "Anniversary gift ideas for your partner, from keepsakes to experiences you can share.",
    intro: "Gifts that mark the years together: keepsakes, small luxuries, and experiences to share.",
    occasion: "Anniversary",
    recipient: "Partner"
  },
  {
    slug: "valentines-day-gifts",
    group: "occasion",
    label: "Valentine's Day",
    title: "Valentine's Day gift ideas",
    description: "Valentine's Day gift ideas for your partner, from classic romantic gestures to gifts you enjoy together.",
    intro: "Romantic gifts for your partner, from the classics to things you can enjoy together.",
    occasion: "Valentine's Day",
    recipient: "Partner"
  },
  {
    slug: "wedding-gifts",
    group: "occasion",
    label: "Wedding",
    title: "Wedding gift ideas",
    description: "Wedding gift ideas for the couple, from personalized keepsakes to kitchen classics.",
    intro: "Gifts a newly married couple will use and keep, from personalized keepsakes to kitchen classics.",
    occasion: "Wedding"
  },
  {
    slug: "baby-shower-gifts",
    group: "occasion",
    label: "Baby shower",
    title: "Baby shower gift ideas",
    description: "Baby shower gift ideas new parents will use, from daily essentials to first-year keepsakes.",
    intro: "Useful essentials and first-year keepsakes that new parents are glad to receive.",
    occasion: "Baby Shower"
  },
  {
    slug: "graduation-gifts",
    group: "occasion",
    label: "Graduation",
    title: "Graduation gift ideas",
    description: "Graduation gift ideas for high school and college grads, from practical gear to keepsakes.",
    intro: "Gifts for a new graduate: practical gear for what comes next and keepsakes to mark the achievement.",
    occasion: "Graduation"
  },
  {
    slug: "thank-you-gifts",
    group: "occasion",
    label: "Thank you",
    title: "Thank-you gift ideas",
    description: "Thank-you gift ideas for hosts, teachers, coworkers, and friends.",
    intro: "Modest, well-chosen gifts for a host, teacher, coworker, or friend who went out of their way.",
    occasion: "Thank You"
  }
];

export function getGuide(slug: string) {
  return giftGuides.find((guide) => guide.slug === slug);
}

export function getGuidesByGroup(group: GiftGuide["group"]) {
  return giftGuides.filter((guide) => guide.group === group);
}

function fitsOccasion(occasions: Occasion[] | undefined, occasion: Occasion) {
  const aliases: Occasion[] =
    occasion === "Christmas" || occasion === "Holiday" ? ["Christmas", "Holiday"] : [occasion];
  return Boolean(occasions?.some((item) => aliases.includes(item)));
}

function matchesGuide(gift: GiftItem, guide: GiftGuide) {
  if (!fitsOccasion(gift.occasions, guide.occasion)) return false;
  if (NICHE_CATEGORIES.has(gift.category)) return false;
  if (guide.gender && !gift.genderTargets.includes(guide.gender)) return false;
  if (!guide.gender && gift.genderTargets.length < 2) return false;

  if (guide.ages) {
    if (!guide.ages.some((age) => gift.ageRanges.includes(age))) return false;
  } else {
    if (gift.ageRanges.every((age) => CHILD_AGES.includes(age))) return false;
    if (gift.category === "Gaming" || gift.category === "Toys") return false;
  }

  if (guide.recipient && !gift.recipientTypes.includes(guide.recipient)) return false;

  if (guide.maxBudget) {
    const max = budgetOrder.indexOf(guide.maxBudget);
    const price = budgetOrder.indexOf(gift.priceRange as (typeof budgetOrder)[number]);
    if (price === -1 || price > max) return false;
  }

  return true;
}

/**
 * Gifts for a guide page: signature picks for the occasion first, then
 * interleaved by category so the page reads as a varied list.
 */
export function getGuideGifts(guide: GiftGuide, limit = 12): GiftItem[] {
  const featured = (guide.featured ?? [])
    .map((id) => giftCatalog.find((gift) => gift.id === id))
    .filter((gift): gift is GiftItem => Boolean(gift) && fitsOccasion(gift?.occasions, guide.occasion));
  const matches = giftCatalog.filter((gift) => matchesGuide(gift, guide) && !featured.includes(gift));
  const signature = matches.filter((gift) => fitsOccasion(gift.bestFor, guide.occasion));
  const others = matches.filter((gift) => !signature.includes(gift));

  const interleave = (gifts: GiftItem[]) => {
    const byCategory = new Map<string, GiftItem[]>();
    for (const gift of gifts) {
      byCategory.set(gift.category, [...(byCategory.get(gift.category) ?? []), gift]);
    }

    const ordered: GiftItem[] = [];
    const queues = [...byCategory.values()];
    while (queues.some((queue) => queue.length > 0)) {
      for (const queue of queues) {
        const next = queue.shift();
        if (next) ordered.push(next);
      }
    }
    return ordered;
  };

  return [...featured, ...interleave(signature), ...interleave(others)].slice(0, limit);
}

/** Quiz answers a guide starts the quiz with. */
export function getGuideQuizPreset(guide: GiftGuide): Partial<QuizAnswers> {
  return {
    occasion: guide.occasion,
    recipientType: guide.recipient,
    gender: guide.gender,
    ageRange: guide.ages?.length === 1 ? guide.ages[0] : undefined,
    budget: guide.maxBudget
  };
}
