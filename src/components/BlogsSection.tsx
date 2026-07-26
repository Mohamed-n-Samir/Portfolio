import Section from "@/components/Section";
import { Tag, ArrowRight, Calendar, Clock, Pin } from "lucide-react";
import { getAllPinnedPosts, getAssetUrl } from "@/lib/blogs";
import { Link } from "react-router";

function BlogsSection() {
  const posts = getAllPinnedPosts();

  return (
    <Section id="blogs" title="$ cat ./blogs" subtitle="// developer logs & articles">
      <div className="grid gap-5 md:grid-cols-3">
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
      <div className="mt-6 text-center">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-4 py-2 text-xs hover:border-accent/40 hover:text-accent transition-colors"
        >
          View all blogs <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </Section>
  );
}

export default BlogsSection;
