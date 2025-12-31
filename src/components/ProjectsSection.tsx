import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

import churchplusImg from "@/assets/projects/churchplus.png";
import projectVenusImg from "@/assets/projects/project-venus.png";
import productdriveImg from "@/assets/projects/productdrive.png";
import quiverImg from "@/assets/projects/quiver.png";

const projects = [
  {
    title: "ChurchPlus",
    description: "Comprehensive church management system",
    tech: ["Vue 3", "Vuex", "Element Plus"],
    features: "Events, giving, attendance, member tools",
    type: "Company Project",
    color: "from-primary to-cyan-400",
    image: churchplusImg,
  },
  {
    title: "Project Venus",
    description: "Complete learning platform with role-based access",
    tech: ["TypeScript", "Next.js", "Tailwind"],
    features: "Faster load time, reusable components, role access",
    type: "Personal Project",
    color: "from-green-400 to-emerald-500",
    image: projectVenusImg,
  },
  {
    title: "Quiver",
    description: "Social platform with smooth user experience",
    tech: ["Vue 3", "Pinia", "Tailwind"],
    features: "Smooth feed, messaging, optimized UI",
    type: "Professional Project",
    color: "from-purple-400 to-pink-500",
    image: quiverImg,
  },
  {
    title: "Product Drive",
    description: "Web solutions agency landing page",
    tech: ["React", "Tailwind", "Framer Motion"],
    features: "Modern design, smooth animations, responsive",
    type: "Agency Project",
    color: "from-blue-400 to-indigo-500",
    image: productdriveImg,
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-primary font-medium"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            My <span className="text-gradient">Projects</span>
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full hover:glow-primary transition-all duration-500">
                {/* Project Header */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
                    {project.type}
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-gradient transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  {/* Features */}
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    "{project.features}"
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Demo
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary text-sm font-medium transition-colors"
                    >
                      <Github size={16} />
                      GitHub
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
