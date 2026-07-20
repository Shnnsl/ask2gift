import { PageIntro } from "@/components/layout/PageIntro";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Terms of Use"),
  description: "Review the general terms that apply when using Ask2Gift recommendations and outbound retailer links."
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Terms of Use"
        title="General terms for using Ask2Gift"
        description="These terms are provided for general informational purposes and are not legal advice."
      />
      <section className="section-space pt-0">
        <div className="container-shell space-y-5">
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Informational recommendations</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift provides gift recommendations for informational use. While the recommendation engine is designed to improve relevance, Ask2Gift cannot guarantee that every suggestion will be suitable for every person, occasion, or budget.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Retailer responsibility</h2>
            <p className="mt-3 text-slate-600">
              Ask2Gift does not currently sell, fulfill, ship, or warranty products. External retailers control purchases, pricing, availability, shipping, returns, warranties, and customer support. Users should review retailer information independently before purchasing.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Appropriate use</h2>
            <p className="mt-3 text-slate-600">
              You agree to use Ask2Gift responsibly and not to misuse the site, attempt to disrupt the service, or copy protected content in ways not permitted by law. No retailer endorsement or sponsorship is implied by the presence of outbound links.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Intellectual property and updates</h2>
            <p className="mt-3 text-slate-600">
              The Ask2Gift site design, branding, copy, and code remain protected by applicable intellectual-property law unless a separate license is later published. These terms may be updated as the project evolves.
            </p>
          </article>
          <article className="surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Policy questions</h2>
            <p className="mt-3 text-slate-600">
              For questions about these terms or general Ask2Gift policies, contact <a href="mailto:support@ask2gift.com" className="font-semibold text-spruce hover:text-ink">support@ask2gift.com</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
