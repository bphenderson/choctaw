import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  CmsContentArea,
  CmsEditable,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  SuiteGridBlockDataFragmentDoc,
  type SuiteGridBlockDataFragment,
} from "@gql/graphql";

/**
 * Suite Grid
 * Renders the suite collection asymmetrically: the first item becomes the
 * large featured card; the rest stack in a column beside it. We split the
 * content area into two so the layout is real DOM rather than fragile CSS.
 */
export const SuiteGridBlockComponent: CmsComponent<SuiteGridBlockDataFragment> =
  ({ data: { label = "", heading = "", suiteItems }, inEditMode, contentLink, ctx }) => {
    const items = (suiteItems ?? []).filter(Boolean);
    const featured = items.slice(0, 1);
    const secondary = items.slice(1);

    return (
      <CmsEditable
        as="section"
        className="on-cream px-[8%] py-20"
        cmsId={contentLink.key}
        ctx={ctx}
      >
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-black/10 pb-8">
          {(inEditMode || heading) && (
            <CmsEditable
              as="h2"
              cmsFieldName="Heading"
              className="font-serif text-5xl font-normal leading-none lg:text-7xl"
              ctx={ctx}
            >
              {heading || "+ Add Heading"}
            </CmsEditable>
          )}
          {(inEditMode || label) && (
            <CmsEditable
              as="span"
              cmsFieldName="Label"
              className="whitespace-nowrap text-[10px] uppercase tracking-[3px] text-[#595959]"
              ctx={ctx}
            >
              {label || ""}
            </CmsEditable>
          )}
        </div>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <CmsContentArea
            noWrapper
            items={featured}
            itemWrapper={{ as: "div", className: "h-[400px] lg:h-[600px]" }}
            ctx={ctx}
          />
          <div className="flex flex-col gap-10">
            <CmsContentArea
              noWrapper
              items={secondary}
              itemWrapper={{ as: "div", className: "h-[250px]" }}
              ctx={ctx}
            />
          </div>
        </div>
      </CmsEditable>
    );
  };
SuiteGridBlockComponent.displayName = "Suite Grid (Component/SuiteGridBlock)";
SuiteGridBlockComponent.getDataFragment = () => [
  "SuiteGridBlockData",
  SuiteGridBlockDataFragmentDoc,
];

export default SuiteGridBlockComponent;
