"use client";

import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  LinkItemDataFragmentDoc,
  LinkDataFragmentDoc,
  SecondaryNavigationBlockDataFragment,
} from "@/gql/graphql";
import { getFragmentData } from "@gql";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SiblingLink = {
  text: string;
  url: {
    default: string;
  };
  title?: string;
  target?: string;
};

/**
 * Client-side implementation of Secondary Navigation
 */
export const SecondaryNavigationBlockClient: CmsComponent<
  SecondaryNavigationBlockDataFragment
> = ({
  data: {
    NavigationHeading: heading,
    NavigationLinks: links,
    ShowBorder: showBorder = false,
    AutomaticallyAddSiblings: autoAddSiblings = false,
    _metadata: metadata,
  },
}) => {
  const pathname = usePathname();
  const [siblingLinks, setSiblingLinks] = useState<SiblingLink[]>([]);
  const groupLabel = heading ?? metadata?.displayName ?? "Secondary Navigation";

useEffect(() => {
  if (!autoAddSiblings) return;

const fetchSiblingPages = async () => {
  try {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    const parentPath = pathSegments.length <= 1 ? '/' : '/' + pathSegments.slice(0, pathSegments.length - 1).join('/');
    
    const apiUrl = `/api/pages/children?parentPath=${encodeURIComponent(parentPath)}`;
    console.log("Fetching from:", apiUrl);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      return;
    }
    
    const childPages = await response.json();

    const siblings = childPages.map((page: any) => ({
      text: page.name,
      url: {
        default: page.url
      },
      title: page.name
    }));
  
    setSiblingLinks(siblings);
  } catch (error) {
    console.error("Error fetching sibling pages:", error);
  }
};
  fetchSiblingPages();
}, [autoAddSiblings, pathname]);

  // Determine which links to display
  const displayLinks = autoAddSiblings ? siblingLinks : links || [];

  return (
    <nav
      className={`secondary-navigation ${
        showBorder
          ? "border border-azure dark:border-verdansk rounded-lg p-4"
          : ""
      }`}
    >
      {heading && <div className="text-lg font-medium mb-3">{groupLabel}</div>}
      <ul className="flex flex-row flex-wrap gap-4 lg:gap-6">
        {displayLinks.map((link, index) => {
          if (!link) return null;

          let linkData, linkUrl;
          
          if (autoAddSiblings) {
            // For auto-generated links
            linkData = { text: link.text, title: link.title, target: link.target };
            linkUrl = { default: link.url.default };
          } else {
            // For CMS-provided links, use the existing fragment data extraction
            const typedLink = link as unknown as {
              " $fragmentRefs": { LinkItemDataFragment: any };
            };
            linkData = getFragmentData(LinkItemDataFragmentDoc, typedLink);

            const typedUrl = linkData?.url as unknown as {
              " $fragmentRefs": { LinkDataFragment: any };
            };
            linkUrl = typedUrl
              ? getFragmentData(LinkDataFragmentDoc, typedUrl)
              : null;
          }

          if (!linkData || !linkUrl?.default) return null;

          const isActive = pathname === linkUrl.default;
          const linkKey = `${linkData.text ?? ""}-${index}`;

          return (
            <li key={linkKey} className="secondary-nav-item">
              <Link
                className="py-2 px-1 inline-block relative transition-colors hover:text-azure data-[link=active]:text-azure dark:hover:text-verdansk dark:data-[link=active]:text-verdansk after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-azure after:scale-x-0 after:data-[link=active]:scale-x-100 hover:after:scale-x-100 after:transition-transform dark:after:bg-verdansk"
                href={linkUrl.default}
                title={linkData.title ?? undefined}
                target={linkData.target ?? undefined}
                data-link={isActive ? "active" : "inactive"}
              >
                {linkData.text ?? linkData.title ?? "Unnamed link"}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
