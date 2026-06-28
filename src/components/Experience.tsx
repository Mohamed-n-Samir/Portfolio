import Section from "@/components/Section";
import { EXPERIENCE } from "@/data/experience";
import { GitBranch } from "lucide-react";

function Experience() {
  return (
    <Section id="experience" title="$ git log --stat --oneline">
      <ol className="relative space-y-6 border-l border-border pl-6">
        {EXPERIENCE.map((e) => (
          <li key={e.hash} className="relative">
            <span className="absolute -left-[33px] top-2 grid h-5 w-5 place-items-center rounded-full border border-accent/40 bg-background">
              <GitBranch className="h-3 w-3 text-accent" />
            </span>
            <div className="panel overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-panel-2 px-5 py-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-accent">{e.hash}</span>
                  <span className="text-muted-foreground">HEAD {"->"}</span>
                  <span className="rounded bg-accent/15 px-2 py-0.5 text-accent">{e.branch}</span>
                </div>
                <span className="text-muted-foreground">{e.period}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">
                  {e.role} <span className="text-muted-foreground">@ {e.org}</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded border border-border bg-panel-2 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-4 text-[11px] font-mono">
                  <span className="text-muted-foreground">{e.diff.files} files changed</span>
                  <span className="text-accent-2">+{e.diff.add} insertions</span>
                  <span className="text-[oklch(0.7_0.2_25)]">-{e.diff.del} deletions</span>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className="relative pl-2 text-xs text-muted-foreground">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-border bg-background" />
          Initial Commit (Hello World)
        </li>
      </ol>
    </Section>
  );
}

export default Experience