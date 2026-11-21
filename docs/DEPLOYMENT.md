# Deployment Guide

This document explains how to move Ask2Gift from GitHub to Vercel and then connect the production site to `ask2gift.com` using GoDaddy-managed DNS.

## 1. Publish the repository to GitHub

1. Create the `ask2gift` repository under the intended GitHub account.
2. Push the local project after final review and commit approval.
3. Confirm that the default branch contains the production-ready Next.js app.

## 2. Import the repository into Vercel

1. Sign in to Vercel.
2. Choose **Add New Project**.
3. Import the GitHub repository.
4. Let Vercel detect the project as Next.js automatically.

## 3. Build settings

Use the default Next.js build behavior unless Vercel shows something different:

- Install command: `npm install`
- Build command: `npm run build`
- Output setting: Next.js default

## 4. Environment variables

Add these in the Vercel project settings (Settings > Environment Variables), then redeploy:

| Variable | Needed for | Where to find it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Anonymous results feedback | Supabase > Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anonymous results feedback | Supabase > Project Settings > API Keys |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` | Optional. Overrides the default Amazon tag `ask2gift20-20` | Amazon Associates |
| `CRON_SECRET` | Recommended. Protects the daily keep-alive route | Any long random string of letters and numbers |

## 4a. Supabase keep-alive

Supabase pauses free-plan projects after 7 days of low activity. `vercel.json` schedules a daily call to `/api/keep-alive`, which sends one small request to the database so the project stays awake. Nothing is read or written.

- Check it works: open the Vercel project's **Cron Jobs** tab after deploying, or visit `/api/keep-alive` (this only works without a secret, so do it before adding `CRON_SECRET`). A healthy answer looks like `{"ok":true,"supabaseStatus":401,...}`; the 401 is expected because visitors may only add feedback, not read it.
- If the project still pauses, restore it from the Supabase dashboard (**Resume project**) and check the Cron Jobs logs in Vercel.

## 5. Add the custom domains

1. Open the Vercel project settings.
2. Add `ask2gift.com`.
3. Add `www.ask2gift.com`.
4. Choose the preferred primary domain in Vercel.

## 6. Update GoDaddy DNS

1. Copy the exact DNS values shown by Vercel for the root domain and `www` domain.
2. Add or update those records in GoDaddy.
3. Do not hardcode DNS values from a tutorial if Vercel shows different live values.

## 7. Verify HTTPS and production behavior

1. Wait for Vercel to verify the domains.
2. Confirm HTTPS is active.
3. Visit the production domain and test the homepage, quiz, results, favorites, and legal pages.

## 8. Preview deployments

Vercel can create preview deployments automatically for future Git pushes. Use them to review changes safely before promoting updates to production.

## 9. Automatic deployment flow

After the GitHub repository is connected, future pushes to the production branch can trigger new Vercel deployments automatically.
