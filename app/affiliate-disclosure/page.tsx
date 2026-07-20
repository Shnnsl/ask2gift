import { PageIntro } from "@/components/layout/PageIntro";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import {
  getAffiliateProgramStatus,
  getAmazonAssociateDisclosureText,
  getPageTitle,
  shouldShowAmazonAssociateDisclosure
} from "@/lib/site";

export const metadata = {
  title: getPageTitle("Affiliate Disclosure"),
  description: "Learn how Ask2Gift is preparing for future affiliate programs while keeping recommendation relevance first."
};

export default function AffiliateDisclosurePage() {
  const affiliateStatus = getAffiliateProgramStatus();
  const showAmazonStatement = shouldShowAmazonAssociateDisclosure();

  return (
    <>
      <PageIntro
        eyebrow="Affiliate Disclosure"
        title="How future affiliate relationships will be handled"
        description="This page explains Ask2Gift's current affiliate-readiness status and is provided for general informational purposes only."
      />
      <section className="section-space pt-0">
        <div className="container-shell space-y-5">
          <AffiliateDisclosure />
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Current status</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift is currently in <span className="font-semibold text-ink">{affiliateStatus}</span> status for future affiliate-program participation. The project is preparing its link architecture and disclosures, but it should not yet be described as an approved Amazon Associate.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">How affiliate links may work later</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift may later participate in affiliate programs. Some outbound gift links may then generate a commission from qualifying purchases. These relationships should be disclosed clearly, recommendations should remain guided by relevance, and external retailers will continue to control pricing, availability, fulfillment, returns, and warranties.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Affiliate questions</h2>
            <p className="mt-3 text-slate-600">
              For affiliate, policy, or disclosure-related questions, contact <a href="mailto:support@ask2gift.com" className="font-semibold text-spruce hover:text-ink">support@ask2gift.com</a>.
            </p>
          </article>
          {showAmazonStatement ? (
            <article className="surface p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Amazon Associates statement</h2>
              <p className="mt-3 text-slate-600">{getAmazonAssociateDisclosureText()}</p>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}
