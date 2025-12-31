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
    <footer className="py-12 border-t border-border relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#"
              className="text-2xl font-bold text-gradient inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              GO<span className="text-foreground">.</span>
            </motion.a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Gideon Otuedor. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            in Lagos, Nigeria
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
