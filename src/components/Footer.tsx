function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-[11px] text-muted-foreground">
      <p>
        <span className="text-accent">$</span> echo "Built with React + Vite. Designed in the
        terminal." — © {new Date().getFullYear()} Mohamed Samir
      </p>
    </footer>
  );
}

export default Footer;
