import fs from "node:fs";
import path from "node:path";
import { Skillset } from "./definition";

const SKILLS_PATH = path.join(process.cwd(), "content", "skills.json");

export function getSkillset(): Skillset[] {
  if (!fs.existsSync(SKILLS_PATH)) return [];
  const raw = fs.readFileSync(SKILLS_PATH, "utf-8");
  return JSON.parse(raw) as Skillset[];
}
