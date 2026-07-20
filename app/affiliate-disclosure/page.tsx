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
  description: "Learn how Ask2Gift uses Amazon affiliate links on quiz results and how commissions are disclosed."
};

export default function AffiliateDisclosurePage() {
  const affiliateStatus = getAffiliateProgramStatus();
  const showAmazonStatement = shouldShowAmazonAssociateDisclosure();

  return (
    <>
      <PageIntro
        eyebrow="Affiliate Disclosure"
        title="How Ask2Gift affiliate links work"
        description="This page explains how Ask2Gift uses affiliate links on personalized gift recommendations. It is provided for general informational purposes only."
      />
      <section className="section-space pt-0">
        <div className="container-shell space-y-5">
          <AffiliateDisclosure />
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Current status</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift is currently in <span className="font-semibold text-ink">{affiliateStatus}</span> status. Personalized recommendations on the results page may include Amazon affiliate search links.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">What this means for users</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift may receive a commission when users make qualifying purchases through Amazon affiliate links. There is no additional cost to the user. Amazon controls product pricing, availability, fulfillment, returns, and product details, and Ask2Gift provides recommendations but is not the seller.
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
