import Link from "next/link";
import { getPosts } from "@/lib/blog";

const MAX_POSTS = 4;

export default function LatestPosts() {
  const posts = getPosts().slice(0, MAX_POSTS);

  if (posts.length === 0) return null;

  return (
    <section
      id="latest-posts"
      className="w-full py-20 my-10 px-4 bg-muted/50 rounded-xl"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="border border-white w-14 h-14 rounded-xl text-4xl flex justify-center items-center mx-auto mb-3 bg-white/50">
            📝
          </div>
          <h2 className="font-bold text-2xl mb-2 text-title">
            Notes from the journey
          </h2>
          <p className="text-content">Things I've learned, problems I've solved, and ideas I want to remember.</p>
          <p className="text-content">Written for my future self, shared for anyone who finds it useful, and kept for my kids to read someday.</p>
          <Link
            href="/blog"
            className="text-primary hover:underline font-medium mt-5 inline-block"
          >
            View all posts →
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-lg border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full flex flex-col"
              >
                <h3 className="font-semibold text-title group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.date && (
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted-foreground mt-1 block"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                {post.description && (
                  <p className="text-content text-sm mt-2 line-clamp-2">
                    {post.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
