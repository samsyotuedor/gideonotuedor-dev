import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, Code2 } from "lucide-react";
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
  {
    name: "Emily Davis",
    role: "Founder, Startup Inc",
    image: null,
    initials: "ED",
    content: "From concept to deployment, Gideon delivered exceptional results. His proactive communication and technical skills made the collaboration seamless.",
    rating: 5,
  },
  {
    name: "David Wilson",
    role: "Lead Engineer, DevOps Co",
    image: null,
    initials: "DW",
    content: "Gideon brought fresh perspectives and modern solutions to our legacy systems. His code quality and documentation are outstanding.",
    rating: 5,
  },
];

const metrics = [
  { value: "35%", label: "Reduced Release Issues" },
  { value: "25%", label: "Faster Development" },
  { value: "40%", label: "Improved Load Times" },
  { value: "20%", label: "Increased Engagement" },
];

// Duplicate testimonials for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[350px] md:w-[400px]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="glass-card-strong rounded-2xl p-6 md:p-8 h-full border border-border/50 group-hover:border-primary/30 transition-all duration-300 relative">
        {/* Quote icon */}
        <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 text-primary/20" />
        
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        
        {/* Content */}
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
          "{testimonial.content}"
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xs md:text-sm font-bold text-primary-foreground">
              {testimonial.initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <div className="text-center mb-12 md:mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-4"
            >
              <Code2 className="w-4 h-4" />
              Key Results & Metrics
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Impact That <span className="text-gradient">Matters</span>
            </h2>
          </div>
        </FadeInOnScroll>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={staggerChildVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-card-strong rounded-xl md:rounded-2xl p-4 md:p-6 text-center border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <motion.p 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {metric.value}
              </motion.p>
              <p className="text-muted-foreground text-xs md:text-sm">{metric.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Testimonials Marquee */}
        <FadeInOnScroll>
          <div className="text-center mb-8 md:mb-12">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-accent mb-4"
            >
              <Quote className="w-4 h-4" />
              Testimonials
            </motion.span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              What People <span className="text-gradient">Say</span>
            </h3>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              (Placeholder testimonials - Add real ones later)
            </p>
          </div>
        </FadeInOnScroll>

        {/* Scrolling Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient fade on left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          
          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Marquee container */}
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{
              x: [0, -50 * duplicatedTestimonials.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
