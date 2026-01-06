import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Code, Palette, GitBranch, ArrowRight } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js"],
  },
  {
    title: "UI Tools",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    skills: ["Tailwind CSS", "Sass/SCSS", "Figma", "Framer Motion"],
  },
  {
    title: "Workflow",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    skills: ["Git", "CI/CD", "Agile/Scrum", "Testing"],
  },
];

export function SkillsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            My <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card gradient-border rounded-2xl p-5 hover:glow-primary transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color}`}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View all skills
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
