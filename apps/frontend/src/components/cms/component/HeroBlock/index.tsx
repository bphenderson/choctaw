//import { useMemo } from 'react'
import Image from "next/image";
import {
  CmsEditable,
  CmsContentArea,
  type CmsComponent,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  HeroBlockDataFragmentDoc,
  ButtonBlockPropertyDataFragmentDoc,
  ReferenceDataFragmentDoc,
  LinkDataFragmentDoc,
  type HeroBlockDataFragment,
} from "@/gql/graphql";
import { getFragmentData } from "@gql/fragment-masking";
import ButtonBlock from "../ButtonBlock";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";

const ColorClasses = {
  "dark-blue": "on-vulcan",
  blue: "on-azure",
  orange: "on-tangy",
  green: "on-verdansk",
  red: "on-paleruby",
  purple: "on-people-eater",
};

/**
 * Hero
 * Hero
 */
export const HeroBlockComponent: CmsComponent<HeroBlockDataFragment> = ({
  data: {
    heroImage: image,
    eyebrow = "",
    heroHeading: heading = "",
    heroSubheading: subheading = "",
    heroDescription: description = { html: "", json: "{}" },
    heroColor: color = "blue",
    heroLayout: layout = "standard",
    imagePosition = "right",
    heroButton = null,
    stats = null,
  },
  inEditMode,
  contentLink,
  ctx,
}) => {
  const statItems = (stats ?? []).filter(Boolean);
  const heroImage = getFragmentData(ReferenceDataFragmentDoc, image);
  const heroImageLink = getFragmentData(LinkDataFragmentDoc, heroImage?.url);
  const heroImageSrc = new URL(
    heroImageLink?.default ?? "/",
    heroImageLink?.base ?? "https://example.com",
  ).href;
  const button = getFragmentData(
    ButtonBlockPropertyDataFragmentDoc,
    heroButton,
  );
  const hasImage = heroImageLink != null && heroImageLink != undefined;
  // The Hero Image reference can point at a video; render it as a looping
  // background instead of a still image when the URL is a video file.
  const heroIsVideo = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(
    heroImageLink?.default ?? "",
  );

  // A full-content hero (body copy and/or a button, like the "gaming" feature)
  // centers its text; a bare heading/subheading hero (the homepage) sits low so
  // more of the image shows up top.
  const heroHasBody =
    Boolean(button && button.children) ||
    Boolean(description?.json && description.json !== "{}");

  // Full-bleed layout: background image with a dark gradient overlay and
  // overlaid editorial text (gold eyebrow + serif heading / italic subheading).
  if (layout === "fullbleed") {
    return (
      <CmsEditable
        as="section"
        className={`relative w-full min-h-[clamp(600px,80vh,900px)] @container/hero flex ${heroHasBody ? "items-center" : "items-end"} text-white`}
        cmsId={contentLink.key}
        ctx={ctx}
      >
        {hasImage &&
          (heroIsVideo ? (
            <video
              data-epi-edit={inEditMode ? "HeroImage" : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              src={heroImageSrc}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
          ) : (
            <Image
              data-epi-edit={inEditMode ? "HeroImage" : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              src={heroImageSrc}
              alt={""}
              fill
              priority
              sizes="100vw"
            />
          ))}
        {/* Bottom scrim — primary darkening behind the bottom-aligned text */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
        />
        {/* Left scrim — extra contrast behind the left-aligned heading */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"
        />
        {/* Top scrim so the overlaid (white) header nav stays legible */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent"
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[8%] py-24 [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]">
          {(inEditMode || eyebrow) && (
            <CmsEditable
              as="p"
              cmsFieldName="Eyebrow"
              className="eyebrow mb-4"
              ctx={ctx}
            >
              {eyebrow || "+ Add Eyebrow"}
            </CmsEditable>
          )}
          {(inEditMode || heading || subheading) && (
            <h1 className="font-serif font-normal leading-[1.1] text-5xl @[60rem]/hero:text-7xl">
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
                    className="italic font-normal"
                    ctx={ctx}
                  >
                    {subheading || "+ Add Sub heading"}
                  </CmsEditable>
                </>
              )}
            </h1>
          )}
          {description?.json && description.json !== "{}" && (
            <CmsEditable
              as={RichText}
              text={sanitizeRichText(description.json)}
              cmsFieldName="Description"
              ctx={ctx}
              forwardCtx={true}
              className="prose mt-6 max-w-[460px] prose-p:text-base prose-p:leading-7 prose-p:text-white/85"
            />
          )}
          {button && button.children && (
            <div className="mt-8">
              <CmsEditable
                as={ButtonBlock}
                cmsFieldName="HeroButton"
                data={button}
                inEditMode={false}
                contentLink={{ key: null }}
                ctx={ctx}
              />
            </div>
          )}
          {statItems.length > 0 && (
            <CmsContentArea
              className="mt-12 flex flex-wrap gap-x-12 gap-y-6"
              items={statItems}
              itemWrapper={{ noWrapper: true }}
              ctx={ctx}
            />
          )}
        </div>
      </CmsEditable>
    );
  }

  // Inset card layout: a centered dark (themed) card floating in a cream frame
  // — the mockup's "The Salon" treatment.
  if (layout === "inset") {
    return (
      <CmsEditable
        as="section"
        className="on-cream px-[8%] py-16 lg:py-24"
        cmsId={contentLink.key}
        ctx={ctx}
      >
        <div
          className={`${ColorClasses[color || "blue"]} mx-auto max-w-[1100px] px-6 py-20 lg:py-28 text-center`}
        >
          <div className="mx-auto max-w-[640px]">
            {(inEditMode || eyebrow) && (
              <CmsEditable
                as="p"
                cmsFieldName="Eyebrow"
                className="eyebrow mb-5"
                ctx={ctx}
              >
                {eyebrow || "+ Add Eyebrow"}
              </CmsEditable>
            )}
            {(inEditMode || heading) && (
              <CmsEditable
                as="h2"
                cmsFieldName="Heading"
                className="font-serif text-4xl lg:text-5xl font-normal mb-5"
                ctx={ctx}
              >
                {heading || "+ Add Heading"}
              </CmsEditable>
            )}
            {description?.json ? (
              <CmsEditable
                as={RichText}
                text={sanitizeRichText(description.json)}
                cmsFieldName="Description"
                ctx={ctx}
                forwardCtx={true}
                className="prose prose-sm max-w-none prose-p:leading-7 mx-auto opacity-90"
              />
            ) : (
              inEditMode && (
                <div data-epi-edit={inEditMode ? "Description" : undefined}>
                  + Add Description
                </div>
              )
            )}
            {button && button.children ? (
              <div className="mt-8 flex justify-center">
                <CmsEditable
                  as={ButtonBlock}
                  cmsFieldName="HeroButton"
                  data={button}
                  inEditMode={false}
                  contentLink={{ key: null }}
                  ctx={ctx}
                />
              </div>
            ) : (
              inEditMode && (
                <div className="mt-8 flex justify-center">
                  <ButtonBlock
                    buttonType={"secondary"}
                    buttonVariant={"cta"}
                    data-epi-edit={inEditMode ? "HeroButton" : undefined}
                  >
                    + Add Button
                  </ButtonBlock>
                </div>
              )
            )}
          </div>
        </div>
      </CmsEditable>
    );
  }

  return (
    <CmsEditable
      as="section"
      className={`py-8 lg:py-16 ${ColorClasses[color || "blue"]}`}
      cmsId={contentLink.key}
      ctx={ctx}
    >
      <div className={`w-full @container/card container px-8 mx-auto`}>
        <div
          className={`w-full h-full grid items-center grid-cols-1 ${
            hasImage
              ? "gap-8 @[40rem]/card:grid-cols-2 @[80rem]/card:gap-16"
              : ""
          }`}
        >
          <div
            className={`prose lg:prose-h1:text-7xl lg:prose-h1:my-12 prose-h1:font-bold prose-p:text-2xl prose-p:leading-10 prose-img:my-4 ${hasImage ? "" : "max-w-[900px] mx-auto"}`}
          >
            {(inEditMode || eyebrow) && (
              <CmsEditable as="p" cmsFieldName="Eyebrow" className="eyebrow" ctx={ctx}>
                {eyebrow || "+ Add Eyebrow"}
              </CmsEditable>
            )}
            {(inEditMode || heading) && (
              <CmsEditable as="h1" cmsFieldName="Heading" ctx={ctx}>
                {heading || "+ Add Heading"}
              </CmsEditable>
            )}
            {description?.json ? (
              <CmsEditable
                as={RichText}
                text={sanitizeRichText(description.json)}
                cmsFieldName="Description"
                ctx={ctx}
                forwardCtx={true}
              />
            ) : (
              inEditMode &&
              !description?.json && (
                <div data-epi-edit={inEditMode ? "Description" : undefined}>
                  + Add Description
                </div>
              )
            )}
            {button && button.children ? (
              <CmsEditable
                as={ButtonBlock}
                cmsFieldName="HeroButton"
                data={button}
                inEditMode={false}
                contentLink={{ key: null }}
                ctx={ctx}
              />
            ) : (
              inEditMode &&
              !(button && button.children) && (
                <div className="mt-8 flex justify-end">
                  <ButtonBlock
                    buttonType={"secondary"}
                    buttonVariant={"cta"}
                    data-epi-edit={inEditMode ? "HeroButton" : undefined}
                  >
                    + Add Button
                  </ButtonBlock>
                </div>
              )
            )}
          </div>
          {hasImage ? (
            <div
              className={`order-first ${
                imagePosition === "left"
                  ? "@[40rem]/card:order-first"
                  : "@[40rem]/card:order-last"
              }`}
            >
              <Image
                data-epi-edit={inEditMode ? "HeroImage" : undefined}
                className="rounded-[2rem] w-full"
                src={heroImageSrc}
                alt={""}
                width={600}
                height={500}
              />
            </div>
          ) : inEditMode && !hasImage ? (
            <div className="mt-8 flex justify-end">
              <ButtonBlock
                buttonType={"primary"}
                buttonVariant={"cta"}
                data-epi-edit={inEditMode ? "HeroImage" : undefined}
              >
                + Add Image
              </ButtonBlock>
            </div>
          ) : null}
        </div>
      </div>
    </CmsEditable>
  );
};
HeroBlockComponent.displayName = "Hero (Component/HeroBlock)";
HeroBlockComponent.getDataFragment = () => [
  "HeroBlockData",
  HeroBlockDataFragmentDoc,
];

export default HeroBlockComponent;
