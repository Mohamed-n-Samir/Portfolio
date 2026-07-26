import { Link } from "react-router";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Pin, Tag } from "lucide-react";
import { getAllPosts, getAssetUrl } from "@/lib/blogs";

function BlogsList() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header Panel */}
      <div className="panel p-6 md:p-8 mb-10 relative overflow-hidden">
        {/* Navigation row */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-panel-2 hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-accent">
            /BLOG
          </span>
        </div>

        {/* Console title and info */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mb-3">
          <span className="text-accent">{">"}</span> cat ./knowledge-base/*.md
        </div>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-6 w-6 text-accent" />
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Blogs
          </h1>
          <span className="rounded bg-panel-2 border border-border px-2 py-0.5 text-xs text-muted-foreground font-mono">
            {posts.length} posts
          </span>
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Deep dives on architecture, product engineering, practical coding patterns, and lessons
          from shipping real software.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="group panel overflow-hidden lift lift-hover flex flex-col hover:border-accent/40"
          >
            {/* Image Banner */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-panel-2">
              <img
                src={getAssetUrl(post.image)}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {post.pinned && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-accent/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-black">
                  <Pin className="h-3 w-3" /> Pinned
                </span>
              )}
            </div>

            {/* Post details */}
            <div className="flex flex-1 flex-col p-5">
              {/* Metadata */}
              <div className="mb-3 flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-accent" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-accent" /> {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-2 font-display text-base font-bold text-foreground group-hover:text-accent line-clamp-2 leading-tight">
                {post.title}
              </h2>

              {/* Description */}
              <p className="mb-4 flex-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {post.desc}
              </p>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-accent font-mono"
                  >
                    <Tag className="h-2.5 w-2.5 text-accent" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read article link */}
              <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-accent group-hover:underline">
                Read article <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore portfolio sections link */}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          Explore portfolio sections <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default BlogsList;
