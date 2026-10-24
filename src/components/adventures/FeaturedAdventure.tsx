import { Polaroid } from "@/components/photos/Polaroid";
import { DateStamp } from "@/components/scrapbook/DateStamp";
import { HandArrow } from "@/components/scrapbook/HandArrow";
import { HandwrittenNote } from "@/components/scrapbook/HandwrittenNote";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Tape } from "@/components/scrapbook/Tape";
import type { FeaturedAdventure as Featured } from "@/lib/types";

/**
 * The two-page spread for the featured adventure: photos and notes on the
 * left page, a numbered timeline along a dashed path on the right.
 */
export function FeaturedAdventure({ adventure }: { adventure: Featured }) {
  const [drive, trail, barn, merch, dinner] = adventure.photoIds;
  return (
    <article aria-labelledby="featured-title" className="relative">
      <p className="mb-3 font-hand text-[1.7rem] leading-none text-terracotta" aria-hidden="true">
        featured adventure ↓
      </p>
      <div className="relative grid shadow-lift lg:grid-cols-2">
        {/* Center fold */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-10 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(55_52_47/0.10)_45%,rgb(55_52_47/0.16)_50%,rgb(55_52_47/0.10)_55%,transparent)] lg:block"
        />

        {/* Left page */}
        <div className="paper-card relative overflow-hidden px-5 pb-10 pt-8 shadow-none sm:px-8 lg:pr-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h3 id="featured-title" className="max-w-[12ch] font-serif text-5xl leading-[0.95] text-forest sm:text-6xl">
              {adventure.title}
            </h3>
            <DateStamp date={adventure.date} location={adventure.location} className="mt-2" angle={5} />
          </div>
          <p className="mt-4 max-w-[48ch] text-lg text-ink">{adventure.intro}</p>

          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-5 gap-y-8">
            <Polaroid photoId={drive} annotation={adventure.stops[0].annotation} sizes="(max-width: 1024px) 42vw, 210px" />
            <div className="pt-8">
              <Polaroid photoId={trail} tape="terracotta" annotation={adventure.stops[1].annotation} sizes="(max-width: 1024px) 42vw, 210px" />
            </div>
            <div className="col-span-2 flex items-center justify-center gap-3">
              <HandArrow shape="swoop" className="h-10 w-24 shrink-0 -scale-x-100" />
              <p className="font-hand text-[1.75rem] leading-8 text-forest">
                {adventure.stops[0].annotation}
              </p>
            </div>
            <Polaroid photoId={barn} sizes="(max-width: 1024px) 42vw, 210px" />
            <div className="-mt-4">
              <Polaroid photoId={merch} tape="terracotta" annotation={adventure.stops[3].annotation} sizes="(max-width: 1024px) 42vw, 210px" />
            </div>
          </div>
        </div>

        {/* Right page: timeline */}
        <div className="paper-card grid-paper relative px-5 pb-10 pt-8 shadow-none sm:px-8 lg:pl-12">
          <h4 className="font-hand text-3xl text-forest">How the day actually went</h4>
          <ol className="relative mt-6">
            {/* Dashed doodled path */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[1.05rem] top-4 w-0 border-l-2 border-dashed border-terracotta/70"
            />
            {adventure.stops.map((stop, i) => (
              <Reveal as="li" key={stop.id} className="relative pb-8 pl-14 last:pb-2" delay={i * 0.04}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border-2 border-forest bg-paper-light font-hand text-2xl leading-none text-forest"
                >
                  {i + 1}
                </span>
                <span className="sr-only">Stop {i + 1}: </span>
                <p className="text-[1.02rem] leading-6 text-ink">{stop.text}</p>
                {/* Stop 1's line is already written big on the left page */}
                {stop.annotation && i > 0 && (
                  <p className="mt-1.5 font-hand text-2xl leading-7 text-terracotta">
                    “{stop.annotation}”
                  </p>
                )}
              </Reveal>
            ))}
          </ol>

          {/* The swinging bridge: a plan we never got to */}
          <div className="relative mt-6">
            <HandwrittenNote id="bridge-ps" color="terracotta" className="max-w-sm">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink">P.S.</p>
              <p className="mt-1">{adventure.postscript.text}</p>
              <p className="mt-2 text-forest">{adventure.postscript.annotation}</p>
            </HandwrittenNote>
            <Tape className="-bottom-2 right-8 hidden sm:block" tone="sage" angle={10} />
          </div>
          <div className="mx-auto mt-10 w-3/5 max-w-[15rem] sm:ml-auto sm:mr-6">
            <Polaroid photoId={dinner} sizes="(max-width: 640px) 60vw, 240px" />
          </div>
        </div>
      </div>
    </article>
  );
}
