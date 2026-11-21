/**
 * Line illustrations for gift cards. Each gift is matched to an illustration by
 * words in its title, then by its category, so every card shows a picture of
 * the kind of gift it is. All icons are drawn on a 24x24 grid.
 */
export interface GiftIcon {
  paths?: string[];
  circles?: [number, number, number][];
  rects?: [number, number, number, number, number][];
}

export const giftIcons = {
  gift: {
    rects: [[3.5, 8, 17, 4, 1]],
    paths: [
      "M5 12v7.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V12",
      "M12 8v12.5",
      "M12 8c-1.2-3-3.2-4.5-4.7-4.2C5.6 4.1 5.6 6.6 7.4 7.4c1 .4 2.6.6 4.6.6Zm0 0c1.2-3 3.2-4.5 4.7-4.2 1.7.3 1.7 2.8-.1 3.6-1 .4-2.6.6-4.6.6Z"
    ]
  },
  mug: {
    paths: ["M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z", "M16 10h1.5a2.5 2.5 0 0 1 0 5H16", "M8.5 3c0 1.2 1 1.2 1 2.4M12 3c0 1.2 1 1.2 1 2.4"]
  },
  book: {
    paths: ["M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2Z", "M12 6.5v13"]
  },
  tablet: { rects: [[6, 3, 12, 18, 2]], paths: ["M10 17.5h4", "M9 7h6M9 10h6M9 13h3"] },
  headphones: {
    paths: ["M4 14v-2a8 8 0 0 1 16 0v2", "M4 14h3v6H6a2 2 0 0 1-2-2v-4Z", "M20 14h-3v6h1a2 2 0 0 0 2-2v-4Z"]
  },
  music: { paths: ["M9 18V5l11-2v13"], circles: [[6.5, 18, 2.5], [17.5, 16, 2.5]] },
  necklace: { paths: ["M5 4c0 6 3 9 7 9s7-3 7-9", "M12 13l2.5 3-2.5 4-2.5-4 2.5-3Z"] },
  ring: { circles: [[12, 15, 5.5]], paths: ["M9.5 6 12 3l2.5 3L12 9.5 9.5 6Z"] },
  watch: {
    circles: [[12, 12, 5]],
    paths: ["M9.5 7.5l.7-4h3.6l.7 4", "M9.5 16.5l.7 4h3.6l.7-4", "M12 9.5V12l1.5 1.5"]
  },
  bed: {
    paths: ["M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6", "M3 15h18", "M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2", "M3 18v2M21 18v2"]
  },
  shirt: { paths: ["M8 3 3 6l2 4 2-1v11h10V9l2 1 2-4-5-3a4 4 0 0 1-8 0Z"] },
  candle: {
    rects: [[8, 10, 8, 11, 1]],
    paths: ["M12 10V8", "M12 3c1.5 1.5 2 2.5 2 3.5a2 2 0 0 1-4 0c0-1 .5-2 2-3.5Z"]
  },
  flower: {
    circles: [[12, 9, 1.8], [12, 4.8, 2], [16, 7.7, 2], [14.5, 12.4, 2], [9.5, 12.4, 2], [8, 7.7, 2]],
    paths: ["M12 14.5V21", "M12 19c2 0 4-1 4.5-3-2 0-4 1-4.5 3Z"]
  },
  bag: { paths: ["M5 8h14l1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L5 8Z", "M9 8V6.5a3 3 0 0 1 6 0V8"] },
  suitcase: {
    rects: [[4, 7, 16, 13, 2]],
    paths: ["M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2", "M9 11v5M15 11v5"]
  },
  camera: {
    paths: ["M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"],
    circles: [[12, 13, 3.5]]
  },
  frame: {
    rects: [[4, 4, 16, 16, 1.5]],
    paths: ["M4 16l4.5-4.5 3.5 3.5 2.5-2.5L20 18"],
    circles: [[15, 9, 1.3]]
  },
  gamepad: {
    paths: [
      "M7 8h10a5 5 0 0 1 5 5v1a3 3 0 0 1-5.500 1.700L15.500 14h-7l-1 1.700A3 3 0 0 1 2 14v-1a5 5 0 0 1 5-5Z",
      "M7 10.500v3M5.500 12h3",
      "M16 11h.01M18 13h.01"
    ]
  },
  ball: {
    circles: [[12, 12, 8.5]],
    paths: ["M3.5 12h17", "M12 3.5c3 2.5 3 14.5 0 17", "M12 3.5c-3 2.5-3 14.5 0 17"]
  },
  dumbbell: { paths: ["M7 8v8M4 10v4M17 8v8M20 10v4M7 12h10"] },
  pot: {
    paths: ["M5 10h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6Z", "M3 10h18", "M10 7h4", "M12 7V5", "M8 3.5c0 1 .8 1 .8 2M15.200 3.500c0 1 .8 1 .8 2"]
  },
  treat: {
    paths: [
      "M7 12h10l-1.500 8h-7L7 12Z",
      "M6.500 12a2.800 2.800 0 0 1 1.200-5 4.500 4.500 0 0 1 8.600 0 2.800 2.800 0 0 1 1.200 5",
      "M12 4V2.500"
    ]
  },
  glass: { paths: ["M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z", "M12 14v6M8.500 20.500h7", "M7.500 7h9"] },
  baby: {
    paths: ["M9 8h6l1 3v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8l1-3Z", "M10 8V6.500a2 2 0 0 1 4 0V8", "M12 4.500V3", "M8 14h3M8 17h3"]
  },
  blocks: { rects: [[3, 12, 8, 8, 1], [13, 12, 8, 8, 1], [8, 3, 8, 8, 1]] },
  palette: {
    paths: [
      "M12 3a9 9 0 1 0 0 18c1.500 0 2-1 2-2s-.5-1.500-.5-2.500S14.500 15 16 15h2a3 3 0 0 0 3-3c0-5-4-9-9-9Z",
      "M7.500 11h.01M10 7.500h.01M14.500 7.500h.01"
    ]
  },
  paw: {
    paths: ["M12 13c-2.500 0-5 2-5 4.500 0 1.500 1.200 2.500 2.700 2.500.9 0 1.500-.4 2.300-.4s1.400.4 2.300.4c1.500 0 2.700-1 2.700-2.500 0-2.500-2.500-4.500-5-4.500Z"],
    circles: [[6, 10.5, 1.5], [9.5, 6.5, 1.5], [14.5, 6.5, 1.5], [18, 10.5, 1.5]]
  },
  mountain: { paths: ["M3 19l6-10 4 6 2.500-3.500L21 19H3Z"], circles: [[17, 6, 1.8]] },
  wrench: {
    paths: ["M20 7.500a4.500 4.500 0 0 1-6 4.200L7 18.700a1.900 1.900 0 0 1-2.700-2.700l7-7A4.500 4.500 0 0 1 16.500 3L14 5.500l.5 2.500 2.500.5L19.500 6c.3.5.5 1 .5 1.500Z"]
  },
  sparkle: {
    paths: [
      "M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800L12 3Z",
      "M18.500 15.500l.7 1.800 1.800.7-1.800.7-.7 1.800-.7-1.800-1.800-.7 1.800-.7.7-1.800Z"
    ]
  },
  droplet: { paths: ["M12 3c3.500 4 6 7 6 10.500a6 6 0 0 1-12 0C6 10 8.500 7 12 3Z", "M9.500 14a2.500 2.500 0 0 0 2.500 2.500"] },
  screen: { rects: [[3, 5, 18, 11, 1.5]], paths: ["M9 20h6M12 16v4"] },
  lamp: { paths: ["M8 3h8l3 8H5l3-8Z", "M12 11v8M8.500 20h7"] },
  pen: { paths: ["M4 20l1-4L16 5l3 3L8 19l-4 1Z", "M14 7l3 3"] },
  ticket: {
    paths: [
      "M4 8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2.500a1.500 1.500 0 0 0 0 3V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2.500a1.500 1.500 0 0 0 0-3V8Z",
      "M14 7.500v2M14 11v2M14 14.500v2"
    ]
  },
  compass: { circles: [[12, 12, 8.5]], paths: ["M15.500 8.500l-2 5-5 2 2-5 5-2Z"] },
  ornament: {
    circles: [[12, 14, 6]],
    paths: ["M10.500 8V6.500h3V8", "M12 6.500V4", "M6.300 12.500h11.400M6.300 15.500h11.400"]
  },
  heart: { paths: ["M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z"] }
} satisfies Record<string, GiftIcon>;

export type GiftIconName = keyof typeof giftIcons;

/** Checked in order: the first rule with a word found in the gift's title wins. */
const TITLE_RULES: [GiftIconName, RegExp][] = [
  ["paw", /\bpet\b/],
  ["baby", /\b(baby|diaper|swaddle|nursery|milestone|mom-to-be|new parent)\b/],
  ["ornament", /\bornament\b/],
  ["frame", /\b(star map|portrait|print|picture frame)\b/],
  ["necklace", /\b(necklace|pendant|locket|pearl)\b/],
  ["ring", /\b(ring|earrings|bracelet|jewelry)\b/],
  ["watch", /\b(watch|tracker)\b/],
  ["headphones", /\b(headphones|earbuds|headset)\b/],
  ["music", /\b(speaker|record|ukulele|concert)\b/],
  ["camera", /\bcamera\b/],
  ["tablet", /\b(e-reader|tablet)\b/],
  ["gamepad", /\b(game|gaming|controller|console|keyboard)\b/],
  ["blocks", /\b(brick|science|robot|plush animal|explorer|scooter)\b/],
  ["palette", /\b(paint|paint-by-numbers|watercolor|sketchbook|embroidery|pottery|art caddy)\b/],
  ["pen", /\b(pen|stationery|padfolio|embosser|notebook|organizer)\b/],
  ["flower", /\b(plant|flower|rose)\b/],
  ["book", /\b(book|novel|journal|library|storytime|storybook|cookbook|classics|album|reading)\b/],
  ["glass", /\b(whiskey|wine|decanter|flute|champagne)\b/],
  ["mug", /\b(mug|cocoa|coffee|tea)\b/],
  ["mountain", /\b(hammock|camp|camping|fire pit|hiking|picnic)\b/],
  ["treat", /\b(snack|cookie|chocolate|truffle|jam|basket|hamper|waffle|baking)\b/],
  ["pot", /\b(knife|bbq|grill|cutting board|spice|sauce|olive oil|pasta|serveware|recipe|dutch oven|mixer|fryer|apron)\b/],
  ["ticket", /\b(gift card|voucher|subscription)\b/],
  ["heart", /\b(heart|love|date night|couples|anniversary|vow)\b/],
  ["candle", /\b(candle|diffuser)\b/],
  ["bed", /\b(blanket|sheet|pillow|pillowcase|sleep)\b/],
  ["shirt", /\b(robe|pajamas|scarf|hoodie|sock|socks|slippers|cap|headband)\b/],
  ["suitcase", /\b(carry-on|luggage|passport|packing|adapter|weekender|toiletry)\b/],
  ["bag", /\b(bag|tote|backpack|wallet|daypack|carrier|case)\b/],
  ["compass", /\b(compass|map)\b/],
  ["frame", /\b(frame|photo|sign|handprint|keepsake)\b/],
  ["ball", /\b(ball|pickleball|soccer|basketball|paddle)\b/],
  ["dumbbell", /\b(dumbbell|resistance|yoga|recovery|massage gun|water bottle)\b/],
  ["sparkle", /\b(skincare|makeup|perfume|cologne|hair|shave|grooming)\b/],
  ["wrench", /\b(tool|multi-tool)\b/],
  ["droplet", /\b(spa|bath|massage|neck wrap)\b/],
  ["lamp", /\b(lamp|light|lights|projector)\b/],
  ["screen", /\b(streaming|monitor|docking|charger|charging|white noise)\b/],
  ["gift", /\b(tray|tin)\b/]
];

const CATEGORY_ICONS: Record<string, GiftIconName> = {
  "Tech / Electronics": "screen",
  Gaming: "gamepad",
  Games: "gamepad",
  Music: "music",
  Art: "palette",
  Books: "book",
  Stationery: "pen",
  Keepsakes: "frame",
  Jewelry: "ring",
  Fashion: "shirt",
  Beauty: "sparkle",
  "Self-care": "droplet",
  Baby: "baby",
  Toys: "blocks",
  Food: "treat",
  Cooking: "pot",
  Home: "lamp",
  Travel: "suitcase",
  Outdoors: "mountain",
  Sports: "ball",
  Fitness: "dumbbell",
  Pets: "paw",
  Experiences: "ticket"
};

export function pickGiftIcon(title: string, category: string): GiftIconName {
  const text = title.toLowerCase();
  const rule = TITLE_RULES.find(([, pattern]) => pattern.test(text));
  return rule?.[0] ?? CATEGORY_ICONS[category] ?? "gift";
}
