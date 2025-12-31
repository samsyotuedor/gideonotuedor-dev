import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Layout, GitBranch, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "from-primary to-cyan-400",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue"],
  },
  {
    title: "UI Tools",
    icon: Palette,
    color: "from-purple-400 to-pink-500",
    skills: ["Tailwind", "Bootstrap", "Shadcn", "Element Plus"],
  },
  {
    title: "UX",
    icon: Layout,
    color: "from-green-400 to-emerald-500",
    skills: ["Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    title: "Workflow",
    icon: GitBranch,
    color: "from-orange-400 to-red-500",
    skills: ["Git", "GitHub", "Agile"],
  },
  {
    title: "Extras",
    icon: Sparkles,
    color: "from-yellow-400 to-orange-500",
    skills: ["Photoshop", "Sketch"],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-primary font-medium"
          >
            Technical Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            My <span className="text-gradient">Expertise</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 text-center hover:glow-primary transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10 }}
                className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
              >
                <category.icon className="w-7 h-7 text-primary-foreground" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold mb-4 text-foreground">{category.title}</h3>
              
              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
