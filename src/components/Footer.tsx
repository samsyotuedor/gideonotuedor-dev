import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/samsyotuedor", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/gideon-otuedor-92447b212", label: "LinkedIn" },
    { icon: Mail, href: "mailto:samsyotuedor40@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <motion.a
            href="#"
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.02 }}
          >
            GO<span className="text-foreground">.</span>
          </motion.a>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Gideon Otuedor. Lagos, Nigeria
          </p>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl border border-border/50 bg-card/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
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
