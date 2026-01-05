import { motion } from "framer-motion";
import { Mail, ArrowDown, Github, Linkedin, FileDown, Globe } from "lucide-react";
import { FloatingShapes } from "./FloatingShapes";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <FloatingShapes />
      
      <div className="container-custom relative z-10">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6"
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
              and multiple production-ready business tools — improving performance, usability, 
              and development speed across teams.
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <Mail size={18} />
                Hire Me
              </motion.a>
              
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card gradient-border font-medium hover:glow-primary transition-all duration-300"
              >
                View Projects
              </motion.a>
              
              <motion.a
                href="/Gideon-Otuedor-Resume.pdf"
                download="Gideon-Otuedor-Resume.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card font-medium hover:glow-accent transition-all duration-300"
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
              <motion.a
                href="https://github.com/samsyotuedor"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-xl glass-card hover:glow-primary transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/gideon-otuedor-92447b212"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-xl glass-card hover:glow-primary transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="https://devcraftbygideon.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-xl glass-card hover:glow-primary transition-all duration-300 group"
                aria-label="Portfolio"
              >
                <Globe size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Animated glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Profile container */}
              <motion.div 
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl gradient-border overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-[1px] bg-card rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary-foreground">GO</span>
                    </div>
                    <p className="text-lg font-medium text-foreground mb-1">Gideon Otuedor</p>
                    <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-3 -right-3 px-4 py-3 rounded-2xl glass-card glow-primary"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-2xl font-bold text-gradient">4+</p>
                <p className="text-xs text-muted-foreground">Years Exp.</p>
              </motion.div>

              {/* Projects badge */}
              <motion.div
                className="absolute -top-3 -left-3 px-4 py-3 rounded-2xl glass-card glow-accent"
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
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
