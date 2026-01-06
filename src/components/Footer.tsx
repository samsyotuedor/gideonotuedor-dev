import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/samsyotuedor",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/gideon-otuedor-92447b212",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:samsyotuedor40@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.02 }}
          >
            GO<span className="text-foreground">.</span>
          </motion.a>

          {/* Made with love */}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            © {currentYear} Gideon Otuedor. Lagos, Nigeria
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-foreground hover:glow-primary transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
