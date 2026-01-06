import { motion } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import churchplusImg from "@/assets/projects/churchplus.png";
import projectVenusImg from "@/assets/projects/project-venus.png";
import productdriveImg from "@/assets/projects/productdrive.png";
import quiverImg from "@/assets/projects/quiver.png";

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
        {/* Background */}
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

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
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
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
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="glass-card gradient-border rounded-2xl overflow-hidden h-full">
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium border border-border/50">
                      {project.type}
                    </div>

                    {/* Decorative Icon */}
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <Layers className="w-16 h-16 text-foreground" />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-gradient transition-all">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 btn-gradient rounded-xl text-sm font-medium transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Demo
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 glass-card rounded-xl hover:glow-primary transition-all"
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
