import { about } from "@/content/about";
import { site } from "@/content/site";
import { Polaroid } from "@/components/photos/Polaroid";
import { Doodle } from "@/components/scrapbook/Doodle";
import { HandArrow } from "@/components/scrapbook/HandArrow";
import { HandwrittenNote } from "@/components/scrapbook/HandwrittenNote";
import { PaperClip } from "@/components/scrapbook/PaperClip";
import { Reveal } from "@/components/scrapbook/Reveal";
import { ScrapbookPage } from "@/components/scrapbook/ScrapbookPage";
import { Tape } from "@/components/scrapbook/Tape";

const [uzbekistan, moving, me, people] = about.collage;

/** Page 1 — "Who is Phey?" */
export function WhoSection() {
  const label = site.sections[0].label;
  return (
    <ScrapbookPage id="who" labelledBy="who-title" className="pt-10 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        {/* Left page: words */}
        <div className="relative">
          <p className="font-hand text-[1.7rem] leading-none text-terracotta" aria-hidden="true">
            page one ·
          </p>
          <h1 className="mt-1 font-serif text-[3.6rem] leading-[0.88] tracking-tight text-forest sm:text-8xl lg:text-[7.5rem]">
            {site.name.split(" ").map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </h1>
          <h2
            id="who-title"
            className="mt-5 font-serif text-3xl italic text-ink sm:text-4xl"
          >
            {label}
          </h2>

          <div className="paper-card ruled relative mt-8 max-w-[62ch] px-5 py-6 sm:px-8 sm:py-8">
            <PaperClip className="-top-6 left-8" />
            <p className="font-hand text-3xl leading-7 text-forest">{about.greeting}</p>
            <div className="mt-4 space-y-4 text-[1.05rem] leading-[1.7rem] text-ink">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          {/* Hobby doodles */}
          <ul className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3" aria-label="Things I do">
            {about.hobbies.map((h) => (
              <li key={h.label} className="flex flex-col items-center gap-1">
                <Doodle name={h.doodle} className="h-11 w-11" />
                <span className="font-hand text-xl leading-none text-ink">{h.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right page: collage */}
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:block lg:min-h-[640px]">
          <Reveal className="lg:absolute lg:left-0 lg:top-2 lg:w-[46%]">
            <Polaroid photoId={uzbekistan} sizes="(max-width: 1024px) 45vw, 260px" />
          </Reveal>
          <Reveal className="lg:absolute lg:right-0 lg:top-16 lg:w-[46%]" delay={0.05}>
            <Polaroid photoId={moving} tape="terracotta" sizes="(max-width: 1024px) 45vw, 260px" />
          </Reveal>

          <Reveal className="col-span-1 lg:absolute lg:left-[6%] lg:top-[350px] lg:w-[40%]" delay={0.1}>
            <HandwrittenNote id={about.stickyNotes[0].id} color={about.stickyNotes[0].color}>
              {about.stickyNotes[0].text}
            </HandwrittenNote>
          </Reveal>
          <Reveal className="col-span-1 lg:absolute lg:right-[4%] lg:top-[390px] lg:w-[44%]" delay={0.15}>
            <Polaroid photoId={me} tape="none" size="sm" sizes="(max-width: 1024px) 45vw, 240px" />
          </Reveal>
          <Reveal className="col-span-2 sm:col-span-1 lg:absolute lg:left-[2%] lg:top-[540px] lg:w-[42%]" delay={0.2}>
            <HandwrittenNote id={about.stickyNotes[1].id} color={about.stickyNotes[1].color}>
              {about.stickyNotes[1].text}
            </HandwrittenNote>
          </Reveal>
        </div>
      </div>

      {/* Bottom strip: people + key message */}
      <div className="mt-16 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:mt-10">
        <Reveal className="mx-auto w-full max-w-md">
          <Polaroid photoId={people} sizes="(max-width: 768px) 90vw, 520px" />
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-sm" delay={0.1}>
          <HandArrow shape="curl" className="absolute -left-16 -top-14 hidden h-20 w-28 md:block" />
          <div className="tilt paper-card relative px-6 py-8 text-center" style={{ "--rot": "-2deg" } as React.CSSProperties}>
            <Tape className="-top-3 left-6" tone="terracotta" angle={-8} />
            <Tape className="-top-3 right-6" angle={6} />
            <p className="font-hand text-[2.6rem] leading-[2.6rem] text-forest">
              {about.keyMessage}
            </p>
            <p className="mt-3 font-hand text-xl text-brown">a note to self (and to you)</p>
          </div>
        </Reveal>
      </div>
    </ScrapbookPage>
  );
}
