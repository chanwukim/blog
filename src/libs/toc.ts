export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractTocFromMarkdown(markdown: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const tocItems: TocItem[] = [];

  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    if (text.toLowerCase() === "footnotes") continue;

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");

    tocItems.push({ id, text, level });
  }

  return tocItems;
}
