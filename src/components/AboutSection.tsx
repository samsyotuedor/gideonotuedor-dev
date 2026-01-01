import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

        </motion.div>
      </div>
    </section>
  );
}
