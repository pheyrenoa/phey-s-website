import { existsSync } from "node:fs";
import { join } from "node:path";
import { personalExperience, resume } from "@/content/resume";
import { site } from "@/content/site";
import { HireView } from "@/components/professional/HireView";
import { PersonalExperienceView } from "@/components/professional/PersonalExperienceView";
import { ResumeView } from "@/components/professional/ResumeView";
import { ScrapbookPage } from "@/components/scrapbook/ScrapbookPage";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";

const PDF_PATH = "/resume/Phey-Rashidova-Resume.pdf";

/** Page 4 — "Why hire Phey?" */
export function HireSection() {
  // Checked at build time: the download button only renders if the PDF exists.
  const pdfHref = existsSync(join(process.cwd(), "public", PDF_PATH)) ? PDF_PATH : null;

  const entries = personalExperience.flatMap((p) => {
    const job = resume.experience.find((j) => j.id === p.resumeId);
    return job ? [{ ...p, job }] : [];
  });

  return (
    <ScrapbookPage id="hire" labelledBy="hire-title" printHidden={false}>
      <div className="print:hidden">
        <SectionHeading
          id="hire-title"
          kicker="page four · the work"
          title={site.sections[3].label}
          intro="Where I've worked and what I've built."
        />
      </div>
      <HireView
        personal={<PersonalExperienceView entries={entries} />}
        recruiter={<ResumeView resume={resume} pdfHref={pdfHref} />}
      />
    </ScrapbookPage>
  );
}
