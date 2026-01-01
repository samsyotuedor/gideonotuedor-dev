import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";
import vueLogo from "@/assets/skills/vue.svg";
import tailwindLogo from "@/assets/skills/tailwind.svg";
import nodejsLogo from "@/assets/skills/nodejs.svg";
import gitLogo from "@/assets/skills/git.svg";

const tools = [
  { name: "JavaScript", logo: javascriptLogo, bgColor: "bg-yellow-500/10" },
  { name: "TypeScript", logo: typescriptLogo, bgColor: "bg-blue-500/10" },
  { name: "React", logo: reactLogo, bgColor: "bg-cyan-500/10" },
  { name: "Next.js", logo: nextjsLogo, bgColor: "bg-gray-500/10" },
  { name: "Vue", logo: vueLogo, bgColor: "bg-green-500/10" },
  { name: "Tailwind", logo: tailwindLogo, bgColor: "bg-teal-500/10" },
  { name: "Node.js", logo: nodejsLogo, bgColor: "bg-lime-500/10" },
  { name: "Git", logo: gitLogo, bgColor: "bg-orange-500/10" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-primary font-medium"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mt-2"
            >
              Building <span className="text-gradient">Digital Experiences</span>
            </motion.h2>
          </div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Location Badge */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl gradient-border flex items-center justify-center text-4xl">
                  🇳🇬
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Gideon Otuedor
                  <span className="text-muted-foreground font-normal"> — Lagos, Nigeria</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a <span className="text-foreground font-medium">Front-End Developer and CTO</span> with 4+ years of experience building scalable digital products across multiple industries. I specialize in <span className="text-primary font-medium">JavaScript, TypeScript, React, Next.js, and Vue</span> — with strong focus on UX optimization, code quality, and performance.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I've led teams, shipped high-impact features, improved deployment pipelines, and delivered applications that users genuinely enjoy using.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-center mb-8">
              Tools I Work With
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-xl p-4 text-center cursor-pointer group"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${tool.bgColor} flex items-center justify-center p-2`}>
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
