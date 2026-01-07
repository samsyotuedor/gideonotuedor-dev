import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { FadeInOnScroll, StaggerContainer, staggerChildVariants } from "./ScrollAnimations";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechStartup",
    image: null,
    initials: "JD",
    content: "Gideon's technical expertise and leadership transformed our development process. His work on our platform significantly improved our user engagement metrics.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager, Fintech Co",
    image: null,
    initials: "SJ",
    content: "Working with Gideon was a game-changer. His attention to detail and understanding of user experience helped us deliver a product our customers love.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO, Digital Agency",
    image: null,
    initials: "MC",
    content: "Gideon's ability to mentor the team while delivering high-quality code is remarkable. He elevated our entire engineering culture.",
    rating: 5,
  },
];

const metrics = [
  { value: "35%", label: "Reduced Release Issues" },
  { value: "25%", label: "Faster Development" },
  { value: "40%", label: "Improved Load Times" },
  { value: "20%", label: "Increased Engagement" },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-20 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Metrics section */}
        <FadeInOnScroll>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            >
              Key Results & Metrics
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Impact That <span className="text-gradient">Matters</span>
            </h2>
          </div>
        </FadeInOnScroll>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={staggerChildVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-card-strong rounded-2xl p-6 text-center border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <motion.p 
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {metric.value}
              </motion.p>
              <p className="text-muted-foreground text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Testimonials */}
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-accent mb-4"
            >
              <Quote className="inline-block w-4 h-4 mr-2" />
              Testimonials
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-bold">
              What People <span className="text-gradient">Say</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              (Placeholder testimonials - Add real ones later)
            </p>
          </div>
        </FadeInOnScroll>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={staggerChildVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="glass-card-strong rounded-2xl p-8 h-full border border-border/50 group-hover:border-primary/30 transition-all duration-300 relative">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}