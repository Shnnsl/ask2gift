import { ButtonLink } from "@/components/ui/ButtonLink";

export function ShowcaseSection() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div>
          <div className="max-w-2xl">
            <span className="chip">Why Ask2Gift</span>
            <h2 className="section-heading mt-5">A cleaner way to narrow down gift ideas</h2>
            <p className="mt-4 text-lg text-slate-600">
              Ask2Gift keeps the process short, practical, and easier to act on than browsing long generic gift lists.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <article className="surface card-hover float-soft p-6">
              <h3 className="text-2xl font-semibold">Less scrolling</h3>
              <p className="mt-3 text-sm text-slate-600">
                Spend less time browsing generic lists and more time looking at ideas that fit.
              </p>
            </article>
            <article className="surface card-hover float-soft-delayed p-6">
              <h3 className="text-2xl font-semibold">More relevant ideas</h3>
              <p className="mt-3 text-sm text-slate-600">
                Recipient, budget, style, and interests work together to shape the results you see.
              </p>
            </article>
            <article className="surface card-hover float-soft p-6 [animation-duration:5.4s]">
              <h3 className="text-2xl font-semibold">Favorites you can save</h3>
              <p className="mt-3 text-sm text-slate-600">
                Keep the strongest gift ideas in one place as you compare and decide.
              </p>
            </article>
          </div>
          <div className="mt-8">
            <ButtonLink href="/quiz">Start the Gift Quiz</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
