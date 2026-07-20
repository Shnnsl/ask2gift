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

The current Ask2Gift app does not require environment variables to run.

If affiliate configuration is added later, add the relevant variables in the Vercel project settings instead of hardcoding them in source control.

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
