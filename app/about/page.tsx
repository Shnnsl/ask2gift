import { PageIntro } from "@/components/layout/PageIntro";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("About"),
  description: "Learn how ask2gift helps make gift shopping easier with guided personalized recommendations.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About ask2gift"
        title="Gift shopping made easier"
        description="ask2gift helps make gift shopping easier by narrowing down options with a guided personalized quiz. Instead of scrolling through endless gift lists, you answer a few questions and get suggestions shaped around the person, occasion, budget, and overall style you want."
      />
      <section className="section-space pt-0">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          <article className="surface p-6">
            <h2 className="text-2xl font-semibold">Thoughtful by design</h2>
            <p className="mt-3 text-sm">
              The experience is built to feel warm, useful, and easy for non-technical users who just want better gift ideas quickly.
            </p>
          </article>
          <article className="surface p-6">
            <h2 className="text-2xl font-semibold">Matched to the occasion</h2>
            <p className="mt-3 text-sm">
              Every suggestion is chosen for the occasion first, then ranked by the interests, budget, and gift style you tell us about. No account is needed, and your favorites stay in your browser.
            </p>
          </article>
          <article className="surface p-6">
            <h2 className="text-2xl font-semibold">Built for real occasions</h2>
            <p className="mt-3 text-sm">
              Birthdays, anniversaries, holidays, thank-yous, and everyday surprises all benefit from more tailored ideas and less decision fatigue.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
