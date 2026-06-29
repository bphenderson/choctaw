import { type FunctionComponent } from "react";
import { type LinkItemDataFragment } from "@gql/graphql";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Link2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { createListKey, linkToUrl, urlToRelative } from "@shared/cms_link";

/** Pick a platform icon from the link's host (or its text as a fallback). */
function iconFor(item: LinkItemDataFragment): LucideIcon {
  const hay = `${linkToUrl(item)?.host ?? ""} ${item.text ?? ""}`.toLowerCase();
  if (hay.includes("facebook")) return Facebook;
  if (hay.includes("instagram")) return Instagram;
  if (hay.includes("youtube")) return Youtube;
  if (hay.includes("linkedin")) return Linkedin;
  if (hay.includes("twitter") || hay.includes("x.com")) return Twitter;
  return Link2;
}

export type SocialLinksProps = {
  links?: ReadonlyArray<LinkItemDataFragment | null> | null;
};

/**
 * SocialLinks
 * Footer social icon row. Each entry is a generic link; the icon is inferred
 * from its host. Renders nothing when no social links are configured.
 */
export const SocialLinks: FunctionComponent<SocialLinksProps> = ({ links }) => {
  const items = (links ?? []).filter(Boolean) as LinkItemDataFragment[];
  if (items.length === 0) return null;

  return (
    <ul className="mt-6 flex items-center gap-4">
      {items.map((item) => {
        const Icon = iconFor(item);
        const label = item.text || item.title || "Social link";
        return (
          <li key={createListKey(item)}>
            <Link
              href={urlToRelative(linkToUrl(item))}
              aria-label={label}
              title={item.title ?? label}
              target={item.target ?? undefined}
              className="flex items-center text-white/80 transition-colors hover:text-white"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
