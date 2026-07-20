const steps = [
  {
    step: "01",
    title: "Tell us who you're shopping for",
    description: "Start with the person so the ideas begin in the right direction."
  },
  {
    step: "02",
    title: "Choose the occasion, budget, and preferences",
    description: "A few practical details help shape the list and keep it more relevant."
  },
  {
    step: "03",
    title: "Get personalized gift ideas",
    description: "See the best matches first and save the ones worth revisiting."
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-space">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="chip">How it works</span>
          <h2 className="section-heading mt-5">A simple path to better gift ideas</h2>
          <p className="mt-4 text-lg text-slate-600">Three short steps keep the process clear, quick, and easy to trust.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="surface card-hover p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral">{item.step}</p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
