import "server-only";
import { type Metadata } from "next";
import {
  type Locales,
  type LocationSearchPageDataFragment,
  LocationSearchPageDataFragmentDoc,
} from "@gql/graphql";
import { type OptimizelyNextPage } from "@remkoj/optimizely-cms-nextjs";
import { CmsContentArea } from "@remkoj/optimizely-cms-react/rsc";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";
import { getLinkData, linkDataToUrl } from "@/lib/urls";
import { toValidOpenGraphType } from "@/lib/opengraph";
import { LocationSearchInteractive } from "./LocationSearchInteractive";
import { getSdk } from "@gql";

export const LocationSearchPage: OptimizelyNextPage<
  LocationSearchPageDataFragment
> = ({ data: { TopContentArea }, ctx }) => {
  return (
    <div className="locationsearch-page">
      <CmsContentArea
        fieldName="TopContentArea"
        items={TopContentArea}
        className="w-full"
        ctx={ctx}
      />
      <LocationSearchInteractive />
    </div>
  );
};

LocationSearchPage.getDataFragment = () => [
  "LocationSearchPageData",
  LocationSearchPageDataFragmentDoc,
];
LocationSearchPage.getMetaData = async (contentLink, locale, client) => {
  const sdk = getSdk(client); // Get the SDK with authentication applied - if needed
  const result = await sdk.getLocationSearchPageMetaData({
    ...contentLink,
    locale: locale ? (localeToGraphLocale(locale) as Locales) : null,
  });
  const matchingPosts = (result.LocationSearchPage?.pages || []).filter(
    isNotNullOrUndefined,
  );
  if (matchingPosts.length != 1) return {};
  const cmsManagedData = matchingPosts[0];
  const meta: WithPropertySet<Metadata, "openGraph"> = {
    title:
      cmsManagedData.SeoSettings?.MetaTitle ??
      cmsManagedData._metadata?.displayName,
    description: cmsManagedData.SeoSettings?.MetaDescription,
    metadataBase: tryToUrl(cmsManagedData?._metadata?.url?.base),
    openGraph: {
      title:
        cmsManagedData.SeoSettings?.MetaTitle ??
        cmsManagedData._metadata?.displayName ??
        undefined,
      description: cmsManagedData.SeoSettings?.MetaDescription ?? undefined,
    },
    other: {
      "idio:content-type": "Location Search Page",
    },
  };
  // Apply image if available
  const pageImage = linkDataToUrl(
    getLinkData(cmsManagedData.SeoSettings?.SharingImage),
  );
  if (pageImage) {
    meta.openGraph.images = [
      {
        url: pageImage,
      },
    ];
  }
  // Apply type if available
  const openGraphType = toValidOpenGraphType(
    cmsManagedData.SeoSettings?.GraphType,
  );
  if (openGraphType) {
    //@ts-expect-error The Type is only available when setting directly as it'll determine the subtype of the openGraph data
    meta.openGraph.type = openGraphType;
  }
  return meta;
};

type WithPropertySet<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<Required<T>[P]>;
};

function isNotNullOrUndefined<T>(toTest?: T | null | undefined): toTest is T {
  return toTest ? true : false;
}

function tryToUrl(toConvert: string | null | undefined) {
  if (!toConvert) return undefined;
  try {
    return new URL(toConvert);
  } catch {
    return undefined;
  }
}
export default LocationSearchPage;
