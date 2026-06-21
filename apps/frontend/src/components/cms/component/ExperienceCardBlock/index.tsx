import Image from "next/image";
import {
  CmsEditable,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  ExperienceCardBlockDataFragmentDoc,
  ReferenceDataFragmentDoc,
  LinkDataFragmentDoc,
  type ExperienceCardBlockDataFragment,
} from "@/gql/graphql";
import { getFragmentData } from "@gql/fragment-masking";

/**
 * Experience Card
 * Number + image + small description + serif title. Rendered on a dark
 * (on-slate) surface by the parent Experiences block.
 */
export const ExperienceCardBlockComponent: CmsComponent<
  ExperienceCardBlockDataFragment
> = ({
  data: { number = "", experienceImage, description = "", title = "" },
  inEditMode,
  contentLink,
  ctx,
}) => {
  const image = getFragmentData(ReferenceDataFragmentDoc, experienceImage);
  const imageLink = getFragmentData(LinkDataFragmentDoc, image?.url);
  const src = imageLink
    ? new URL(imageLink.default ?? "/", imageLink.base ?? "https://example.com")
        .href
    : null;

  return (
    <CmsEditable
      as="article"
      className="group flex flex-col"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      {(inEditMode || number) && (
        <CmsEditable
          as="span"
          cmsFieldName="ItemNumber"
          className="mb-4 font-serif text-5xl"
          ctx={ctx}
        >
          {number || ""}
        </CmsEditable>
      )}
      <div className="relative mb-4 h-[350px] w-full overflow-hidden">
        {src && (
          <Image
            data-epi-edit={inEditMode ? "ExperienceImage" : undefined}
            src={src}
            alt={title || ""}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>
      {(inEditMode || description) && (
        <CmsEditable
          as="p"
          cmsFieldName="Description"
          className="mb-2 text-[9px] uppercase tracking-[1px] text-white/50"
          ctx={ctx}
        >
          {description || ""}
        </CmsEditable>
      )}
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
    </CmsEditable>
  );
};
ExperienceCardBlockComponent.displayName =
  "Experience Card (Component/ExperienceCardBlock)";
ExperienceCardBlockComponent.getDataFragment = () => [
  "ExperienceCardBlockData",
  ExperienceCardBlockDataFragmentDoc,
];

export default ExperienceCardBlockComponent;
