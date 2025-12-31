import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, TrendingUp, Users, Zap, CheckCircle } from "lucide-react";

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Complustech",
    icon: Users,
    color: "from-primary to-accent",
    achievements: [
      "Led engineering strategy for Churchplus and internal tools",
      "Reduced release issues by 35% using CI/CD",
      "Cut bugs by 25% with code reviews and standards",
      "Mentored developers and improved delivery speed",
      "Helped leadership prioritize features and ship faster",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Complustech",
    icon: Zap,
    color: "from-cyan-400 to-blue-500",
    achievements: [
      "Reduced development time 25% with a design system",
      "Increased user engagement 20%",
      "Improved customer satisfaction 15%",
      "Fixed scalability and performance issues",
      "Worked with UX to increase conversions 10%",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Venus (LMS Project)",
    icon: TrendingUp,
    color: "from-green-400 to-emerald-500",
    achievements: [
      "Built a complete learning platform",
      "Reduced load time 40%",
      "Created reusable components saving 30% dev time",
      "Designed UI for future scalability",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Quiver",
    icon: Zap,
    color: "from-purple-400 to-pink-500",
    achievements: [
      "Improved navigation speed and performance",
      "Used Pinia for efficient state management",
      "Built responsive UIs for all devices",
      "Reduced UI bugs through testing",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Product Drive",
    icon: Briefcase,
    color: "from-orange-400 to-red-500",
    achievements: [
      "Reduced delivery time with Agile practices",
      "Helped maintain 99.9% uptime",
    ],
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-primary font-medium"
          >
            Work Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            My <span className="text-gradient">Professional Journey</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
              )}
              
              <div className="flex gap-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                >
                  <exp.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                
                {/* Content */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex-1 glass-card rounded-2xl p-6 hover:glow-primary transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-primary font-medium">{exp.company}</span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
