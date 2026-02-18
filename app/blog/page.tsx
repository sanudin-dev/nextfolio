import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Button } from "@/ui/button";

export const metadata = {
  title: "Blog | Sanudin",
  description: "Articles and updates from Sanudin.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-title mb-2">Blog</h1>
      <p className="text-content mb-10">
        Articles and updates. Content is written in Markdown—no database needed.
      </p>

      {posts.length === 0 ? (
        <p className="text-content">No posts yet.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border pb-6">
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-title group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.date && (
                  <time
                    dateTime={post.date}
                    className="text-sm text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
                {post.description && (
                  <p className="text-content mt-1">{post.description}</p>
                )}
              </Link>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <Link href={`/blog/${post.slug}`}>Read more</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
