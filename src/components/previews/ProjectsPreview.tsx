import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

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
  },
  {
    title: "Learning Management System",
    description: "Full-featured LMS platform with course creation and progress tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    type: "EdTech Platform",
    image: projectVenusImg,
  },
  {
    title: "Quiz Builder",
    description: "Interactive quiz competition app with leaderboards, live scoring, and prize management.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    type: "EdTech App",
    image: quizBuilderImg,
  },
];

export function ProjectsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Projects I've <span className="text-gradient">Built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium border border-border/50">
                    {project.type}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View all projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
