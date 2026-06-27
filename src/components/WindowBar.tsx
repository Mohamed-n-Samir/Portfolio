function WindowBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-panel-2 px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.2_25)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_90)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)]" />
      </div>
      <span className="text-xs text-muted-foreground">{title}</span>
      <span className="w-10" />
    </div>
  );
}

export default WindowBar