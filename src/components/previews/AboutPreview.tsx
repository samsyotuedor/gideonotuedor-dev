import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";

const tools = [
  { name: "JavaScript", logo: javascriptLogo },
  { name: "TypeScript", logo: typescriptLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextjsLogo },
];

const highlights = [
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
  { icon: Briefcase, label: "Experience", value: "4+ Years" },
];

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Get to Know <span className="text-gradient">Who I Am</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card gradient-border rounded-2xl p-8 mb-8"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a <span className="text-foreground font-medium">Front-End Developer and CTO</span> with 4+ years of experience building scalable digital products. I specialize in <span className="text-primary font-medium">JavaScript, TypeScript, React, Next.js, and Vue</span>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className="glass-card rounded-xl p-4 flex items-center gap-3 flex-1"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex gap-3 items-center justify-center md:justify-end"
            >
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="w-12 h-12 glass-card rounded-xl flex items-center justify-center p-2"
                >
                  <img src={tool.logo} alt={tool.name} className="w-6 h-6" />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
            >
              Learn more about me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
