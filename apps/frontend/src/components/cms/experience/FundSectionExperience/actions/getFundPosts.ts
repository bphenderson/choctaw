"use server";

import { getSdk } from "@/sdk";
import { getChildFundPostsQueryVariables } from "@gql/graphql";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";

export type GetFundPostsParams = {
  parentKey: string;
  locale: string;
  limit?: number;
  skip?: number;
  topic?: string;
  assetClass?: string;
  shareClass?: string;
};

export type GetFundPostsResult = Awaited<ReturnType<typeof getFundPosts>>;

export async function getFundPosts(options: GetFundPostsParams) {
  const sdk = getSdk();
  const graphLocale = localeToGraphLocale(
    options.locale,
  ) as getChildFundPostsQueryVariables["locale"];
  const result = await sdk
    .getChildFundPosts({
      ...options,
      locale: graphLocale,
    })
    .then((r) => r.result?.items?.at(0)?.items?.posts)
    .catch((e) => {
      return { total: 0, items: [], facets: undefined, error: e };
    });
  return result;
}

export default getFundPosts;
