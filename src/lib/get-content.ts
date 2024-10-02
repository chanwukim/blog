import fs from "fs";
import path from "path";

import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export default function getContent(fulpath: string) {
  const fullPath = path.join(contentDirectory, `${fulpath}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return content;
}
