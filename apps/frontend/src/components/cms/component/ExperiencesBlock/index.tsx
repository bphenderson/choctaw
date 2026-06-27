import { type CmsComponent } from "@remkoj/optimizely-cms-react";
import {
  CmsContentArea,
  CmsEditable,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  ExperiencesBlockDataFragmentDoc,
  type ExperiencesBlockDataFragment,
} from "@gql/graphql";

/**
 * Experiences
 * Dark (on-slate) section with a staggered grid of numbered experience cards.
 * The stagger is applied via the .exp-grid nth-child rules in globals.scss.
 */
export const ExperiencesBlockComponent: CmsComponent<
  ExperiencesBlockDataFragment
> = ({
  data: { heading = "", subheading = "", layout = "staggered", experienceItems },
  inEditMode,
  contentLink,
  ctx,
}) => {
  const items = (experienceItems ?? []).filter(Boolean);
  // "staggered" keeps the numbered offset grid (via .exp-grid nth-child rules in
  // globals.scss); "grid" is a flat 4-up equal grid matching the live row.
  const isGrid = layout === "grid";

  return (
    <CmsEditable
      as="section"
      className="on-slate px-[8%] py-24"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      <div className="mb-16">
        {(inEditMode || heading || subheading) && (
          <h2 className="font-serif text-4xl font-normal leading-tight lg:text-5xl">
            {(inEditMode || heading) && (
              <CmsEditable as="span" cmsFieldName="Heading" ctx={ctx}>
                {heading || "+ Add Heading"}
              </CmsEditable>
            )}
            {(inEditMode || subheading) && (
              <>
                <br />
                <CmsEditable
                  as="i"
                  cmsFieldName="SubHeading"
                  className="italic font-normal text-gold"
                  ctx={ctx}
                >
                  {subheading || "+ Add Sub heading"}
                </CmsEditable>
              </>
            )}
          </h2>
        )}
      </div>
      <CmsContentArea
        className={`grid grid-cols-2 items-start gap-8 lg:grid-cols-4 ${
          isGrid ? "" : "exp-grid"
        }`}
        items={items}
        itemWrapper={{ noWrapper: true }}
        ctx={ctx}
      />
    </CmsEditable>
  );
};
ExperiencesBlockComponent.displayName =
  "Experiences (Component/ExperiencesBlock)";
ExperiencesBlockComponent.getDataFragment = () => [
  "ExperiencesBlockData",
  ExperiencesBlockDataFragmentDoc,
];

export default ExperiencesBlockComponent;
