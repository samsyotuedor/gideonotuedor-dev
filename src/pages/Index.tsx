import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutPreview } from "@/components/previews/AboutPreview";
import { ExperiencePreview } from "@/components/previews/ExperiencePreview";
import { ProjectsPreview } from "@/components/previews/ProjectsPreview";
import { SkillsPreview } from "@/components/previews/SkillsPreview";
import { ContactPreview } from "@/components/previews/ContactPreview";
import { Footer } from "@/components/Footer";
import { MouseTracker } from "@/components/MouseTracker";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <MouseTracker />
      <Navbar />
      <HeroSection />
      <AboutPreview />
      <ExperiencePreview />
      <ProjectsPreview />
      <SkillsPreview />
      <ContactPreview />
      <Footer />
    </main>
  );
};

export default Index;
