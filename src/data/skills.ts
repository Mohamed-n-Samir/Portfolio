const loaded_modules = ["React", "Next.js", "Node.js", "TypeScript", "Java", "Spring"];
const skills: Array<{ title: string; color: string; items: string[] }> = [
  {
    title: "frontend/",
    color: "text-accent",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Redux"],
  },
  {
    title: "backend/",
    color: "text-accent-2",
    items: ["Node.js", "NestJS", "Spring Boot", "Express", "GraphQL", "REST"],
  },
  {
    title: "data/",
    color: "text-accent-3",
    items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "ScyllaDB", "Prisma"],
  },
  {
    title: "infra/",
    color: "text-warning",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Nginx", "Linux"],
  },
];

export { skills, loaded_modules };
