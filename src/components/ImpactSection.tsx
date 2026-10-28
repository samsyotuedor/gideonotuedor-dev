import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const metrics = [
  { value: "35%", label: "Fewer release issues", detail: "CI/CD pipelines at Complustech" },
  { value: "25%", label: "Faster development", detail: "Shared design system" },
  { value: "40%", label: "Faster load times", detail: "Venus learning platform" },
  { value: "20%", label: "More user engagement", detail: "Product UX improvements" },
];

export function ImpactSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom relative z-10">
        <SectionHeading
          index="04"
          eyebrow="Results"
          title={
            <>
              Impact that <span className="text-gradient">matters</span>
            </>
          }
          description="Measurable outcomes from products and teams I've led."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-card p-6 md:p-8"
            >
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">{m.value}</p>
              <p className="mt-3 font-medium text-foreground">{m.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
