import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Layers, Users, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const highlights = [
  { icon: Briefcase, label: "Experience", value: "4+ years" },
  { icon: Users, label: "Current role", value: "CTO, Complustech" },
  { icon: Layers, label: "Focus", value: "Web platforms & SaaS" },
  { icon: MapPin, label: "Based in", value: "Lagos, Nigeria" },
];

export function AboutPreview() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Engineering products that <span className="text-gradient">people rely on</span>
            </>
          }
          link={{ to: "/about", label: "More about me" }}
        />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              I'm a <span className="text-foreground font-medium">Software Developer and CTO</span> with
              4+ years of experience building scalable digital products. I specialize in{" "}
              <span className="text-primary font-medium">JavaScript, TypeScript, React, Next.js and Vue</span>.
            </p>
            <p>
              I care about clean architecture, fast interfaces and teams that ship with confidence —
              setting engineering standards, mentoring developers and turning product goals into
              reliable releases.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-base font-medium text-primary"
            >
              Read my story
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-card p-5 md:p-6"
              >
                <item.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-medium text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
