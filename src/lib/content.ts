import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export interface MDXFrontmatter {
  id: string;
  title: string;
  phase: number;
  level: number;
  estimatedMinutes: number;
  prerequisite?: string;
  objectives?: string[];
}

export function getMDXContent(unitId: string): { frontmatter: MDXFrontmatter; source: string } | null {
  const filePath = path.join(CONTENT_DIR, `${unitId}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as MDXFrontmatter, source: content };
}
