function Field({
  label,
  type = "text",
  textarea = false,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-accent/60 focus:ring-1 focus:ring-accent/30";
  return (
    <label className="mt-3 block text-[11px] uppercase tracking-widest text-muted-foreground">
      {label}
      {textarea ? (
        <textarea rows={4} className={cls} placeholder={`// ${label.toLowerCase()}...`} />
      ) : (
        <input type={type} className={cls} placeholder={`// ${label.toLowerCase()}...`} />
      )}
    </label>
  );
}

export default Field;
