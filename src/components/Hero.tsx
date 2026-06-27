import { ExternalLink, Terminal, Play, Folder, ChevronDown } from "lucide-react";
import { GithubIcon } from "./icons/lucide-github";
import TypingBlock from "@/components/TypingBlock";

function Hero() {
  return (
    <section id="home" className="relative grid gap-10 py-20 md:grid-cols-2 md:py-28">
      <div className="absolute right-6 top-6 hidden font-mono text-xs text-muted-foreground/50 md:block">
        {"<System.Init />"}
      </div>
      <div className="absolute bottom-6 left-2 hidden font-mono text-xs text-muted-foreground/40 md:block">
        while(alive) {"{ code() }"}
      </div>

      <div className="flex flex-col justify-center">
        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-widest text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          SYSTEM.KERNEL :: v2.5.0 ONLINE
        </span>

        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Hello, I'm
          <br />
          <span className="text-gradient-hero">Mohamed Samir</span>
        </h1>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          <span className="text-accent">{"<Architect />"}</span> Engineering Beyond Boundaries.
          Specializing in distributed systems, real-time architecture, and high-performance
          applications.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group flex min-w-[220px] items-center justify-between rounded-lg border border-accent/40 bg-gradient-to-br from-accent/15 to-transparent px-4 py-3 glow-orange transition hover:from-accent/25"
          >
            <span className="flex items-center gap-3">
              <Terminal className="h-4 w-4 text-accent" />
              <span className="text-left">
                <span className="block text-sm font-semibold">Initialize OS</span>
                <span className="block text-[10px] text-muted-foreground">{">"} sudo boot_gui</span>
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-accent transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://github.com/Mohamed-n-Samir"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-panel px-4 py-3 text-sm transition hover:border-accent/40"
          >
            <GithubIcon className="h-4 w-4 text-accent" />
            <span className="text-left">
              <span className="block text-[10px] text-muted-foreground">Check out</span>
              <span className="block font-semibold">GitHub</span>
            </span>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            LOADED_MODULES:
          </span>
          {["React", "Next.js", "Node.js", "TypeScript", "Java", "Spring"].map((m) => (
            <span
              key={m}
              className="rounded-md border border-accent/30 bg-accent/5 px-2 py-1 text-[10px] uppercase tracking-wider text-accent"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="panel overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-border bg-panel-2 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.2_25)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_90)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)]" />
            </div>
            <span className="text-xs text-muted-foreground">portfolio.tsx</span>
            <span className="w-10" />
          </div>
          <pre className="overflow-auto bg-[oklch(0.11_0.01_250)] p-5 text-[12.5px] leading-6">
            <TypingBlock className="font-mono">
              <span className="text-muted-foreground">// Welcome to my workspace</span>
              <span className="text-[oklch(0.72_0.16_270)]">import</span> {"{ "}
              <span className="text-[oklch(0.78_0.16_145)]">Developer</span>
              {" }"} <span className="text-[oklch(0.72_0.16_270)]">from</span>{" "}
              <span className="text-[oklch(0.78_0.16_45)]">'./universe'</span>;
              <span className="text-[oklch(0.72_0.16_270)]">const</span>{" "}
              <span className="text-[oklch(0.78_0.16_145)]">Portfolio</span> = () {"=> {"}
              <span className="text-[oklch(0.72_0.16_270)]">return</span> ({"<"}
              <span className="text-[oklch(0.78_0.16_145)]">Developer</span>
              name=<span className="text-[oklch(0.78_0.16_45)]">"Mohamed Samir"</span>
              role=<span className="text-[oklch(0.78_0.16_45)]">"Full Stack Engineer"</span>
              passion=
              <span className="text-[oklch(0.78_0.16_45)]">"Engineering Beyond Boundaries"</span>
              {"/>"}
              );
              {"};"}
              <span className="type-caret" />
            </TypingBlock>
          </pre>
          <div className="flex gap-2 border-t border-border bg-panel-2 px-4 py-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-md bg-accent/15 px-3 py-1.5 text-xs text-accent hover:bg-accent/25"
            >
              <Play className="h-3 w-3" /> Run Profile
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Folder className="h-3 w-3" /> View Projects
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

export default Hero;
