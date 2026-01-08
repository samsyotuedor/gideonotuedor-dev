import { motion } from "framer-motion";
import { Mail, ArrowDown, Github, Linkedin, FileDown, Globe } from "lucide-react";
import { Suspense, lazy } from "react";

const Scene3D = lazy(() => import("./3d/Scene3D").then(m => ({ default: m.Scene3D })));

// Floating code tag component
function CodeTag({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute font-mono text-xs md:text-sm px-3 py-1.5 rounded-lg glass-card-strong text-primary/70 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[200vh] overflow-hidden pt-20">
      {/* 3D Scene Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-radial opacity-30" />}>
        <Scene3D />
      </Suspense>
      
      {/* First Viewport - Main Hero */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container-custom">
          {/* Floating Code Tags */}
          <CodeTag className="top-32 left-[5%] hidden lg:block" delay={1.2}>&lt;div&gt;</CodeTag>
          <CodeTag className="top-48 right-[8%] hidden lg:block" delay={1.4}>&lt;/code&gt;</CodeTag>
          <CodeTag className="bottom-48 left-[10%] hidden lg:block" delay={1.6}>&lt;section&gt;</CodeTag>
          <CodeTag className="bottom-32 right-[5%] hidden lg:block" delay={1.8}>&lt;/div&gt;</CodeTag>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Text Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-strong border border-primary/20 mb-6"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  Available for new opportunities
                </span>
              </motion.div>
              
              {/* Name & Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I'm <span className="text-gradient">Gideon Otuedor</span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-medium text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Front-End Developer & CTO — Building Scalable, User-Focused Web Applications
              </motion.h2>
              
              <motion.p
                className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                I design and build fast, reliable, and intuitive web applications. 
                I've worked on real-world products like Churchplus, a Learning Management System, 
                and multiple production-ready business tools.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                  href="mailto:samsyotuedor40@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-medium shadow-lg cursor-pointer"
                >
                  <Mail size={18} />
                  Hire Me
                </motion.a>
                
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card-strong gradient-border font-medium cursor-pointer"
                >
                  View Projects
                </motion.a>
                
                <motion.a
                  href="/Gideon-Resume.pdf"
                  download="Gideon-Otuedor-Resume.pdf"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card-strong font-medium cursor-pointer"
                >
                  <FileDown size={18} />
                  Resume
                </motion.a>
              </motion.div>
              
              {/* Social Links */}
              <motion.div
                className="flex gap-4 mt-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { href: "https://github.com/samsyotuedor", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/gideon-otuedor-92447b212", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://devcraftbygideon.vercel.app", icon: Globe, label: "Portfolio" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-xl glass-card-strong hover:glow-primary transition-all duration-300 group cursor-pointer"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Profile Card */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div 
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl gradient-border overflow-hidden glass-card-strong"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-[1px] rounded-3xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow-pulse">
                        <span className="text-3xl font-bold text-primary-foreground">GO</span>
                      </div>
                      <p className="text-lg font-medium mb-1">Gideon Otuedor</p>
                      <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Badges */}
                <motion.div
                  className="absolute -bottom-3 -right-3 px-4 py-3 rounded-2xl glass-card-strong glow-primary"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-2xl font-bold text-gradient">4+</p>
                  <p className="text-xs text-muted-foreground">Years Exp.</p>
                </motion.div>

                <motion.div
                  className="absolute -top-3 -left-3 px-4 py-3 rounded-2xl glass-card-strong glow-accent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-2xl font-bold text-gradient">10+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Second Viewport - Code Elements Showcase */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Crafting <span className="text-gradient">Clean Code</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building with modern technologies and best practices
            </p>
          </motion.div>
          
          {/* Code snippet showcase */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                tag: "<React />", 
                title: "Component-Based", 
                desc: "Reusable, maintainable UI components" 
              },
              { 
                tag: "<TypeScript />", 
                title: "Type-Safe", 
                desc: "Catching errors before they happen" 
              },
              { 
                tag: "<Next.js />", 
                title: "Performance First", 
                desc: "Optimized for speed and SEO" 
              },
              { 
                tag: "<Vue />", 
                title: "Reactive Data", 
                desc: "Elegant state management" 
              },
              { 
                tag: "<TailwindCSS />", 
                title: "Utility-First", 
                desc: "Rapid, consistent styling" 
              },
              { 
                tag: "<Node.js />", 
                title: "Full-Stack", 
                desc: "End-to-end solutions" 
              },
            ].map((item, index) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 rounded-2xl glass-card-strong gradient-border group cursor-pointer"
              >
                <code className="text-primary font-mono text-lg mb-3 block group-hover:text-accent transition-colors">
                  {item.tag}
                </code>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20"
          >
            {[
              { value: "4+", label: "Years Experience" },
              { value: "10+", label: "Projects Delivered" },
              { value: "25%", label: "Dev Time Reduced" },
              { value: "99.9%", label: "Uptime Maintained" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
