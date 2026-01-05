import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";

import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";
import vueLogo from "@/assets/skills/vue.svg";
import tailwindLogo from "@/assets/skills/tailwind.svg";
import nodejsLogo from "@/assets/skills/nodejs.svg";
import gitLogo from "@/assets/skills/git.svg";

const tools = [
  { name: "JavaScript", logo: javascriptLogo },
  { name: "TypeScript", logo: typescriptLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextjsLogo },
  { name: "Vue", logo: vueLogo },
  { name: "Tailwind", logo: tailwindLogo },
  { name: "Node.js", logo: nodejsLogo },
  { name: "Git", logo: gitLogo },
];

const highlights = [
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
  { icon: Briefcase, label: "Experience", value: "4+ Years" },
  { icon: GraduationCap, label: "Role", value: "CTO & Developer" },
  { icon: Heart, label: "Focus", value: "UX & Performance" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Get to Know <span className="text-gradient">Who I Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card gradient-border rounded-2xl p-8">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                I'm a <span className="text-foreground font-medium">Front-End Developer and CTO</span> with 4+ years of experience building scalable digital products across multiple industries. I specialize in <span className="text-primary font-medium">JavaScript, TypeScript, React, Next.js, and Vue</span> — with strong focus on UX optimization, code quality, and performance.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I've led teams, shipped high-impact features, improved deployment pipelines, and delivered applications that users genuinely enjoy using. My approach combines technical excellence with a deep understanding of user needs.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6">
              Tools I Work With
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-xl p-4 text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary flex items-center justify-center p-2 group-hover:bg-primary/10 transition-colors">
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "35%", label: "Fewer Bugs" },
                { value: "40%", label: "Faster Loads" },
                { value: "25%", label: "Dev Time Saved" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center glass-card rounded-xl p-4"
                >
                  <p className="text-2xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
