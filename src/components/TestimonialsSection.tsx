import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, Code2 } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechStartup",
    initials: "JD",
    content: "Gideon's technical expertise and leadership transformed our development process. His work on our platform significantly improved our user engagement metrics.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager, Fintech Co",
    initials: "SJ",
    content: "Working with Gideon was a game-changer. His attention to detail and understanding of user experience helped us deliver a product our customers love.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO, Digital Agency",
    initials: "MC",
    content: "Gideon's ability to mentor the team while delivering high-quality code is remarkable. He elevated our entire engineering culture.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Founder, Startup Inc",
    initials: "ED",
    content: "From concept to deployment, Gideon delivered exceptional results. His proactive communication and technical skills made the collaboration seamless.",
    rating: 5,
  },
  {
    name: "David Wilson",
    role: "Lead Engineer, DevOps Co",
    initials: "DW",
    content: "Gideon brought fresh perspectives and modern solutions to our legacy systems. His code quality and documentation are outstanding.",
    rating: 5,
  },
];


const duplicatedTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[320px] md:w-[380px]">
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8 h-full hover:border-primary/20 transition-all duration-300 relative">
        <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 text-primary/10" />
        
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
          "{testimonial.content}"
        </p>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs md:text-sm font-bold text-primary">
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
      <div className="container-custom relative z-10">
        {/* Testimonials */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 text-sm font-medium text-accent mb-4"
          >
            <Quote className="w-4 h-4" />
            Testimonials
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold"
          >
            What People <span className="text-gradient">Say</span>
          </motion.h3>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
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
