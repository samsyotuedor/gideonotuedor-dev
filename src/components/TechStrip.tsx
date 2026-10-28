import javascriptLogo from "@/assets/skills/javascript.svg";
import typescriptLogo from "@/assets/skills/typescript.svg";
import reactLogo from "@/assets/skills/react.svg";
import nextjsLogo from "@/assets/skills/nextjs.svg";
import vueLogo from "@/assets/skills/vue.svg";
import nodeLogo from "@/assets/skills/nodejs.svg";
import tailwindLogo from "@/assets/skills/tailwind.svg";
import gitLogo from "@/assets/skills/git.svg";

const tech = [
  { name: "JavaScript", logo: javascriptLogo },
  { name: "TypeScript", logo: typescriptLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextjsLogo },
  { name: "Vue.js", logo: vueLogo },
  { name: "Node.js", logo: nodeLogo },
  { name: "Tailwind CSS", logo: tailwindLogo },
  { name: "Git", logo: gitLogo },
];

/** Slow, continuous strip of the tools Gideon works with. */
export function TechStrip() {
  const items = [...tech, ...tech];
  return (
    <section aria-label="Technologies" className="relative border-y border-border/60 bg-card/30 py-6">
      <div className="container-custom flex items-center gap-8">
        <p className="hidden md:block shrink-0 font-raleway text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Tech I work with
        </p>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
            {items.map((t, i) => (
              <div key={`${t.name}-${i}`} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <img src={t.logo} alt="" className="h-6 w-6" loading="lazy" />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
