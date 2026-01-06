import { motion } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Users, GitBranch, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "HTML5", "CSS3"],
  },
  {
    title: "UI Tools",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    skills: ["Tailwind CSS", "Styled Components", "Sass/SCSS", "Figma", "Framer Motion"],
  },
  {
    title: "UX",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    skills: ["Responsive Design", "Accessibility", "Performance", "User Research", "Prototyping"],
  },
  {
    title: "Workflow",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    skills: ["Git", "GitHub", "CI/CD", "Agile/Scrum", "Code Review", "Testing"],
  },
  {
    title: "Extras",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500",
    skills: ["Node.js", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
];

const Skills = () => {
  const ref = useRef(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="section-padding pt-24 relative" ref={ref}>
        {/* Background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </motion.div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Technical Skills
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              My <span className="text-gradient">Expertise</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A comprehensive toolkit built over 4+ years of professional development.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card gradient-border rounded-2xl p-6 hover:glow-primary transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}
                  >
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 + skillIndex * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-secondary-foreground cursor-default"
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

      <Footer />
    </main>
  );
};

export default Skills;
