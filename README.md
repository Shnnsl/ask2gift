# Ask2Gift

Ask2Gift is a personalized gift recommendation engine that helps people discover thoughtful gift ideas based on the recipient, occasion, budget, interests, style, age, and other preferences.

## Project Overview

Ask2Gift guides users through a structured quiz and returns six personalized gift recommendations. The current experience focuses on helping someone narrow down gift ideas before making a purchase elsewhere.

The recommendation system currently considers:

- occasion
- recipient
- budget
- interests
- style
- age
- preference information
- recommendation diversity

## Vision

Ask2Gift is more than a gift-list website.

The long-term vision is to build a trusted gift discovery and recommendation engine that people use when they do not know what gift to buy.

The platform should help users confidently find thoughtful gift ideas for different recipients, occasions, interests, personalities, and budgets.

Rather than operating as a traditional online store, Ask2Gift aims to simplify the decision-making process that happens before a purchase.

Guiding principle: Help people find the right gift.

## Key Features

- Guided gift quiz
- Personalized recommendations
- Six-result recommendation target
- Occasion-aware ranking
- Recipient matching
- Budget-aware filtering
- Interest and style matching
- Recommendation diversity
- Local favorites
- Anonymous recommendation feedback
- Responsive interface
- About page
- Contact page
- Favorites page
- Sitemap
- Robots configuration

## How the Recommendation Engine Works

Ask2Gift uses a structured, rule-based recommendation engine designed to behave more like a thoughtful gift advisor than a simple product tag filter.

The current ranking philosophy is:

1. Occasion
2. Recipient
3. Budget
4. Interests
5. Recommendation diversity
6. Style
7. Gender or preference signal
8. Age

The engine scores matching gifts, keeps strong matches first, and uses controlled fallback logic when needed so the results page can still present a complete set of recommendations.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Browser local storage and session storage
- Next.js route handlers
- Supabase JavaScript client

## Project Structure

```text
app/
components/
data/
docs/
lib/
public/
supabase/
tests/
types/
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Production start

```bash
npm run start
```

### Type checking

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm test
```

## Usage

1. Start the gift quiz.
2. Answer the preference questions.
3. Receive six recommendations.
4. Save favorites locally in your browser.
5. Share anonymous feedback about the recommendation quality.

## Supabase Feedback Setup

1. Add the following variables to your local `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. Run the SQL migration in `supabase/migrations/202607201620_create_feedback.sql` using the Supabase SQL Editor or the Supabase CLI.
3. Add the same two public environment variables to your Vercel project settings.
4. Redeploy after adding the Vercel environment variables.
5. Verify that Row Level Security is enabled on `public.recommendation_feedback` and that no public `SELECT` policy exists.
6. After testing feedback submissions, verify saved rows from the authenticated Supabase dashboard by opening the `recommendation_feedback` table in the Table Editor.

Do not place real credentials in source control.

## Current Project Status

Ask2Gift is an active pre-launch public-beta project with a growing curated gift catalog and active recommendation-quality improvements.

## Roadmap

### Current and completed

- Guided recommendation quiz
- Rule-based recommendation engine
- Occasion-aware ranking
- Recommendation diversity
- Favorites
- Anonymous feedback collection
- Responsive interface
- SEO support files

### Planned

- Expanded curated catalog
- Recommendation-quality testing
- Improved feedback analytics
- Optional user accounts
- Saved recommendation history
- Seasonal gift collections
- Intelligent search using natural-language queries
- AI-assisted recommendation explanations
- Responsible affiliate-link integration
- Additional merchant support beyond a single retailer

Planned items are not yet implemented.

## Affiliate Program Readiness

Ask2Gift is being prepared for possible participation in affiliate programs, including Amazon Associates.

Some outbound product links may eventually be affiliate links. Ask2Gift may earn a commission from qualifying purchases without changing the price paid by the user.

Ask2Gift should not currently be described as an approved Amazon Associate unless program approval is confirmed.

## AI-Assisted Development

Ask2Gift was created and is directed by **Nesil Sahin** using an AI-assisted software development workflow.

**OpenAI Codex** has been used as a development assistant to support implementation, code generation, debugging, refactoring, testing, documentation, and repository preparation.

The product vision, feature direction, recommendation strategy, testing decisions, review process, and final implementation choices are directed and approved by the project creator.

## Author

**Nesil Sahin**

GitHub: [https://github.com/Shnnsl](https://github.com/Shnnsl)

Support: [support@ask2gift.com](mailto:support@ask2gift.com)

## License

Ask2Gift is proprietary software and is released under an All Rights Reserved license.

This repository is public for educational, evaluation, and portfolio viewing only. No permission is granted to copy, modify, distribute, sublicense, publish, sell, or use this software, in whole or in part, without prior written permission from Nesil Sahin.
