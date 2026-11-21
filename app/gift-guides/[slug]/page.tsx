import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftCard } from "@/components/gifts/GiftCard";
import { GuideTiles } from "@/components/guides/GuideTiles";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getGuide, getGuideGifts, getGuideQuizPreset, getGuidesByGroup, giftGuides } from "@/lib/guides";
import { buildQuizLink } from "@/lib/quiz";
import { siteConfig } from "@/lib/site";

interface GuidePageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return giftGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};

  const path = `/gift-guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${guide.title} | ${siteConfig.name}`,
      description: guide.description,
      url: path,
      type: "article"
    }
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const gifts = getGuideGifts(guide, 12);
  const quizPreset = getGuideQuizPreset(guide);
  const quizLink = buildQuizLink(quizPreset);
  const relatedGuides = getGuidesByGroup(guide.group)
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 6);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guide.title,
    description: guide.description,
    url: `${siteConfig.url}/gift-guides/${guide.slug}`,
    numberOfItems: gifts.length,
    itemListElement: gifts.map((gift, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: gift.title,
      description: gift.description
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <section className="section-space pb-8 sm:pb-10">
        <div className="container-shell">
          <div className="surface p-6 sm:p-10">
            <span className="chip">{guide.group === "christmas" ? "Christmas gift guide" : "Gift guide"}</span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-2xl text-lg">{guide.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quizLink} className="w-full sm:w-auto">
                Get personalized picks
              </ButtonLink>
              <ButtonLink href="/gift-guides" variant="secondary" className="w-full sm:w-auto">
                All gift guides
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="container-shell">
          <AffiliateDisclosure compact />
          <h2 className="sr-only">Gift ideas</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gifts.map((gift, index) => (
              <GiftCard key={gift.id} gift={gift} context={{ occasion: guide.occasion }} position={index + 1} />
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-spruce p-6 text-white sm:p-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Want ideas matched to one person?</h2>
            <p className="mt-3 max-w-2xl text-white/85">
              Tell us their interests, your budget, and the style of gift you have in mind. You will get six ideas in about a minute, with no account needed.
            </p>
            <div className="mt-6">
              <ButtonLink href={quizLink} className="w-full sm:w-auto">
                Start the Gift Quiz
              </ButtonLink>
            </div>
          </div>

          {relatedGuides.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold sm:text-3xl">More gift guides</h2>
              <div className="mt-6">
                <GuideTiles guides={relatedGuides} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
