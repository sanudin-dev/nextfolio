import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Blog | Sanudin`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-content hover:text-primary text-sm mb-8"
      >
        ← Back to blog
      </Link>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-title">{post.title}</h1>
        {post.date && (
          <time
            dateTime={post.date}
            className="text-muted-foreground text-sm block mt-2"
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-md">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
