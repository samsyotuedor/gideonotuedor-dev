import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Complustech",
    summary: "Leading engineering strategy for Churchplus and internal tools.",
    achievements: ["Reduced release issues by 35% with CI/CD", "Cut bugs by 25% through code reviews and standards"],
    current: true,
  },
  {
    title: "Software Developer",
    company: "Complustech",
    summary: "Built the design system and core product experiences.",
    achievements: ["Reduced development time by 25%", "Increased user engagement by 20%"],
  },
  {
    title: "Software Developer",
    company: "Venus (LMS Project)",
    summary: "Delivered a complete learning platform end to end.",
    achievements: ["Reduced load time by 40%", "Reusable components saved 30% dev time"],
  },
];

export function ExperiencePreview() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title={
            <>
              Where I've <span className="text-gradient">made an impact</span>
            </>
          }
          link={{ to: "/experience", label: "Full experience" }}
        />

        <div className="divide-y divide-border border-y border-border">
          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group grid gap-4 py-8 md:grid-cols-[220px_1fr_1fr] md:gap-10"
            >
              <div>
                <p className="font-medium text-primary">{exp.company}</p>
                {exp.current && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Current
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="mt-2 text-muted-foreground">{exp.summary}</p>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-primary/60" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
