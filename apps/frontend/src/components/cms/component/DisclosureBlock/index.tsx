import {
  CmsEditable,
  RichText,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  type DisclosureBlockDataFragment,
  DisclosureBlockDataFragmentDoc,
} from "@/gql/graphql";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";

export const DisclosureBlockComponent: CmsComponent<
  DisclosureBlockDataFragment
> = ({ data: { disclosureId, body }, contentLink, ctx }) => {
  return (
    <div id={disclosureId ?? undefined} className="disclosure-block">
      <CmsEditable as={RichText}
        cmsId={contentLink.key}
        text={sanitizeRichText(body?.json)}
        className="prose max-w-none"
        ctx={ctx}
      />
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
