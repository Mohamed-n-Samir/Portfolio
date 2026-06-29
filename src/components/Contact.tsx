import Section from "@/components/Section";
import WindowBar from "@/components/WindowBar";
import TypingBlock from "@/components/TypingBlock";
import CodeLine from "@/components/CodeLine";
import { CONTACT_CODE_LINES } from "@/data/codeLines";
import ContactLink from "@/components/ContactLink";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { GithubIcon } from "./icons/lucide-github";
import { LinkedinIcon } from "./icons/lucide-linkedin";
import Field from "@/components/Field";


function Contact() {
  return (
    <Section id="contact" title="$ ./contact.exe">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel overflow-hidden">
          <WindowBar title="contact_info.json" />
          <pre className="overflow-auto bg-[oklch(0.11_0.01_250)] p-5 text-[12.5px] leading-6">
            <TypingBlock className="font-mono">
              {CONTACT_CODE_LINES.map((line, index) => (
                <CodeLine key={index} n={index + 1}>
                  <span className="inline-block" style={{ paddingLeft: `${line.indent}ch` }}>
                    {line.content}
                  </span>
                </CodeLine>
              ))}
            </TypingBlock>
          </pre>
          <div className="grid grid-cols-2 gap-2 border-t border-border bg-panel-2 p-3">
            <ContactLink icon={<Mail className="h-3.5 w-3.5" />} label="mohamed.n.work12@gmail.com" href="mailto:mohamed.n.work12@gmail.com" />
            <ContactLink icon={<MapPin className="h-3.5 w-3.5" />} label="Cairo, EG" />
            <ContactLink icon={<GithubIcon className="h-3.5 w-3.5" />} label="@Mohamed-n-Samir" href="https://github.com/Mohamed-n-Samir" />
            <ContactLink icon={<LinkedinIcon className="h-3.5 w-3.5" />} label="@mohamed-samir-116855228" href="www.linkedin.com/in/mohamed-samir-116855228" />
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="panel flex flex-col p-6"
        >
          <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">TS</span>
              <span className="text-sm font-semibold">sendMessage.ts</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-accent-2">secure channel</span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-[11px]">
            <div className="rounded border border-border bg-panel-2 px-3 py-2">
              <div className="text-muted-foreground">to:</div>
              <div className="text-accent">mohamed.n.work12@gmail.com</div>
            </div>
            <div className="rounded border border-border bg-panel-2 px-3 py-2">
              <div className="text-muted-foreground">response:</div>
              <div className="text-accent-2">within 24h</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" />
            <Field label="Email" type="email" />
          </div>
          <Field label="Subject" />
          <Field label="Message" textarea />

          <p className="mt-3 text-[10px] text-muted-foreground">
            // Protected by spam filters and rate limits
          </p>
          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/25"
          >
            Send Message <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Section>
  );
}

export default Contact