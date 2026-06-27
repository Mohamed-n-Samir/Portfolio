import { Terminal } from "lucide-react";

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Blogs", "#blogs"],
  ["Contact", "#contact"],
] as const;

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-display text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent/15 text-accent">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-semibold">
            Mohamed<span className="text-accent">.</span>Samir
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-panel hover:text-foreground"
            >
              <span className="text-accent">{">"}</span> {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/20"
        >
          hire_me()
        </a>
      </div>
    </header>
  );
}

export default Navbar;
