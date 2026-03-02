import React from "react";
import { CmsImage } from "@/components/shared/cms_image";
import {
  CmsEditable,
  type CmsComponent,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import { DisclosureBlock } from "@gql/graphql";
import {
  DisclosureBlockDataFragment,
  DisclosureBlockDataFragmentDoc,
} from "@/gql/graphql";

export const DisclosureBlockComponent: CmsComponent<
  DisclosureBlockDataFragment
> = ({ data: { Body } }) => {
  return (
    <div className="disclosure-block">
      <CmsEditable content={Body} />
    </div>
  );
};

DisclosureBlockComponent.displayName =
  "Disclosure Block (Component/DisclosureBlock)";
DisclosureBlockComponent.getDataFragment = () => [
  "DisclosureBlockData",
  DisclosureBlockDataFragmentDoc,
];

export default DisclosureBlockComponent;
