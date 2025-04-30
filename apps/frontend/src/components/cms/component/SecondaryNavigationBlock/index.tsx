import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  LinkItemDataFragmentDoc,
  LinkDataFragmentDoc,
  SecondaryNavigationBlockDataFragment,
  SecondaryNavigationBlockDataFragmentDoc,
  LinkItemDataFragment,
  LinkDataFragment,
  Link as LinkType,
} from "@/gql/graphql";
import { getFragmentData } from "@gql";
import Link from "next/link";
import { DocumentNode } from "graphql";

type GetDataFragment<T> = () => [string, DocumentNode];

type CmsBlockComponent<T> = CmsComponent<T> & {
  getDataFragment: GetDataFragment<T>;
};

/* -------------------------------------------------------- */
/**
 * Secondary Navigation - Horizontal navigation for sub-pages of the same parent page
 */
export const SecondaryNavigationBlockComponent: CmsBlockComponent<
  SecondaryNavigationBlockDataFragment
> = ({
  data: {
    NavigationHeading: heading,
    NavigationLinks: links,
    ShowBorder: showBorder = false,
    _metadata: metadata,
  },
}) => {
  const groupLabel = heading ?? metadata?.displayName ?? "Secondary Navigation";

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
        {links?.map((link, index) => {
          if (!link) return null;

          // Type assertion for the link
          const typedLink = link as unknown as {
            " $fragmentRefs": { LinkItemDataFragment: any };
          };
          const linkData = getFragmentData(LinkItemDataFragmentDoc, typedLink);

          // Type assertion for the URL
          const typedUrl = linkData?.url as unknown as {
            " $fragmentRefs": { LinkDataFragment: any };
          };
          const linkUrl = typedUrl
            ? getFragmentData(LinkDataFragmentDoc, typedUrl)
            : null;

          if (!linkData || !linkUrl?.default) return null;

          const linkKey = `${linkData.text ?? ""}-${index}`;

          return (
            <li key={linkKey} className="secondary-nav-item">
              <Link
                className="py-2 px-1 inline-block relative transition-colors hover:text-azure data-[link=active]:text-azure dark:hover:text-verdansk dark:data-[link=active]:text-verdansk after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-azure after:scale-x-0 after:data-[link=active]:scale-x-100 hover:after:scale-x-100 after:transition-transform dark:after:bg-verdansk"
                href={linkUrl.default}
                title={linkData.title ?? undefined}
                target={linkData.target ?? undefined}
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

SecondaryNavigationBlockComponent.displayName =
  "Secondary Navigation (Component/SecondaryNavigationBlock)";

SecondaryNavigationBlockComponent.getDataFragment = (): [
  string,
  DocumentNode,
] => [
  "SecondaryNavigationBlockData",
  SecondaryNavigationBlockDataFragmentDoc as DocumentNode,
];

export default SecondaryNavigationBlockComponent;
