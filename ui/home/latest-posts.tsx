import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Button } from "@/ui/button";

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
          <div className="border border-primary/30 w-14 h-14 rounded-xl text-2xl flex justify-center items-center mx-auto mb-3 bg-background">
            📝
          </div>
          <h2 className="font-bold text-2xl mb-2 text-title">
            Latest from the blog
          </h2>
          <p className="text-content mb-2">
            Recent articles and updates.{" "}
            <Link
              href="/blog"
              className="text-primary hover:underline font-medium"
            >
              View all posts →
            </Link>
          </p>
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
              <Button variant="outline" size="sm" className="mt-4 w-fit" asChild>
                <Link href={`/blog/${post.slug}`}>Read more</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
