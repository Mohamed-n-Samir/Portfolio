import Section from "@/components/Section";
import { Folder, ExternalLink, Star, GitFork, ArrowRight } from "lucide-react";
import PROJECTS from "@/data/projects";

function Projects() {
  return (
    <Section id="projects" title="$ ls -la ~/projects" subtitle="// pinned repositories">
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group panel lift lift-hover flex flex-col p-5 hover:border-accent/40"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-accent" />
                <h3 className="font-semibold group-hover:text-accent">{p.name}</h3>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
            </div>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded border border-border bg-panel-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5 border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {p.lang}
              </span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {p.stars}</span>
              <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {p.forks}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href="https://github.com/Momin-786"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-4 py-2 text-xs hover:border-accent/40 hover:text-accent"
        >
          View all repositories <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </Section>
  );
}

export default Projects