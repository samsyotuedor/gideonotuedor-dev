import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Import skill logos
import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";
import vueLogo from "@/assets/skills/vue.svg";
import tailwindLogo from "@/assets/skills/tailwind.svg";
import nodejsLogo from "@/assets/skills/nodejs.svg";
import gitLogo from "@/assets/skills/git.svg";

const skills = [
  { name: "JavaScript", logo: javascriptLogo, bgColor: "bg-yellow-500/20" },
  { name: "TypeScript", logo: typescriptLogo, bgColor: "bg-blue-500/20" },
  { name: "React", logo: reactLogo, bgColor: "bg-cyan-500/20" },
  { name: "Next.js", logo: nextjsLogo, bgColor: "bg-gray-500/20" },
  { name: "Vue", logo: vueLogo, bgColor: "bg-green-500/20" },
  { name: "Tailwind", logo: tailwindLogo, bgColor: "bg-teal-500/20" },
  { name: "Node.js", logo: nodejsLogo, bgColor: "bg-lime-500/20" },
  { name: "Git", logo: gitLogo, bgColor: "bg-orange-500/20" },
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
            Tools I Work <span className="text-gradient">With</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="glass-card rounded-2xl p-6 text-center hover:glow-primary transition-all duration-300"
            >
              {/* Logo */}
              <motion.div
                whileHover={{ rotate: 5 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-xl ${skill.bgColor} flex items-center justify-center`}
              >
                <img 
                  src={skill.logo} 
                  alt={`${skill.name} logo`} 
                  className="w-10 h-10"
                />
              </motion.div>
              
              {/* Name */}
              <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
