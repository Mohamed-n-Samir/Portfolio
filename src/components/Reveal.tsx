import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
} from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  tag?: ElementType;
}

export function Reveal({ children, delay = 0, className = "", tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = tag;
  const style: CSSProperties = shown ? { animationDelay: `${delay}ms` } : { opacity: 0 };

  return (
    <Tag
      ref={ref}
      style={style}
      className={`${shown ? "reveal-in" : "reveal"} ${className}`}
    >
      {children}
    </Tag>
  );
}
