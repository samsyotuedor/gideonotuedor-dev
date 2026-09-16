import { motion } from "framer-motion";
import {
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  FileDown,
  Globe,
} from "lucide-react";
import { Suspense, lazy, useState } from "react";
import { ComputersCanvas } from "@/components/canvas";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14 md:pt-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/[0.02]" />

      <div className="relative  flex items-center">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              className="text-left order-2 lg:order-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Name */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Gideon{" "}
                <span className="text-gradient">Otuedor</span>
              </motion.h1>

              {/* Role */}
              <motion.p
                className="text-lg md:text-xl font-medium text-foreground/80 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Front-End Developer & CTO
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Building scalable, user-focused web applications with modern
                technologies. Experienced in React, Next.js, Vue, and
                TypeScript.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                  href="mailto:samsyotuedor40@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-gradient font-medium shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <Mail size={18} />
                  Hire Me
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card/50 backdrop-blur-sm font-medium hover:border-primary/30 transition-colors cursor-pointer"
                >
                  View Projects
                </motion.a>

                <motion.a
                  href="/Gideon-Resume.pdf"
                  download="Gideon-Resume.pdf"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card/50 backdrop-blur-sm font-medium hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <FileDown size={18} />
                  Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-3 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  {
                    href: "https://github.com/samsyotuedor",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://linkedin.com/in/gideon-otuedor-92447b212",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://gideonotuedor-dev.vercel.app",
                    icon: Globe,
                    label: "Portfolio",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                    aria-label={social.label}
                  >
                    <social.icon
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Desktop 3D Canvas */}
            <motion.div
              className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-[550px] sm:h-[600px] lg:h-[700px] xl:h-[750px]">
                <ComputersCanvas />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ArrowDown size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
