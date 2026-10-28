import { motion } from "framer-motion";
import { Code, Palette, GitBranch, Server } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js"],
  },
  {
    title: "Backend & Data",
    icon: Server,
    skills: ["Node.js", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    title: "UI & Design",
    icon: Palette,
    skills: ["Tailwind CSS", "Sass/SCSS", "Figma", "Framer Motion"],
  },
  {
    title: "Workflow",
    icon: GitBranch,
    skills: ["Git", "CI/CD", "Agile/Scrum", "Testing"],
  },
];

export function SkillsPreview() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Expertise"
          title={
            <>
              The tools behind <span className="text-gradient">the work</span>
            </>
          }
          link={{ to: "/skills", label: "All skills" }}
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-card p-6 md:p-8 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-6 inline-flex rounded-xl border border-border p-2.5 transition-colors group-hover:border-primary/40">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
