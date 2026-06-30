import { ExternalLink, Terminal, Play, Folder, ChevronDown } from "lucide-react";
import { GithubIcon } from "./icons/lucide-github";
import TypingBlock from "@/components/TypingBlock";
import WindowBar from "./WindowBar";
import CodeLine from "@/components/CodeLine";
import {CODE_LINES} from "@/data/codeLines";
import { loaded_modules } from "@/data/skills";

function Hero() {
  return (
    <section id="home" className="relative grid gap-10 py-20 min-[875px]:grid-cols-2 min-[875px]:py-28">
      <div className="absolute right-6 top-6 font-mono text-xs text-muted-foreground/50">
        {"<System.Init />"}
      </div>
      <div className="absolute bottom-6 left-2 font-mono text-xs text-muted-foreground/40">
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
          <span className="text-gradient-hero">Mohamed Samir (IT)</span>
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
          {loaded_modules.map((m) => (
            <span
              key={m}
              className="rounded-md border border-accent/30 bg-accent/5 px-2 py-1 text-[10px] uppercase tracking-wider text-accent"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-w-0">
        <div className="panel overflow-hidden shadow-2xl shadow-black/40">
          <WindowBar title="portfolio.tsx"/>
          <pre className="overflow-auto bg-[oklch(0.11_0.01_250)] p-5 text-[12.5px] leading-6">
            <TypingBlock className="font-mono">
              {CODE_LINES.map((line, index) => (
                <CodeLine key={index} n={index + 1}>
                  <span className="inline-block" style={{ paddingLeft: `${line.indent}ch` }}>
                    {line.content}
                  </span>
                </CodeLine>
              ))}
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
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}

export default Hero;
