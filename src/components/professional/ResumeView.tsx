import { Download, Mail, Phone, Printer } from "lucide-react";
import type { Resume } from "@/lib/types";
import { PrintButton } from "./PrintButton";

type ResumeViewProps = {
  resume: Resume;
  /** Path to the PDF when it exists in /public; null hides the button. */
  pdfHref: string | null;
};

/** Recruiter Mode: a plain, high-contrast résumé. Also the print layout. */
export function ResumeView({ resume, pdfHref }: ResumeViewProps) {
  const isEmpty = resume.experience.length === 0 && resume.education.length === 0;
  if (isEmpty) {
    return (
      <div className="bg-paper-light p-8 text-center shadow-paper">
        <p className="font-serif text-3xl text-forest">Résumé coming soon</p>
      </div>
    );
  }

  const { contact } = resume;
  const heading = "border-b border-ink/30 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-forest print:text-black";

  return (
    <div className="print-resume mx-auto max-w-[52rem] bg-paper-light px-5 py-8 font-sans text-[0.95rem] leading-6 text-ink shadow-paper sm:px-10 sm:py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-3xl font-bold tracking-tight text-ink sm:text-4xl print:text-[20pt] print:text-black">{resume.name}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 text-forest underline-offset-2 hover:underline">
                  <Mail className="h-3.5 w-3.5 print:hidden" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && contact.publishPhone && (
              <li>
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 text-forest underline-offset-2 hover:underline">
                  <Phone className="h-3.5 w-3.5 print:hidden" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
            )}
            {[contact.linkedin, contact.github].map(
              (link) =>
                link && (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-2">
                      {link.label}
                      <span className="hidden print:inline">
                        : {link.href.replace(/^https:\/\/(www\.)?/, "")}
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          {pdfHref && (
            <a
              href={pdfHref}
              download
              className="inline-flex min-h-11 items-center gap-2 bg-forest px-4 text-sm font-semibold text-paper-light hover:bg-ink"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download résumé (PDF)
            </a>
          )}
          <PrintButton>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print
          </PrintButton>
        </div>
      </header>

      <section aria-labelledby="r-education" className="mt-7">
        <h3 id="r-education" className={heading}>Education</h3>
        {resume.education.map((e) => (
          <div key={e.school} className="mt-3">
            <div className="flex flex-wrap justify-between gap-x-4">
              <p className="font-bold">{e.school}</p>
              <p>{e.location}</p>
            </div>
            <div className="flex flex-wrap justify-between gap-x-4">
              <p className="italic">{e.degree}</p>
              <p>{e.date}</p>
            </div>
            <p className="mt-1">
              <span className="font-semibold">Relevant Coursework:</span> {e.coursework}
            </p>
          </div>
        ))}
      </section>

      <section aria-labelledby="r-experience" className="mt-7">
        <h3 id="r-experience" className={heading}>Experience</h3>
        {resume.experience.map((job) => (
          <div key={job.id} className="mt-4">
            <div className="flex flex-wrap justify-between gap-x-4">
              <p className="font-bold">{job.company}</p>
              <p>{job.location}</p>
            </div>
            <div className="flex flex-wrap justify-between gap-x-4">
              <p className="italic">{job.role}</p>
              <p>{job.dates}</p>
            </div>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-ink/60">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {resume.projects.length > 0 && (
        <section aria-labelledby="r-projects" className="mt-7">
          <h3 id="r-projects" className={heading}>Projects</h3>
          {resume.projects.map((p) => (
            <div key={p.id} className="mt-4">
              <div className="flex flex-wrap justify-between gap-x-4">
                <p className="font-bold">{p.name}</p>
                {p.dates && <p>{p.dates}</p>}
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-ink/60">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section aria-labelledby="r-skills" className="mt-7">
        <h3 id="r-skills" className={heading}>Skills</h3>
        <dl className="mt-3 space-y-1">
          {resume.skills.map((s) => (
            <div key={s.label}>
              <dt className="inline font-semibold">{s.label}: </dt>
              <dd className="inline">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="r-campus" className="mt-7">
        <h3 id="r-campus" className={heading}>Campus Involvement</h3>
        <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-ink/60">
          {resume.campusInvolvement.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="r-contact" className="print-skip mt-7">
        <h3 id="r-contact" className={heading}>Contact</h3>
        <ul className="mt-3 space-y-0.5">
          {contact.email && (
            <li>
              Email:{" "}
              <a href={`mailto:${contact.email}`} className="text-forest underline underline-offset-2">
                {contact.email}
              </a>
            </li>
          )}
          {contact.phone && contact.publishPhone && <li>Phone: {contact.phone}</li>}
          {contact.linkedin && (
            <li>
              LinkedIn:{" "}
              <a href={contact.linkedin.href} target="_blank" rel="noopener noreferrer" className="break-all text-forest underline underline-offset-2">
                {contact.linkedin.href.replace(/^https:\/\/(www\.)?/, "")}
              </a>
            </li>
          )}
          {contact.github && (
            <li>
              GitHub:{" "}
              <a href={contact.github.href} target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-2">
                {contact.github.href.replace(/^https:\/\//, "")}
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
