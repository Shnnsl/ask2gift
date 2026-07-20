interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="surface max-w-4xl p-8 sm:p-12">
          <span className="chip">{eyebrow}</span>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
