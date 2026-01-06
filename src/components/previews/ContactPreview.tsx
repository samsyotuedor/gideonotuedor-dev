import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin } from "lucide-react";

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
  { icon: Github, href: "https://github.com/samsyotuedor" },
  { icon: Linkedin, href: "https://linkedin.com/in/gideon-otuedor-92447b212" },
];

export function ContactPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card gradient-border rounded-2xl p-8"
          >
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-3 glass-card rounded-xl hover:glow-primary transition-all"
                >
                  <link.icon className="w-5 h-5 text-muted-foreground" />
                </motion.a>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 btn-gradient rounded-xl font-medium"
              >
                <Mail size={18} />
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Go to contact page
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
