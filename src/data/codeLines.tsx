const CODE_LINES = [
  {
    indent: 0,
    content: <span className="text-muted-foreground">// Welcome to my workspace</span>,
  },
  {
    indent: 0,
    content: (
      <>
        <span className="text-[oklch(0.72_0.16_270)]">import</span> {"{ "}
        <span className="text-[oklch(0.78_0.16_145)]">Developer</span>
        {" } "}
        <span className="text-[oklch(0.72_0.16_270)]">from</span>{" "}
        <span className="text-[oklch(0.78_0.16_45)]">'./universe'</span>;
      </>
    ),
  },
  {
    indent: 0,
    content: "",
  },
  {
    indent: 0,
    content: (
      <>
        <span className="text-[oklch(0.72_0.16_270)]">const</span>{" "}
        <span className="text-[oklch(0.78_0.16_145)]">Portfolio</span> = () {"=> {"}
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.72_0.16_270)]">return</span> (
      </>
    ),
  },
  {
    indent: 4,
    content: (
      <>
        {"<"}
        <span className="text-[oklch(0.78_0.16_145)]">Developer</span>
      </>
    ),
  },
  {
    indent: 6,
    content: (
      <>
        name=
        <span className="text-[oklch(0.78_0.16_45)]">"Mohamed Samir"</span>
      </>
    ),
  },
  {
    indent: 6,
    content: (
      <>
        role=
        <span className="text-[oklch(0.78_0.16_45)]">"Full Stack Engineer"</span>
      </>
    ),
  },
  {
    indent: 6,
    content: (
      <>
        passion=
        <span className="text-[oklch(0.78_0.16_45)]">"Engineering Beyond Boundaries"</span>
      </>
    ),
  },
  {
    indent: 4,
    content: <>{"/>"}</>,
  },
  {
    indent: 2,
    content: <>);</>,
  },
  {
    indent: 0,
    content: (
      <>
        {"};"}
        <span className="type-caret" />
      </>
    ),
  },
];

const CONTACT_CODE_LINES = [
  {
    indent: 0,
    content: <>{"{"}</>,
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"status"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"open_to_work"</span>,
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"email"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"mohamed.n.work12@gmail.com"</span>,
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"socials"</span>: {"{"}
      </>
    ),
  },
  {
    indent: 4,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"github"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"@Mohamed-n-Samir"</span>,
      </>
    ),
  },
  {
    indent: 4,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"linkedin"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"@mohamed-samir-116855228"</span>,
      </>
    ),
  },

  {
    indent: 2,
    content: <>{"},"}</>,
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"location"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"Cairo, Egypt"</span>,
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-[oklch(0.78_0.16_145)]">"role"</span>:{" "}
        <span className="text-[oklch(0.78_0.16_45)]">"Full Stack Engineer"</span>,
      </>
    ),
  },
  {
    indent: 0,
    content: <>{"}"}</>,
  },
  {
    indent: 0,
    content: "",
  },
  {
    indent: 0,
    content: (
      <>
        <span className="text-muted-foreground">
          // Waiting for connection
        </span>
        <span className="type-caret" />
      </>
    ),
  },
];

export { CODE_LINES, CONTACT_CODE_LINES }
