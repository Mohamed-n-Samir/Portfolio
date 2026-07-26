import { useState } from "react";
import { Link, useParams, Navigate } from "react-router";
import { ArrowLeft, Calendar, Clock, Copy, ArrowUp, Pin, Sparkles } from "lucide-react";
import { getPostBySlug } from "@/lib/blogs";
import { parseMarkdownToSections, renderInlineElements } from "@/lib/markdown";

const getAssetUrl = (path: string) => {
  if (path.startsWith("/")) {
    const baseUrl = import.meta.env.BASE_URL || "/";
    return `${baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl}${path}`;
  }
  return path;
};

function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [copied, setCopied] = useState(false);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const sections = parseMarkdownToSections(post.content);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-panel-2 hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Blogs
        </Link>

        {post.pinned && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-accent">
            <Pin className="h-3 w-3" /> Pinned
          </span>
        )}
      </div>

      {/* Main Cover Banner */}
      <div className="relative mb-10 overflow-hidden panel min-h-[300px] md:min-h-[380px] flex items-end p-6 md:p-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl(post.image)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/55 z-10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 w-full">
          <div className="mb-4 flex flex-wrap gap-2 text-[10px] md:text-xs font-mono">
            <span className="flex items-center gap-1.5 rounded bg-background/80 backdrop-blur border border-border px-2.5 py-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-accent" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 rounded bg-background/80 backdrop-blur border border-border px-2.5 py-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-accent" /> {post.readTime}
            </span>
            {post.pinned && (
              <span className="flex items-center gap-1.5 rounded bg-accent/95 px-2.5 py-1 text-black font-semibold uppercase tracking-wider">
                <Pin className="h-3.5 w-3.5" /> Pinned
              </span>
            )}
          </div>

          <h1 className="font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {post.desc}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Left Side: Article Body Content (Divided into Sections) */}
        <div className="panel p-6 md:p-8 space-y-8 h-fit">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="blog-section">
              {section.header && (
                <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="text-accent">#</span>
                  {section.header}
                </h2>
              )}

              <div className="space-y-4">
                {section.contentBlocks.map((block, bIdx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={bIdx}
                        className="text-xs md:text-sm text-muted-foreground leading-relaxed"
                      >
                        {renderInlineElements(block.text || "")}
                      </p>
                    );
                  }
                  if (block.type === "code") {
                    return (
                      <div key={bIdx} className="panel overflow-hidden my-4">
                        {block.language && (
                          <div className="flex items-center justify-between border-b border-border bg-panel-2 px-4 py-1.5 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                            <span>{block.language}</span>
                          </div>
                        )}
                        <pre className="p-4 overflow-x-auto font-mono text-[11px] md:text-xs text-foreground bg-panel">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul
                        key={bIdx}
                        className="list-disc pl-5 space-y-2 text-xs md:text-sm text-muted-foreground"
                      >
                        {block.items?.map((item, iIdx) => (
                          <li key={iIdx}>{renderInlineElements(item)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Visual Divider (Styled Break tag) between sections */}
              {sIdx < sections.length - 1 && (
                <div className="pt-8">
                  <br className="border-t border-border/25 block my-2 content-none" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Reader Controls Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24 panel p-5 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-accent uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Reader Controls</span>
            </div>

            <p className="text-xs font-semibold text-foreground leading-snug line-clamp-3">
              {post.title}
            </p>

            <div className="border-t border-border pt-4 space-y-2 font-mono">
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-[11px] text-accent transition-colors hover:bg-accent/20 cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy Article Link"}
              </button>

              <button
                onClick={handleScrollToTop}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-[11px] text-muted-foreground transition-colors hover:bg-panel-2 hover:text-foreground cursor-pointer"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                Scroll To Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetail;
