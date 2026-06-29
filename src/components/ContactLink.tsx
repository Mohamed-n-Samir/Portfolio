function ContactLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-2 rounded border border-border bg-panel px-2.5 py-1.5 text-[11px] text-muted-foreground transition hover:border-accent/40 hover:text-accent"
    >
      <span className="text-accent">{icon}</span>
      {label}
    </Comp>
  );
}

export default ContactLink;
