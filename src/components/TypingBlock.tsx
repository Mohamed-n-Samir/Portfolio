import { type ReactNode } from "react";

function TypingBlock({
  children,
  className = "",
  as: Tag = "code",
}: {
  children: ReactNode;
  className?: string;
  as?: "code" | "div";
}) {
  const Comp = Tag as "div";

  return <Comp className={`${className}`}>{children}</Comp>;
}

export default TypingBlock;
