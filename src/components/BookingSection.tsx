import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Mail, Phone, Clock, Video, MessageSquare } from "lucide-react";
import { FadeInOnScroll, StaggerContainer, staggerChildVariants } from "./ScrollAnimations";

const bookingOptions = [
  {
    title: "Quick Chat",
    duration: "15 min",
    description: "Brief intro call to discuss your project needs",
    icon: MessageSquare,
    color: "from-primary to-accent",
  },
  {
    title: "Discovery Call",
    duration: "30 min",
    description: "Deep dive into your project requirements and goals",
    icon: Video,
    color: "from-accent to-primary",
  },
  {
    title: "Technical Consultation",
    duration: "60 min",
    description: "Comprehensive technical planning session",
    icon: Calendar,
    color: "from-primary via-accent to-primary",
  },
];

export function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="container-custom relative z-10">
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
              animate={{ 
                boxShadow: isInView 
                  ? ["0 0 20px hsl(210 100% 60% / 0.2)", "0 0 40px hsl(210 100% 60% / 0.4)", "0 0 20px hsl(210 100% 60% / 0.2)"]
                  : "none"
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="inline-block w-4 h-4 mr-2" />
              Book a Meeting
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Schedule a call to discuss your project, explore collaboration opportunities, 
              or get technical guidance on your next big idea.
            </p>
          </div>
        </FadeInOnScroll>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {bookingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              variants={staggerChildVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10" 
                   style={{ background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3))` }} 
              />
              
              <div className="glass-card-strong rounded-2xl p-8 h-full border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold">{option.title}</h3>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {option.duration}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-6">{option.description}</p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl btn-gradient font-medium text-sm"
                >
                  Schedule Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Quick contact options */}
        <FadeInOnScroll>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:samsyotuedor40@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card hover:glow-primary transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span>samsyotuedor40@gmail.com</span>
            </motion.a>
            
            <motion.a
              href="tel:+2347085814726"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card hover:glow-accent transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>+234 708 581 4726</span>
            </motion.a>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}