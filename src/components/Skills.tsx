import Section from "@/components/Section";
import { SKILLS } from "@/data/skills";

function Skills() {
  return (
    <Section id="skills" title="# Skills.json" subtitle="// modules currently loaded into the runtime">
      <div className="grid gap-4 md:grid-cols-2">
        {SKILLS.map((g) => (
          <div key={g.title} className="panel lift lift-hover p-5">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <span className={`font-semibold ${g.color}`}>{g.title}</span>
              <span className="text-xs text-muted-foreground">{g.items.length} modules</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-panel-2 px-3 py-1.5 text-xs transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills