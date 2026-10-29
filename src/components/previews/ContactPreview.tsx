import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Mail, value: "samsyotuedor40@gmail.com", href: "mailto:samsyotuedor40@gmail.com" },
  { icon: Phone, value: "+234 708 581 4726", href: "tel:+2347085814726" },
  { icon: MapPin, value: "Lagos, Nigeria", href: null as string | null },
];

export function ContactPreview() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 md:px-14 md:py-20"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
                Have a project in mind?{" "}
                <span className="text-gradient">Let's build it.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                I'm open to full-time roles, consulting and product collaborations.
                Tell me what you're working on.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3.5 font-medium shadow-lg shadow-primary/20"
                >
                  Send a message
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:samsyotuedor40@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 font-medium text-foreground hover:border-primary/40 transition-colors"
                >
                  <Mail size={18} />
                  Email me
                </a>
              </div>
            </div>

            <ul className="space-y-4 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {contactInfo.map((item) => (
                <li key={item.value} className="flex items-center gap-3 text-foreground">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
