import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

import churchplusImg from "@/assets/projects/churchplus.png";
import projectVenusImg from "@/assets/projects/project-venus.png";
import quizBuilderImg from "@/assets/projects/quiz-builder.png";

const projects = [
  {
    title: "Churchplus",
    description: "A comprehensive church management system with member management and financial tools.",
    tech: ["Vue 3", "Vuex", "Element Plus"],
    type: "Enterprise SaaS",
    image: churchplusImg,
    href: "https://my.churchplus.co" as string | null,
  },
  {
    title: "Learning Management System",
    description: "Full-featured LMS platform with course creation and progress tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "EdTech Platform",
    image: projectVenusImg,
    href: "https://venus-lms.vercel.app/login" as string | null,
  },
  {
    title: "Quiz Builder",
    description: "Interactive quiz competition app with leaderboards, live scoring, and prize management.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    type: "EdTech App",
    image: quizBuilderImg,
    href: "http://quiz-spark-flax.vercel.app/",
  },
];

export function ProjectsPreview() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Projects I've <span className="text-gradient">built</span>
            </>
          }
          description="A few products I've designed and engineered, from enterprise SaaS to learning platforms."
          link={{ to: "/projects", label: "All projects" }}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Wrapper = project.href ? "a" : Link;
            const wrapperProps = project.href
              ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
              : { to: "/projects" };
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={index === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Wrapper {...(wrapperProps as any)} className="group block h-full">
                  <div className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {project.type}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
