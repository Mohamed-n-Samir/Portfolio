import { useEffect, useRef, useState, type ReactNode } from "react";

function TypingBlock({
  children,
  className = "",
  as: Tag = "code",
}: {
  children: ReactNode;
  className?: string;
  as?: "code" | "div";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag;

  return <Comp ref={ref} className={`type-seq ${play ? "play" : ""} ${className}`}>{children}</Comp>;
}

export default TypingBlock;
