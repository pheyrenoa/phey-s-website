import { MapPin } from "lucide-react";
import { Polaroid } from "@/components/photos/Polaroid";
import { PaperClip } from "@/components/scrapbook/PaperClip";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Tape } from "@/components/scrapbook/Tape";
import { rotationFor } from "@/lib/rotation";
import type { PersonalExperience, ResumeExperience } from "@/lib/types";

type Entry = PersonalExperience & { job: ResumeExperience };

/** Scrapbook-style work history: ticket stubs and pinned badges. */
export function PersonalExperienceView({ entries }: { entries: Entry[] }) {
  return (
    <ol className="space-y-14">
      {entries.map((entry, i) => (
        <Reveal as="li" key={entry.resumeId}>
          <ExperienceCard entry={entry} flip={i % 2 === 1} />
        </Reveal>
      ))}
    </ol>
  );
}

function ExperienceCard({ entry, flip }: { entry: Entry; flip: boolean }) {
  const { job } = entry;
  const rot = rotationFor(`exp-${job.id}`, 0.3, 1.2);
  const isTicket = entry.style === "ticket";
  const titleId = `exp-${job.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={`tilt relative grid gap-6 ${
        flip ? "md:grid-cols-[15rem_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,1fr)_15rem]"
      }`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
    >
      <div
        className={`paper-card relative ${flip ? "md:order-2" : ""} ${
          isTicket ? "grid sm:grid-cols-[8.5rem_minmax(0,1fr)]" : "border-t-[6px] border-forest"
        }`}
      >
        {isTicket ? (
          <>
            {/* Ticket stub */}
            <div className="relative flex flex-row items-center justify-between gap-2 border-b-2 border-dashed border-brown/40 bg-[color-mix(in_srgb,var(--sage)_30%,var(--paper-light))] px-4 py-3 sm:flex-col sm:items-start sm:justify-center sm:border-b-0 sm:border-r-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">Admit one</span>
              <span className="font-hand text-2xl leading-6 text-forest">{job.dates}</span>
              <span aria-hidden="true" className="absolute -right-3 -top-3 hidden h-6 w-6 rounded-full bg-paper sm:block" />
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 hidden h-6 w-6 rounded-full bg-paper sm:block" />
            </div>
            <CardBody entry={entry} titleId={titleId} showDates={false} />
          </>
        ) : (
          <>
            <PaperClip className="-top-7 left-1/2" />
            <CardBody entry={entry} titleId={titleId} showDates />
          </>
        )}
      </div>
      <div className={`relative mx-auto w-full max-w-[15rem] md:pt-6 ${flip ? "md:order-1" : ""}`}>
        <Tape className="-top-1 right-4" tone="terracotta" angle={12} />
        <Polaroid photoId={entry.photoId} tape="none" size="sm" sizes="240px" />
      </div>
    </article>
  );
}

function CardBody({ entry, titleId, showDates }: { entry: Entry; titleId: string; showDates: boolean }) {
  const { job } = entry;
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={titleId} className="font-serif text-3xl leading-tight text-forest">
          {job.company}
        </h3>
        <span className="inline-flex items-center gap-1 text-sm text-brown">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {job.location}
        </span>
      </div>
      <p className="mt-0.5 font-semibold text-ink">
        {job.role}
        {showDates && <span className="font-normal text-brown"> · {job.dates}</span>}
      </p>
      <p className="mt-3 font-hand text-2xl leading-7 text-ink">{entry.intro}</p>
      <ul className="mt-3 space-y-2 text-[0.95rem] leading-6 text-ink">
        {entry.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full border-2 border-terracotta" />
            <span>{job.bullets[h]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
