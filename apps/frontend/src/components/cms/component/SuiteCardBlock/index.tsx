import Image from "next/image";
import {
  CmsEditable,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  SuiteCardBlockDataFragmentDoc,
  ReferenceDataFragmentDoc,
  LinkDataFragmentDoc,
  type SuiteCardBlockDataFragment,
} from "@/gql/graphql";
import { getFragmentData } from "@gql/fragment-masking";

/**
 * Suite Card
 * A single suite tile (image + title + optional price). Sizing is driven by the
 * parent Suite Grid, so the image fills whatever height its wrapper provides.
 */
export const SuiteCardBlockComponent: CmsComponent<SuiteCardBlockDataFragment> =
  ({ data: { suiteImage, title = "", price = "" }, inEditMode, contentLink, ctx }) => {
    const image = getFragmentData(ReferenceDataFragmentDoc, suiteImage);
    const imageLink = getFragmentData(LinkDataFragmentDoc, image?.url);
    const src = imageLink
      ? new URL(imageLink.default ?? "/", imageLink.base ?? "https://example.com")
          .href
      : null;

    return (
      <CmsEditable
        as="figure"
        className="group flex h-full flex-col"
        cmsId={contentLink.key}
        ctx={ctx}
      >
        <div className="relative flex-1 overflow-hidden">
          {src && (
            <Image
              data-epi-edit={inEditMode ? "SuiteImage" : undefined}
              src={src}
              alt={title || ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          {(inEditMode || title) && (
            <CmsEditable
              as="h3"
              cmsFieldName="Title"
              className="font-serif text-2xl font-normal"
              ctx={ctx}
            >
              {title || "+ Add Title"}
            </CmsEditable>
          )}
          {(inEditMode || price) && (
            <CmsEditable
              as="span"
              cmsFieldName="Price"
              className="whitespace-nowrap text-[10px] uppercase tracking-[2px] text-[#666]"
              ctx={ctx}
            >
              {price || ""}
            </CmsEditable>
          )}
        </figcaption>
      </CmsEditable>
    );
  };
SuiteCardBlockComponent.displayName = "Suite Card (Component/SuiteCardBlock)";
SuiteCardBlockComponent.getDataFragment = () => [
  "SuiteCardBlockData",
  SuiteCardBlockDataFragmentDoc,
];

export default SuiteCardBlockComponent;
