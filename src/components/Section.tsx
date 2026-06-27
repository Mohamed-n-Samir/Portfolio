import { Reveal } from "@/components/Reveal";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <Reveal>
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            <span className="text-accent">{title.split(" ")[0]}</span>{" "}
            {title.split(" ").slice(1).join(" ")}
          </h2>
          {subtitle && <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </Reveal>
      <Reveal delay={120}>{children}</Reveal>
    </section>
  );
}

export default Section