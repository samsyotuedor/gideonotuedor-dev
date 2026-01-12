import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Globe, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
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

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "samsyotuedor40@gmail.com",
      href: "mailto:samsyotuedor40@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 708 581 4726",
      href: "tel:+2347085814726",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lagos, Nigeria",
      href: null,
    },
  ];

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

          {/* Main Layout: Form on Left, Earth on Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 lg:p-10 border border-border/30"
            >
              <span className="text-primary/80 font-medium text-sm italic">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-8">
                Contact.
              </h1>
              
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
              </form>
            </motion.div>

            {/* 3D Earth Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-[400px] md:h-[500px] lg:h-[600px] w-full"
            >
              <EarthCanvas />
            </motion.div>
          </div>

          {/* Contact Info & Social Links Section Below */}
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-8 border border-border/30"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card rounded-2xl p-8 border border-border/30"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">
                Connect with Me
              </h2>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5 text-muted-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
