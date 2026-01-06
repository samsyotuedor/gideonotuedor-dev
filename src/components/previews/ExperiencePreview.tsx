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
    color: "from-primary to-accent",
    achievements: [
      "Led engineering strategy for Churchplus",
      "Reduced release issues by 35%",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Complustech",
    icon: Zap,
    color: "from-cyan-400 to-blue-500",
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
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
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
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative mb-6 last:mb-0"
            >
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
              )}

              <div className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                >
                  <exp.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 glass-card gradient-border rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <span className="text-primary font-medium text-sm">{exp.company}</span>
                  </div>

                  <ul className="space-y-1">
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
          className="text-center mt-8"
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
