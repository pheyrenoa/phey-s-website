import { ActiveSectionProvider } from "@/components/layout/ActiveSectionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { LightboxProvider } from "@/components/photos/LightboxProvider";
import { HireSection } from "@/components/sections/HireSection";
import { LovesSection } from "@/components/sections/LovesSection";
import { UpToSection } from "@/components/sections/UpToSection";
import { WhoSection } from "@/components/sections/WhoSection";

export default function Home() {
  return (
    <ActiveSectionProvider>
      <LightboxProvider>
        <a
          href="#main"
          className="sr-only z-[80] bg-forest px-4 py-2 text-paper-light focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="overflow-x-clip focus:outline-none">
          <WhoSection />
          <UpToSection />
          <LovesSection />
          <HireSection />
        </main>
      </LightboxProvider>
    </ActiveSectionProvider>
  );
}
