import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";

export const metadata = {
  title: "Blog | Sanudin",
  description: "Articles and updates from Sanudin.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-title mb-2 text-center">Notes from the journey</h1>
      <p className="text-content text-center">Things I've learned, problems I've solved, and ideas I want to remember.</p>
      <p className="text-content text-center">Written for my future self, shared for anyone who finds it useful, and kept for my kids to read someday.</p>

      <Separator className="mt-5 mb-10 border-primary" />

      {posts.length === 0 ? (
        <p className="text-content">No posts yet.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border pb-6">
                <h2 className="text-xl font-semibold text-title">
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
              <Link href={`/blog/${post.slug}`} className="mt-5 hover:text-primary text-sm inline-block">
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
