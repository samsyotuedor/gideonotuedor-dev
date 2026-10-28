import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileDown, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ComputersCanvas } from "@/components/canvas";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { href: "https://github.com/samsyotuedor", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/gideon-otuedor-92447b212", icon: Linkedin, label: "LinkedIn" },
  { href: "https://gideonotuedor-dev.vercel.app", icon: Globe, label: "Portfolio" },
];

const stats = [
  { value: "4+", label: "Years experience" },
  { value: "5+", label: "Products shipped" },
  { value: "35%", label: "Fewer release issues" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24 pb-12 lg:pb-0">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center lg:min-h-[calc(100vh-6rem)]">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-6 font-raleway text-sm text-muted-foreground"
            >
              <span className="text-primary font-semibold">&lt;hello world /&gt;</span>
              <span className="h-px w-8 bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} /> Lagos, Nigeria
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.02] text-foreground"
            >
              Gideon
              <br />
              <span className="text-gradient">Otuedor</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mt-6 text-xl md:text-2xl font-medium text-foreground/90"
            >
              Software Developer &amp; CTO
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              I design and build scalable, user-focused software — from product
              strategy to production code — with React, Next.js, Vue and TypeScript.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3.5 font-medium shadow-lg shadow-primary/20"
              >
                View my work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-sm px-6 py-3.5 font-medium text-foreground hover:border-primary/40 transition-colors"
              >
                Hire me
              </Link>
              <a
                href="/Gideon-Resume.pdf"
                download="Gideon-Otuedor-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileDown size={18} />
                Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border"
            >
              {stats.map((s) => (
                <div key={s.label} className="py-5 px-4 first:pl-0">
                  <dt className="text-2xl md:text-3xl font-semibold text-foreground">{s.value}</dt>
                  <dd className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group rounded-full border border-border/60 p-2.5 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <s.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* 3D desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[640px] xl:h-[720px]">
              <ComputersCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
