import { loves } from "@/content/loves";
import { site } from "@/content/site";
import { KeepsakeDrawer } from "@/components/keepsakes/KeepsakeDrawer";
import { Polaroid } from "@/components/photos/Polaroid";
import { Doodle } from "@/components/scrapbook/Doodle";
import { HandArrow } from "@/components/scrapbook/HandArrow";
import { HandwrittenNote } from "@/components/scrapbook/HandwrittenNote";
import { Reveal } from "@/components/scrapbook/Reveal";
import { ScrapbookPage } from "@/components/scrapbook/ScrapbookPage";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Tape } from "@/components/scrapbook/Tape";
import type { LoveCategory } from "@/lib/types";

/** Photos arranged as a loose pile beside the words. */
function CategoryBlock({ category, flip }: { category: LoveCategory; flip: boolean }) {
  const [lead, ...rest] = category.photoIds;
  return (
    <article
      aria-labelledby={`love-${category.id}`}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative">
        <div className="flex items-center gap-3">
          <Doodle name={category.doodle} className="h-12 w-12" tone="terracotta" />
          <h3 id={`love-${category.id}`} className="font-serif text-4xl text-forest sm:text-5xl">
            {category.title}
          </h3>
        </div>
        <p className="mt-3 max-w-[50ch] text-lg text-ink">{category.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category.title} details`}>
          {category.details.map((d) => (
            <li
              key={d}
              className="border border-dashed border-brown/50 bg-paper-light px-2.5 py-0.5 font-hand text-xl text-ink"
            >
              {d}
            </li>
          ))}
        </ul>
        {category.note && (
          <div className="relative mt-8 max-w-xs">
            <HandArrow shape="down" className="absolute -right-10 -top-6 hidden h-16 w-8 md:block" />
            <HandwrittenNote id={`note-${category.id}`} color="terracotta">
              {category.note}
            </HandwrittenNote>
          </div>
        )}
      </div>
      <div className="mx-auto grid w-full max-w-lg grid-cols-6 items-start gap-3 sm:gap-4">
        <div className={rest.length > 1 ? "col-span-6 sm:col-span-4" : "col-span-4"}>
          <Polaroid photoId={lead} sizes="(max-width: 768px) 70vw, 380px" />
        </div>
        <div className={`flex gap-3 sm:gap-4 ${rest.length > 1 ? "col-span-6 sm:col-span-2 sm:flex-col sm:pt-10" : "col-span-2 flex-col pt-12"}`}>
          {rest.map((id) => (
            <div key={id} className="flex-1">
              <Polaroid photoId={id} size="sm" tape="terracotta" sizes="180px" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Page 3 — "What Phey loves" */
export function LovesSection() {
  return (
    <ScrapbookPage id="loves" labelledBy="loves-title">
      <SectionHeading
        id="loves-title"
        kicker="page three · small joys"
        title={site.sections[2].label}
        intro={loves.intro}
      />

      <div className="space-y-20 md:space-y-24">
        {loves.categories.map((c, i) => (
          <Reveal key={c.id}>
            <CategoryBlock category={c} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {/* Recurring motifs */}
      <div className="mt-24 grid gap-12 md:grid-cols-2">
        {loves.motifs.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.06}>
            <article
              aria-labelledby={`motif-${m.id}`}
              className={`paper-card relative px-5 pb-8 pt-9 ${i === 0 ? "grid-paper" : "ruled"}`}
            >
              <Tape className="-top-3 left-1/2 -ml-12" tone={i === 0 ? "sage" : "terracotta"} angle={i === 0 ? -3 : 4} />
              <h3 id={`motif-${m.id}`} className="text-center font-hand text-4xl leading-none text-forest">
                {m.title}
              </h3>
              <p className="mt-2 text-center text-sm text-ink">{m.description}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {m.photoIds.map((id) => (
                  <Polaroid key={id} photoId={id} size="sm" tape="none" sizes="160px" />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-28">
        <KeepsakeDrawer drawer={loves.drawer} />
      </div>
    </ScrapbookPage>
  );
}
