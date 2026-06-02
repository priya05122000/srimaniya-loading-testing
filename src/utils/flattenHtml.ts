import { parse, HTMLElement } from "node-html-parser";

function unwrapRedundantDivs(node: HTMLElement): void {
  for (const child of node.childNodes) {
    if (child instanceof HTMLElement) {
      unwrapRedundantDivs(child);
    }
  }

  const children = node.childNodes.filter(
    (n) => !(n.nodeType === 3 && n.text.trim() === "")
  );

  if (
    node.tagName === "DIV" &&
    !node.id &&
    !node.getAttribute("style") &&
    children.length === 1 &&
    children[0] instanceof HTMLElement &&
    node.parentNode
  ) {
    node.replaceWith(children[0]);
  }
}

export function flattenHtml(html: string): string {
  if (!html) return html;
  const root = parse(html);
  unwrapRedundantDivs(root as unknown as HTMLElement);
  return root.innerHTML;
}
