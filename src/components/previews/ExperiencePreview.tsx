import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Zap, CheckCircle, ArrowRight } from "lucide-react";

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Complustech",
    icon: Users,
    achievements: [
      "Led engineering strategy for Churchplus",
      "Reduced release issues by 35%",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Complustech",
    icon: Zap,
    achievements: [
      "Reduced development time 25%",
      "Increased user engagement 20%",
    ],
  },
];

export function ExperiencePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Work Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            My <span className="text-gradient">Professional Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="relative mb-6 last:mb-0"
            >
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-full bg-border" />
              )}

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <exp.icon className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-primary font-medium text-sm">{exp.company}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-muted-foreground text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View full experience
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
