import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project } from "./definition";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR);
  const projects = files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = getSlugFromFilename(filename);
      const fullPath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);
      const date = (data.date as string) ?? "";
      return {
        id: slug,
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        image: (data.image as string) ?? "",
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        link: (data.link as string) ?? "",
        github: (data.github as string) ?? "",
        ...(date && { date }),
        ...(content.trim() && { content: content.trim() }),
      };
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  const date = (data.date as string) ?? "";
  return {
    id: slug,
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    image: (data.image as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    link: (data.link as string) ?? "",
    github: (data.github as string) ?? "",
    ...(date && { date }),
    ...(content.trim() && { content: content.trim() }),
  };
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(getSlugFromFilename);
}
