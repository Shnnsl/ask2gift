import { ButtonLink } from "@/components/ui/ButtonLink";

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
                Answer a few simple questions and discover gift ideas that match the person, occasion, budget, style, and interests that matter most.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/quiz" className="w-full shadow-lg shadow-coral/15 sm:w-auto">
                  Start the Gift Quiz
                </ButtonLink>
                <ButtonLink href="/#how-it-works" variant="secondary" className="w-full sm:w-auto">
                  How It Works
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-600 sm:text-base">
                Personalized picks <span className="mx-2 text-slate-300">&bull;</span> Budget aware
                <span className="mx-2 text-slate-300">&bull;</span> Save favorites
              </p>
            </div>

            <div className="float-soft relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg sm:p-8">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  aria-hidden="true"
                  className="gift-image-fade opacity-40 blur-[1px]"
                />
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  aria-hidden="true"
                  className="gift-image-fade opacity-40 blur-[1px]"
                  style={{ animationDelay: "6s" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1200&auto=format&fit=crop"
                  alt=""
                  aria-hidden="true"
                  className="gift-image-fade opacity-40 blur-[1px]"
                  style={{ animationDelay: "12s" }}
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/72 via-white/68 to-rose-50/64 sm:from-white/70 sm:via-white/62 sm:to-rose-50/60" />
              <div className="absolute inset-x-10 top-6 z-10 h-36 rounded-full bg-coral/12 blur-3xl" />
              <div className="absolute bottom-5 right-4 z-10 h-24 w-24 rounded-full bg-spruce/10 blur-3xl" />
              <div className="hero-glow right-12 top-10 z-10 h-28 w-28 bg-gradient-to-br from-fuchsia-200/25 via-coral/18 to-orange-200/18 blur-2xl [animation-duration:6.4s]" />
              <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.14]">
                <div className="float-soft absolute right-10 top-10 hidden h-24 w-24 rounded-[1.7rem] border border-rose-200/80 bg-gradient-to-br from-white/75 via-rose-100/70 to-orange-100/65 shadow-sm sm:block">
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-rose-300/80" />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-rose-300/80" />
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm border border-rose-300/70 bg-white/75" />
                </div>
                <div className="float-soft-delayed absolute bottom-12 right-28 hidden h-16 w-16 rotate-12 rounded-[1.25rem] border border-amber-200/70 bg-gradient-to-br from-amber-50/70 to-rose-100/55 shadow-sm md:block">
                  <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-amber-300/75" />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-amber-300/75" />
                </div>
                <div className="float-soft absolute bottom-8 left-6 hidden h-20 w-20 rounded-[1.6rem] border border-fuchsia-100/70 bg-gradient-to-br from-white/70 via-fuchsia-50/65 to-rose-100/60 shadow-sm lg:block [animation-duration:5.6s]">
                  <div className="absolute left-1/2 top-3 h-5 w-8 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-fuchsia-200/70" />
                  <div className="absolute inset-x-4 bottom-4 top-6 rounded-[1rem] border border-fuchsia-200/50" />
                </div>
                <div className="absolute right-24 top-32 h-2 w-2 rounded-full bg-amber-300/80" />
                <div className="absolute right-20 top-36 h-1.5 w-1.5 rounded-full bg-rose-300/80" />
                <div className="absolute bottom-24 right-20 h-2 w-2 rounded-full bg-fuchsia-200/80" />
                <div className="absolute bottom-20 right-14 h-1.5 w-1.5 rounded-full bg-amber-200/80" />
                <div className="absolute left-10 top-16 hidden h-5 w-5 rotate-45 border border-white/80 bg-white/55 sm:block" />
                <div className="absolute left-14 top-20 hidden h-1.5 w-1.5 rounded-full bg-rose-200/80 sm:block" />
              </div>
              <div className="relative z-20">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-spruce/75">About Ask2Gift</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink">
                  A smarter way to find thoughtful gifts
                </h2>
                <div className="mt-4 space-y-4 text-base text-slate-600 sm:text-lg">
                  <p>
                    At Ask2Gift, we believe finding the perfect gift should be simple and enjoyable. Our goal is to help you discover thoughtful gift ideas based on the person, occasion, budget, style, and interests that matter most.
                  </p>
                  <p>Take your time, explore with confidence, and find a gift that feels just right.</p>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="card-hover rounded-[1.5rem] border border-white/80 bg-white/75 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-ink">Short quiz</p>
                    <p className="mt-1 text-sm text-slate-600">Quick answers that keep the experience easy.</p>
                  </div>
                  <div className="card-hover rounded-[1.5rem] border border-white/80 bg-white/75 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-ink">Better matches</p>
                    <p className="mt-1 text-sm text-slate-600">Relevant ideas ranked by what matters most.</p>
                  </div>
                  <div className="card-hover rounded-[1.5rem] border border-white/80 bg-white/75 p-4 shadow-sm">
                    <p className="text-sm font-semibold text-ink">Save favorites</p>
                    <p className="mt-1 text-sm text-slate-600">Keep your best options handy as you compare.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
