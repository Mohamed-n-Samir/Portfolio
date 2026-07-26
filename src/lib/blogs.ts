import { parseFrontmatter } from "./markdown";
import type { BlogPostMetadata } from "./markdown";

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
}

// Dynamically load all markdown files from src/data/blogs
const rawBlogModules = import.meta.glob("/src/data/blogs/*.md", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

const posts: BlogPost[] = [];

// Parse and compile all markdown files into blog posts
Object.entries(rawBlogModules).forEach(([filePath, module]) => {
  const fileContent = module.default;
  const { metadata, content } = parseFrontmatter(fileContent);

  // Extract slug from file path (e.g. /src/data/blogs/my-post.md -> my-post)
  const fileName = filePath.split("/").pop() || "";
  const slug = fileName.replace(/\.md$/, "");

  posts.push({
    slug,
    content,
    ...metadata,
  });
});

// Helper to convert date strings like "Apr 17, 2026" to timestamps for sorting
function getDateTimestamp(dateStr: string): number {
  try {
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
  } catch {
    return 0;
  }
}

// Sort posts: Pinned posts first, then by date descending
const sortedPosts = [...posts].sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  return getDateTimestamp(b.date) - getDateTimestamp(a.date);
});

export function getAllPosts(): BlogPost[] {
  return sortedPosts;
}


export function getAllPinnedPosts(): BlogPost[] {
  return sortedPosts.filter(post => post.pinned);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return sortedPosts.find((p) => p.slug === slug);
}

export const getAssetUrl = (path: string) => {
  if (path.startsWith("/")) {
    const baseUrl = import.meta.env.BASE_URL || "/";
    return `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${path}`;
  }
  return path;
};