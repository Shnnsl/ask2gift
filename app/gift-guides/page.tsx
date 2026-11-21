import type { Metadata } from "next";
import { GuideTiles } from "@/components/guides/GuideTiles";
import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getGuidesByGroup } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Gift Guides",
  description:
    "Browse Ask2Gift gift guides for birthdays, anniversaries, weddings, baby showers, graduations, Christmas, and more.",
  alternates: { canonical: "/gift-guides" }
};

export default function GiftGuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gift guides"
        title="Gift ideas by occasion"
        description="Short, curated lists for the moments people shop for most. Want ideas matched to one person? The quiz takes about a minute."
      />
      <section className="section-space pt-0">
        <div className="container-shell space-y-12">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">By occasion</h2>
            <p className="mt-2 max-w-2xl">Birthdays, anniversaries, weddings, new babies, graduations, and thank-yous.</p>
            <div className="mt-6">
              <GuideTiles guides={getGuidesByGroup("occasion")} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Christmas gift guides</h2>
            <p className="mt-2 max-w-2xl">Seasonal ideas, sorted by who you are shopping for.</p>
            <div className="mt-6">
              <GuideTiles guides={getGuidesByGroup("christmas")} />
            </div>
          </div>
          <div className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold">Shopping for someone specific?</h2>
              <p className="mt-2 max-w-xl">Answer six quick questions and get six ideas matched to the person, occasion, and budget.</p>
            </div>
            <ButtonLink href="/quiz" className="w-full shrink-0 sm:w-auto">
              Start the Gift Quiz
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
