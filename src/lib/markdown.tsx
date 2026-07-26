import React from "react";

export interface BlogPostMetadata {
  title: string;
  date: string;
  readTime: string;
  pinned: boolean;
  tags: string[];
  desc: string;
  image: string;
}

export interface MarkdownBlock {
  type: "paragraph" | "code" | "list";
  text?: string;
  items?: string[]; // for lists
  language?: string; // for code blocks
  code?: string; // for code blocks
}

export interface MarkdownSection {
  header: string;
  headerLevel: number;
  contentBlocks: MarkdownBlock[];
}

// Simple frontmatter parser
export function parseFrontmatter(rawContent: string): {
  metadata: BlogPostMetadata;
  content: string;
} {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const defaultMetadata: BlogPostMetadata = {
    title: "Untitled Post",
    date: "",
    readTime: "1 min read",
    pinned: false,
    tags: [],
    desc: "",
    image: "",
  };

  if (!match) {
    return { metadata: defaultMetadata, content: rawContent };
  }

  const frontmatterBlock = match[1];
  const content = rawContent.slice(match[0].length);
  const metadata = { ...defaultMetadata } as Record<string, string | boolean | string[]>;

  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    const val = line.slice(colonIndex + 1).trim();

    if (val.startsWith("[") && val.endsWith("]")) {
      metadata[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    } else if (val === "true") {
      metadata[key] = true;
    } else if (val === "false") {
      metadata[key] = false;
    } else {
      metadata[key] = val.replace(/^['"]|['"]$/g, "");
    }
  });

  return { metadata: metadata as unknown as BlogPostMetadata, content };
}

// Parse markdown into sections based on headers (# , ## , ### )
export function parseMarkdownToSections(content: string): MarkdownSection[] {
  const lines = content.split(/\r?\n/);
  const sections: MarkdownSection[] = [];
  
  let currentSection: MarkdownSection = {
    header: "",
    headerLevel: 0,
    contentBlocks: [],
  };

  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];
  let currentListItems: string[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      currentSection.contentBlocks.push({
        type: "list",
        items: [...currentListItems],
      });
      currentListItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        currentSection.contentBlocks.push({
          type: "code",
          code: codeLines.join("\n"),
          language: codeLanguage || "code",
        });
        codeLines = [];
        codeLanguage = "";
      } else {
        // Start of code block
        flushList();
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Handle headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      flushList();
      
      // If the current section has content or a header, push it
      if (currentSection.header || currentSection.contentBlocks.length > 0) {
        sections.push(currentSection);
      }

      currentSection = {
        header: headerMatch[2].trim(),
        headerLevel: headerMatch[1].length,
        contentBlocks: [],
      };
      continue;
    }

    // Handle lists (markdown list item start with - or * or 1. )
    const listMatch = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
    if (listMatch) {
      currentListItems.push(listMatch[1].trim());
      continue;
    }

    // If it's a blank line, it breaks lists and separates paragraphs
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // Otherwise, it's a paragraph
    flushList();
    currentSection.contentBlocks.push({
      type: "paragraph",
      text: line.trim(),
    });
  }

  flushList();
  
  // Push the final section
  if (currentSection.header || currentSection.contentBlocks.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

// Helper to render inline elements (**bold**, [text](url))
export function renderInlineElements(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let keyIdx = 0;

  while (currentText.length > 0) {
    const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
    const linkMatch = currentText.match(/\[(.*?)\]\((.*?)\)/);

    const boldIndex = boldMatch && boldMatch.index !== undefined ? boldMatch.index : -1;
    const linkIndex = linkMatch && linkMatch.index !== undefined ? linkMatch.index : -1;

    if (boldIndex === -1 && linkIndex === -1) {
      parts.push(currentText);
      break;
    }

    if (boldIndex !== -1 && (linkIndex === -1 || boldIndex < linkIndex)) {
      if (boldIndex > 0) {
        parts.push(currentText.substring(0, boldIndex));
      }
      parts.push(
        <strong key={`b-${keyIdx++}`} className="font-semibold text-accent">
          {boldMatch![1]}
        </strong>
      );
      currentText = currentText.substring(boldIndex + boldMatch![0].length);
    } else {
      if (linkIndex > 0) {
        parts.push(currentText.substring(0, linkIndex));
      }
      const linkText = linkMatch![1];
      const linkUrl = linkMatch![2];
      
      parts.push(
        <a
          key={`l-${keyIdx++}`}
          href={linkUrl}
          target={linkUrl.startsWith("http") ? "_blank" : undefined}
          rel={linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-accent underline hover:text-accent/80 transition-colors"
        >
          {linkText}
        </a>
      );
      currentText = currentText.substring(linkIndex + linkMatch![0].length);
    }
  }

  return parts;
}
