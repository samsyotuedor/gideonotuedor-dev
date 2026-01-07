import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutPreview } from "@/components/previews/AboutPreview";
import { ExperiencePreview } from "@/components/previews/ExperiencePreview";
import { ProjectsPreview } from "@/components/previews/ProjectsPreview";
import { SkillsPreview } from "@/components/previews/SkillsPreview";
import { ContactPreview } from "@/components/previews/ContactPreview";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";

const ParticleBackground = lazy(() => 
  import("@/components/3d/ParticleBackground").then(m => ({ default: m.ParticleBackground }))
);

const Index = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background relative">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        
        {/* Custom cursor */}
        <CustomCursor />
        
        {/* 3D Particle background */}
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        
        <Navbar />
        <HeroSection />
        <AboutPreview />
        <ExperiencePreview />
        <ProjectsPreview />
        <SkillsPreview />
        <TestimonialsSection />
        <BookingSection />
        <ContactPreview />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Index;