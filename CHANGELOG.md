# Changelog

## [Unreleased]

- Added a daily Supabase keep-alive (`/api/keep-alive`, scheduled in `vercel.json`) so the free-plan project is not paused for inactivity.
- Added a photo slideshow (five occasions, swipe and keyboard support) to the About card on the home page.
- Gift cards show an illustration of the kind of gift instead of stock photos.
- Added gift guides (`/gift-guides`): 7 occasion guides and 9 Christmas guides, built from the catalog with hand-picked Christmas features.
- Home page now leads with gift ideas for every occasion; a Christmas row and announcement bar appear automatically from November 1 to December 25.
- Quiz links can preselect answers (`/quiz?occasion=Christmas&recipient=Mom&for=her`).
- Results, favorites, and guides share one consistent gift card design; favorites now use Amazon affiliate links.
- Results page shows the affiliate disclosure once and the shopper's answers as chips.
- Added a mobile menu, favicon, social share image, web manifest, FAQ, and structured data.
- Fixed canonical URLs (every page previously pointed search engines at the home page) and expanded the sitemap.
- The recommendations API returns 400 for malformed requests instead of 500.
- Updated Next.js from 14.2.28 to 14.2.35 (security patch).
- Rebuilt recommendation scoring so results are chosen for the selected occasion first; scores are no longer capped into ties at 100.
- Christmas and Holiday now match the same gifts (Christmas previously matched nothing).
- Grew the gift catalog from 78 to 207 ideas, with dedicated wedding, baby shower, Valentine's Day, Christmas, graduation, gaming, pets, music, art, outdoors, and children's gifts.
- Added `bestFor` to gifts to mark signature picks for an occasion.
- Results now respect the recipient's age and gender, and stay within one step of the selected budget.
- Added recommendation engine tests (`tests/recommendations.test.ts`).
- Removed developer notes from the About, Favorites, and footer copy.
- Strengthened repository hygiene for public GitHub publication.
- Removed unused legacy root files from the previous non-Next.js setup.
- Removed the unfinished public `/signin` route.
- Added privacy, terms, and affiliate disclosure pages.
- Added centralized affiliate-link helpers and a reusable disclosure component.
- Updated footer, sitemap, metadata, and contact messaging for public-beta readiness.
- Added deployment and program-readiness documentation.

## [0.1.0] - Initial Public Beta

- Guided gift quiz
- Personalized six-result recommendations
- Occasion-aware matching
- Recipient, budget, interest, age, and style matching
- Recommendation diversity
- Favorites
- Helpful-not-helpful feedback
- Responsive Next.js interface
- About and Contact pages
- Sitemap and robots support
