"use server";

import { getSdk } from "@/sdk";
import { getChildLocationPostsQueryVariables } from "@gql/graphql";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";

export type GetLocationPostsParams = {
  parentKey: string;
  locale: string;
  limit?: number;
  skip?: number;
  topic?: string;
};

export type GetLocationPostsResult = Awaited<
  ReturnType<typeof getLocationPosts>
>;

export async function getLocationPosts(options: GetLocationPostsParams) {
  const sdk = getSdk();
  const graphLocale = localeToGraphLocale(
    options.locale,
  ) as getChildLocationPostsQueryVariables["locale"];
  const result = await sdk
    .getChildLocationPosts({
      ...options,
      locale: graphLocale,
    })
    .then((r) => r.result?.items?.at(0)?.items?.posts)
    .catch((e) => {
      return { total: 0, items: [], facets: undefined, error: e };
    });
  return result;
}

export default getLocationPosts;
