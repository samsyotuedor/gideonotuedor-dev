import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { Calendar, Clock, Video, MessageSquare, ExternalLink } from "lucide-react";
import { FadeInOnScroll, StaggerContainer, staggerChildVariants } from "./ScrollAnimations";
import { SectionHeading } from "@/components/SectionHeading";

// Calendly event URLs - Update these with your actual Calendly links
const CALENDLY_USERNAME = "gideon-otuedor"; // Replace with your Calendly username

const bookingOptions = [
  {
    title: "Quick Chat",
    duration: "15 min",
    description: "Brief intro call to discuss your project needs",
    icon: MessageSquare,
    color: "from-primary to-accent",
    calendlyEvent: "15min-chat", // Replace with your actual event slug
  },
  {
    title: "Discovery Call",
    duration: "30 min",
    description: "Deep dive into your project requirements and goals",
    icon: Video,
    color: "from-accent to-primary",
    calendlyEvent: "30min-discovery", // Replace with your actual event slug
  },
  {
    title: "Technical Consultation",
    duration: "60 min",
    description: "Comprehensive technical planning session",
    icon: Calendar,
    color: "from-primary via-accent to-primary",
    calendlyEvent: "60min-consultation", // Replace with your actual event slug
  },
];

// Declare Calendly on window for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Load Calendly widget script
  useEffect(() => {
    // Add Calendly stylesheet
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = (eventSlug: string) => {
    const url = `https://calendly.com/${CALENDLY_USERNAME}/${eventSlug}`;
    
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      // Fallback: open in new tab if widget isn't loaded
      window.open(url, "_blank");
    }
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="07"
          eyebrow="Book a meeting"
          title={
            <>
              Let's <span className="text-gradient">talk</span>
            </>
          }
          description="Schedule a call to discuss your project, explore collaboration, or get technical guidance on your next idea."
        />

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {bookingOptions.map((option) => (
            <motion.div key={option.title} variants={staggerChildVariants} className="group">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex rounded-xl border border-border p-2.5 transition-colors group-hover:border-primary/40">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {option.duration}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground">{option.title}</h3>
                <p className="mt-2 mb-8 flex-1 text-muted-foreground">{option.description}</p>

                <button
                  onClick={() => openCalendly(option.calendlyEvent)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </button>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeInOnScroll>
          <div className="mt-8 text-center">
            <a
              href={`https://calendly.com/${CALENDLY_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              See all available times on Calendly
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
