import Section from "@/components/Section";
import WindowBar from "@/components/WindowBar";
import profileImage from "@/assets/photos/profile.jpeg";
import { HEADLINE, META_DATA, STATS, WHOAMI, EXPERTISE, PHILOSOPHY } from "@/data/about";

function About() {
  return (
    <Section id="about" title="# About.system">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left Card */}
        <div className="panel p-6">
          <div className="relative mx-auto aspect-square max-w-[400px] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent/20 via-accent/10 to-transparent">
            <img
              src={profileImage}
              alt="Mohamed Samir"
              className="w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>

          <div className="mt-5 rounded-lg border border-border bg-panel-2 p-4">
            <h3 className="font-display text-lg font-semibold">Mohamed Samir</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {HEADLINE}
            </p>
          </div>

          <dl className="mt-5 space-y-3 text-xs">
            {META_DATA.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0"
              >
                <dt className="text-muted-foreground">{key}</dt>

                <dd className="font-semibold text-accent">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right Card */}
        <div className="panel overflow-hidden">
          <WindowBar title="user_profile.log" />

          <div className="space-y-6 p-6 text-sm leading-7">
            <div>
              <p className="font-mono text-accent">$ whoami</p>

              <p className="mt-2 text-muted-foreground">
                {WHOAMI}
              </p>
            </div>

            <div>
              <p className="font-mono text-accent">$ cat expertise.txt</p>

              <p className="mt-2 text-muted-foreground">
                {EXPERTISE}
              </p>
            </div>

            <div>
              <p className="font-mono text-accent">$ cat philosophy.md</p>

              <p className="mt-2 text-muted-foreground">
                {PHILOSOPHY}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
              {STATS.map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-xl border border-border bg-panel-2 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="font-display text-2xl font-bold text-accent">{value}</div>

                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
export default About;
