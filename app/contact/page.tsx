import { PageIntro } from "@/components/layout/PageIntro";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Contact"),
  description: "Contact Ask2Gift at support@ask2gift.com for questions, feedback, or support."
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Get in touch with Ask2Gift for questions, feedback, or support."
      />
      <section className="section-space pt-0">
        <div className="container-shell">
          <div className="surface mx-auto max-w-3xl p-6 sm:p-8">
            <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600 sm:p-6">
              For questions, feedback, or support, contact <a href="mailto:support@ask2gift.com" className="font-semibold text-spruce hover:text-ink">support@ask2gift.com</a>.
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-ink">General support</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Use the support email for questions about the quiz, gift suggestions, favorites, or general Ask2Gift feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
