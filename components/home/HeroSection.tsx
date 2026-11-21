import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { heroSlides } from "@/lib/slides";

const highlights = [
  {
    title: "Short quiz",
    description: "Quick answers that keep the experience easy.",
    icon: "M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
  },
  {
    title: "Better matches",
    description: "Relevant ideas ranked by what matters most.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 3.500v1"
  },
  {
    title: "Save favorites",
    description: "Keep your best options handy as you compare.",
    icon: "M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z"
  }
];

export function HeroSection() {
  return (
    <section className="section-space pb-10 sm:pb-14">
      <div className="container-shell">
        <div className="surface relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-coral/10 via-transparent to-spruce/10" />
          <div className="hero-glow -left-10 top-16 h-52 w-52 bg-gradient-to-br from-coral/40 via-rose-300/30 to-orange-200/30 blur-2xl" />
          <div className="hero-glow right-8 top-10 h-40 w-40 bg-gradient-to-br from-fuchsia-200/25 via-coral/25 to-sand/30 blur-2xl [animation-duration:6.2s]" />
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative max-w-3xl">
              <span className="chip">Personalized gift finder</span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
                Thoughtful gift ideas, tailored to every occasion.
              </h1>
              <p className="mt-5 max-w-3xl text-lg sm:text-xl">
                Answer a few simple questions and get six gift ideas matched to the person, the occasion, your budget, and what they love.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/quiz" className="w-full shadow-lg shadow-coral/15 sm:w-auto">
                  Start the Gift Quiz
                </ButtonLink>
                <ButtonLink href="/gift-guides" variant="secondary" className="w-full sm:w-auto">
                  Browse Gift Guides
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-600 sm:text-base">
                Free to use <span className="mx-2 text-slate-300">&bull;</span> No account needed
                <span className="mx-2 text-slate-300">&bull;</span> Six ideas in about a minute
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[16/10] max-h-72 w-full sm:aspect-auto sm:h-64">
                <HeroSlideshow slides={heroSlides} />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-coral via-[#eb9a7e] to-spruce" />
              </div>

              <div className="p-6 sm:p-8">
                <p className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-spruce">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  About Ask2Gift
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-[2rem]">
                  A smarter way to find thoughtful gifts
                </h2>
                <div className="mt-4 space-y-3 text-base text-slate-700">
                  <p className="text-slate-700">
                    At Ask2Gift, we believe finding the perfect gift should be simple and enjoyable. Our goal is to help you discover thoughtful gift ideas based on the person, occasion, budget, style, and interests that matter most.
                  </p>
                  <p className="text-slate-700">Take your time, explore with confidence, and find a gift that feels just right.</p>
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <li key={item.title} className="card-hover rounded-[1.5rem] border border-slate-200/70 bg-white p-4 shadow-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mist text-spruce">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                          <path d={item.icon} />
                        </svg>
                      </span>
                      <p className="mt-3 text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
