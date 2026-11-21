import { GuideTiles } from "@/components/guides/GuideTiles";
import { getGuide, getGuidesByGroup } from "@/lib/guides";
import type { GiftGuide } from "@/lib/guides";

interface OccasionSectionProps {
  /** Adds a "shop Christmas by person" row during the Christmas season. */
  christmas?: boolean;
}

const HOLIDAY_TILE_LABEL = "Christmas";

export function OccasionSection({ christmas = false }: OccasionSectionProps) {
  const christmasGuide = getGuide("christmas-gifts");
  const occasionGuides = getGuidesByGroup("occasion");
  const holidayTile: GiftGuide[] = christmasGuide ? [{ ...christmasGuide, label: HOLIDAY_TILE_LABEL }] : [];

  // Lead with Christmas while it is in season; otherwise it sits with the other occasions.
  const guides = christmas ? [...holidayTile, ...occasionGuides] : [...occasionGuides, ...holidayTile];
  const christmasByPerson = getGuidesByGroup("christmas").filter((guide) => guide.slug !== "christmas-gifts");

  return (
    <section id="occasions" className="pb-4 sm:pb-6">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="chip">Gift guides</span>
          <h2 className="section-heading mt-5">Gift ideas for every occasion</h2>
          <p className="mt-4 text-lg text-slate-600">
            Start with a short, curated guide, or take the quiz for ideas matched to one person.
          </p>
        </div>
        <div className="mt-8">
          <GuideTiles guides={guides} />
        </div>

        {christmas ? (
          <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-spruce p-6 text-white shadow-soft sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral/25 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                In season
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Christmas gifts by who is on your list</h3>
              <div className="mt-6">
                <GuideTiles guides={christmasByPerson} tone="festive" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
