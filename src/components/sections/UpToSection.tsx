import { adventures } from "@/content/adventures";
import { site } from "@/content/site";
import { AdventureEntry } from "@/components/adventures/AdventureEntry";
import { ChapterCard } from "@/components/adventures/ChapterCard";
import { FeaturedAdventure } from "@/components/adventures/FeaturedAdventure";
import { Reveal } from "@/components/scrapbook/Reveal";
import { ScrapbookPage } from "@/components/scrapbook/ScrapbookPage";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";

const variants = ["notebook", "index", "sticky", "ticket"] as const;

/** Page 2 — "What's Phey's up to..." */
export function UpToSection() {
  return (
    <ScrapbookPage id="up-to" labelledBy="up-to-title">
      <SectionHeading
        id="up-to-title"
        kicker="page two · dear diary"
        title={site.sections[1].label}
        intro={adventures.intro}
      />

      <h3 className="sr-only">Current chapters</h3>
      <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
        {adventures.chapters.map((chapter, i) => (
          <Reveal key={chapter.id} delay={i * 0.04} className={i % 2 === 1 ? "md:mt-10" : ""}>
            <ChapterCard chapter={chapter} variant={variants[i % variants.length]} />
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <FeaturedAdventure adventure={adventures.featured} />
      </div>

      <div className="mt-24">
        <h3 className="font-serif text-4xl text-forest sm:text-5xl">More adventures</h3>
        <p className="mt-2 font-hand text-2xl text-ink">tap a postcard to turn it over</p>
        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-x-12">
          {adventures.entries.map((entry, i) => (
            <Reveal key={entry.id} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <AdventureEntry entry={entry} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </ScrapbookPage>
  );
}
