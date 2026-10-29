import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  link?: { to: string; label: string };
}

/** Shared editorial header used by every home page section. */
export function SectionHeading({ index, eyebrow, title, description, link }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link
          to={link.to}
          className="group inline-flex shrink-0 items-center gap-2 self-start md:self-auto rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          {link.label}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );
}
