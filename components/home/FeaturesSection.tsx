const features = [
  {
    title: "Personalized gift suggestions",
    description: "Recommendations are matched to the recipient, occasion, interests, and gift style you choose."
  },
  {
    title: "Budget-friendly ideas",
    description: "Every result keeps your budget in mind so you can find something meaningful without overspending."
  },
  {
    title: "Built for every occasion",
    description: "Use it for birthdays, holidays, anniversaries, weddings, baby showers, thank-yous, and more."
  },
  {
    title: "Save favorite picks",
    description: "Shortlist the ideas you love and come back later when you are ready to compare or buy."
  }
];

export function FeaturesSection() {
  return (
    <section className="section-space pt-0">
      <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="surface p-6">
            <div className="mb-5 h-10 w-10 rounded-2xl bg-blush" />
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="mt-3 text-sm">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
