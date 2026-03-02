// This remains a server component (no "use client" directive)
import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  SecondaryNavigationBlockDataFragment,
  SecondaryNavigationBlockDataFragmentDoc,
} from "@/gql/graphql";
import { DocumentNode } from "graphql";
import { SecondaryNavigationBlockClient } from "./SecondaryNavigationBlockClient";

type GetDataFragment<T> = () => [string, DocumentNode];

type CmsBlockComponent<T> = CmsComponent<T> & {
  getDataFragment: GetDataFragment<T>;
};

/**
 * Secondary Navigation - Horizontal navigation for sub-pages of the same parent page
 */
export const SecondaryNavigationBlockComponent: CmsBlockComponent<
  SecondaryNavigationBlockDataFragment
> = ({ ctx: _ctx, editProps: _editProps, ...props }) => {
  return <SecondaryNavigationBlockClient {...props} />;
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
