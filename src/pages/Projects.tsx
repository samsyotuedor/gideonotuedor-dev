import { motion } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import churchplusImg from "@/assets/projects/churchplus.png";
import projectVenusImg from "@/assets/projects/project-venus.png";
import productdriveImg from "@/assets/projects/productdrive.png";
import quiverImg from "@/assets/projects/quiver.png";
import quizBuilderImg from "@/assets/projects/quiz-builder.png";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const projects = [
  {
    title: "Churchplus",
    description: "A comprehensive church management system with member management, attendance tracking, and financial tools for religious organizations.",
    tech: ["Vue 3", "Vuex", "Element Plus", "Node.js"],
    features: ["Member Management", "Attendance Tracking", "Financial Reports"],
    type: "Enterprise SaaS",
    gradient: "from-blue-500 to-cyan-500",
    image: churchplusImg,
  },
  {
    title: "Learning Management System",
    description: "Full-featured LMS platform with course creation, student progress tracking, assessments, and interactive learning modules.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Course Builder", "Progress Tracking", "Video Lessons"],
    type: "EdTech Platform",
    gradient: "from-green-500 to-emerald-500",
    image: projectVenusImg,
  },
  {
    title: "Quiz Builder",
    description: "Interactive quiz competition app with real-time leaderboards, live scoring, multiple question types, and prize management for classrooms.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    features: ["Live Leaderboard", "Real-time Scoring", "Prize Management"],
    type: "EdTech App",
    gradient: "from-violet-500 to-purple-500",
    image: quizBuilderImg,
    demo_url: "http://quiz-spark-flax.vercel.app/",
  },
  {
    title: "Quiver",
    description: "Modern e-commerce platform with efficient state management, responsive design, and optimized performance for seamless shopping.",
    tech: ["Vue 3", "Pinia", "Tailwind CSS"],
    features: ["Product Catalog", "Cart Management", "Checkout Flow"],
    type: "E-commerce",
    gradient: "from-purple-500 to-pink-500",
    image: quiverImg,
  },
  {
    title: "Payment Reminder",
    description: "Automated payment reminder system helping businesses track invoices and send timely notifications to improve cash flow.",
    tech: ["React", "Node.js", "MongoDB"],
    features: ["Invoice Tracking", "Auto Reminders", "Payment Analytics"],
    type: "FinTech Tool",
    gradient: "from-orange-500 to-red-500",
    image: productdriveImg,
  },
];

const Projects = () => {
  const ref = useRef(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="section-padding pt-24 relative" ref={ref}>
        <div className="container-custom relative z-10">
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
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-widest">
              All Projects
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              Projects I've <span className="text-gradient">Built</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A complete collection of projects showcasing my expertise in building scalable, user-focused web applications.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium border border-border/50">
                      {project.type}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {(project as any).demo_url ? (
                        <motion.a
                          href={(project as any).demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 btn-gradient rounded-xl text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Demo
                        </motion.a>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 btn-gradient rounded-xl text-sm font-medium opacity-70 cursor-not-allowed"
                          disabled
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Demo
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Projects;
