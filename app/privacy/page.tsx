import { PageIntro } from "@/components/layout/PageIntro";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Privacy Policy"),
  description: "Understand how Ask2Gift currently uses browser storage and how to reach support for privacy-related questions."
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy Policy"
        title="A simple, browser-first privacy approach"
        description="This page describes the current Ask2Gift experience and is provided for general information only. It is not legal advice."
      />
      <section className="section-space pt-0">
        <div className="container-shell space-y-5">
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">What Ask2Gift stores today</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift currently works without accounts, a database, or a personal-information backend. Favorites are stored in your browser using localStorage, helpful or not-helpful feedback is stored in localStorage, and recent quiz answers are stored in sessionStorage so your results can load in the same browser session.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">What is not currently configured</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift does not currently require an account, does not currently use a database, and does not currently have analytics, advertising cookies, or a backend contact submission system configured in this project.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">External links and browser control</h2>
            <p className="mt-3 text-slate-600">
              Some gift links lead to external retailer or search pages outside Ask2Gift. Those third-party sites control their own privacy practices. Browser-stored data such as favorites, feedback, and quiz answers may also be cleared by you through normal browser settings.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Questions about privacy</h2>
            <p className="mt-3 text-slate-600">
              For privacy-related questions about the current Ask2Gift experience, contact <a href="mailto:support@ask2gift.com" className="font-semibold text-spruce hover:text-ink">support@ask2gift.com</a>.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Future updates</h2>
            <p className="mt-3 text-slate-600">
              If Ask2Gift later adds analytics, direct contact handling, accounts, or database-backed features, this policy should be updated to reflect the real implementation at that time.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
