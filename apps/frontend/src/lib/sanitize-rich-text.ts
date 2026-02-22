/**
 * Sanitize rich text JSON from the CMS to prevent React SSR errors
 * with void/self-closing HTML elements (br, hr, img, etc.) that may
 * contain children in the CMS JSON data model.
 *
 * React throws: "br is a self-closing tag and must neither have
 * `children` nor use `dangerouslySetInnerHTML`" when a void element
 * node has children in the rendered output.
 */

// HTML void elements that cannot have children
const VOID_ELEMENTS = new Set([
  "br",
  "hr",
  "img",
  "area",
  "base",
  "col",
  "embed",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

type RichTextNode = {
  type?: string;
  children?: RichTextNode[];
  text?: string;
  [key: string]: unknown;
};

/**
 * Recursively sanitize a rich text JSON tree by removing children
 * from void HTML elements like `<br>`, `<hr>`, etc.
 *
 * For void elements that have children, the children are promoted
 * to siblings after the void element to preserve content.
 */
function sanitizeNode(node: RichTextNode): RichTextNode[] {
  if (!node || typeof node !== "object") return [node];

  const nodeType = node.type?.toLowerCase();

  // Void element: strip children and return just the void element
  if (nodeType && VOID_ELEMENTS.has(nodeType)) {
    const { children, ...rest } = node;
    const result: RichTextNode[] = [rest];

    // Promote any meaningful children to siblings
    if (children && Array.isArray(children)) {
      for (const child of children) {
        // Skip empty text nodes (Slate artifacts)
        if ("text" in child && (!child.text || child.text === "")) continue;
        result.push(...sanitizeNode(child));
      }
    }

    return result;
  }

  // Non-void element: recursively sanitize children
  if (node.children && Array.isArray(node.children)) {
    const newChildren: RichTextNode[] = [];
    for (const child of node.children) {
      newChildren.push(...sanitizeNode(child));
    }
    return [{ ...node, children: newChildren }];
  }

  return [node];
}

/**
 * Sanitize rich text JSON input for safe rendering with the RichText component.
 * Handles both array and single-node inputs.
 */
export function sanitizeRichText<T>(input: T): T {
  if (!input) return input;

  if (Array.isArray(input)) {
    const result: RichTextNode[] = [];
    for (const node of input) {
      result.push(...sanitizeNode(node as RichTextNode));
    }
    return result as T;
  }

  if (typeof input === "object") {
    const sanitized = sanitizeNode(input as RichTextNode);
    return (sanitized.length === 1 ? sanitized[0] : sanitized) as T;
  }

  return input;
}

export default sanitizeRichText;
