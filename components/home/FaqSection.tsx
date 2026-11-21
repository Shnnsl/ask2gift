import { faqItems } from "@/lib/faq";

export function FaqSection() {
  return (
    <section id="faq" className="section-space pt-0">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="chip">Questions</span>
          <h2 className="section-heading mt-5">Good to know</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <details key={item.question} className="surface group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-2xl font-normal text-coral transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
