import { motion } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";
import vueLogo from "@/assets/skills/vue.svg";
import tailwindLogo from "@/assets/skills/tailwind.svg";
import nodejsLogo from "@/assets/skills/nodejs.svg";
import gitLogo from "@/assets/skills/git.svg";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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

const stats = [
  { value: "35%", label: "Fewer Bugs" },
  { value: "40%", label: "Faster Loads" },
  { value: "25%", label: "Dev Time Saved" },
];

const About = () => {
  const ref = useRef(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="section-padding pt-20 md:pt-24 relative" ref={ref}>
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 px-4 md:px-8">
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
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">
              About Me
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              Get to Know <span className="text-gradient">Who I Am</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left - Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card gradient-border rounded-xl md:rounded-2xl p-5 md:p-8">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4 md:mb-6">
                  I'm a <span className="text-foreground font-medium">Front-End Developer and CTO</span> with 4+ years of experience building scalable digital products across multiple industries. I specialize in <span className="text-primary font-medium">JavaScript, TypeScript, React, Next.js, and Vue</span> — with strong focus on UX optimization, code quality, and performance.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  I've led teams, shipped high-impact features, improved deployment pipelines, and delivered applications that users genuinely enjoy using. My approach combines technical excellence with a deep understanding of user needs.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass-card rounded-lg md:rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3"
                  >
                    <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground text-xs md:text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Tools */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
                Tools I Work With
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 md:gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card rounded-lg md:rounded-xl p-2 md:p-4 text-center cursor-pointer group"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-3 rounded-lg md:rounded-xl bg-secondary flex items-center justify-center p-1 md:p-2 group-hover:bg-primary/10 transition-colors">
                      <img src={tool.logo} alt={tool.name} className="w-5 h-5 md:w-8 md:h-8" />
                    </div>
                    <span className="text-[10px] md:text-sm font-medium text-foreground">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center glass-card rounded-lg md:rounded-xl p-2 md:p-4"
                  >
                    <p className="text-lg md:text-2xl font-bold text-gradient">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
