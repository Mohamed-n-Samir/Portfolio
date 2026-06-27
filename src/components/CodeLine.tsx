function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="mr-4 w-6 select-none text-right text-muted-foreground/50">{n}</span>
      <span className="flex-1 whitespace-pre">{children}</span>
    </div>
  );
}

export default CodeLine
