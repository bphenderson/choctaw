import {
  CmsEditable,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  StatItemBlockDataFragmentDoc,
  type StatItemBlockDataFragment,
} from "@/gql/graphql";

/**
 * Stat Item
 * A single statistic (large value + small label). Color is inherited from the
 * parent, so it reads correctly on the dark hero as well as a light section.
 */
export const StatItemBlockComponent: CmsComponent<StatItemBlockDataFragment> = ({
  data: { value = "", label = "" },
  inEditMode,
  contentLink,
  ctx,
}) => {
  return (
    <CmsEditable
      as="div"
      className="flex flex-col"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      {(inEditMode || value) && (
        <CmsEditable
          as="span"
          cmsFieldName="Value"
          className="font-serif text-4xl font-normal leading-none lg:text-5xl"
          ctx={ctx}
        >
          {value || "+ Add Value"}
        </CmsEditable>
      )}
      {(inEditMode || label) && (
        <CmsEditable
          as="span"
          cmsFieldName="Label"
          className="mt-2 text-[11px] uppercase tracking-[2px] opacity-70"
          ctx={ctx}
        >
          {label || ""}
        </CmsEditable>
      )}
    </CmsEditable>
  );
};
StatItemBlockComponent.displayName = "Stat Item (Component/StatItemBlock)";
StatItemBlockComponent.getDataFragment = () => [
  "StatItemBlockData",
  StatItemBlockDataFragmentDoc,
];

export default StatItemBlockComponent;
