import { PageIntro } from "@/components/layout/PageIntro";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("About"),
  description: "Learn how ask2gift helps make gift shopping easier with guided personalized recommendations."
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
            <h2 className="text-2xl font-semibold">Ready to grow</h2>
            <p className="mt-3 text-sm">
              The app starts with local favorites and sample data, but the structure is ready for future accounts, database saving, and richer recommendation sources.
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
