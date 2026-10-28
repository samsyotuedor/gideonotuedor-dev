import { Link } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/samsyotuedor", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/gideon-otuedor-92447b212", label: "LinkedIn" },
  { icon: Mail, href: "mailto:samsyotuedor40@gmail.com", label: "Email" },
];

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 pt-14 pb-8">
      <div className="container-custom">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold">
              <img src="/favicon.png" alt="" className="h-8 w-8 rounded-lg" />
              <span className="text-gradient">GO</span>
              <span className="-ml-2 text-foreground">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Software Developer &amp; CTO building scalable, user-focused products from Lagos, Nigeria.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Pages</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/80 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Connect</p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="rounded-full border border-border p-2.5 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} Gideon Otuedor. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
