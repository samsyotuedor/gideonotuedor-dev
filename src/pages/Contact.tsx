import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Globe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EarthCanvas } from "@/components/canvas";

const Contact = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:samsyotuedor40@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
    toast.success("Opening your email client...");
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/samsyotuedor",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/gideon-otuedor-92447b212",
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: "https://devcraftbygideon.vercel.app",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="section-padding pt-24 relative" ref={ref}>
        {/* Background decoration */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute left-0 top-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
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
            className="mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
              Contact<span className="text-gradient">.</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name.
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="What's your name?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Your Email.
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="What's your email?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Your Message.
                  </label>
                  <textarea
                    id="message"
                    required
                    maxLength={1000}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-4 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="What do you want to say?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg btn-gradient font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass-card rounded-xl hover:glow-primary transition-all duration-300"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </form>
            </motion.div>

            {/* 3D Earth Globe */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="h-[400px] md:h-[500px] lg:h-[550px] w-full"
            >
              <EarthCanvas />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
