"use client";
import { useMemo, useEffect, useState } from "react";
import { DropDown, type DropDownOption } from "@/components/shared/drop_down";
import FundPostCard from "@/components/shared/fund_post_card";
import { Utils } from "@remkoj/optimizely-cms-react";
import { getFundPosts, type GetFundPostsResult } from "../actions/getFundPosts";
import { Paging } from "./paging";

export type FundPostsSectionProps = {
  parentKey: string;
  locale: string;
  initialdata?: GetFundPostsResult;
};

const itemsPerPageOptions: Array<DropDownOption> = [
  { value: "6" },
  { value: "9" },
  { value: "12" },
  { value: "24" },
];

export default function FundPostsSection({
  parentKey,
  locale,
  initialdata = {
    total: 0,
    items: [],
    facets: null,
  },
}: FundPostsSectionProps) {
  // Build the context
  const [pageSize, setPageSize] = useState<string>(
    itemsPerPageOptions[1].value,
  );
  const [skip, setSkip] = useState<number>(0);
  const [topic, setTopic] = useState<string>("");
  const [assetClass, setAssetClass] = useState<string>("");
  const [shareClass, setShareClass] = useState<string>("");
  const [pageData, setPageData] = useState<GetFundPostsResult>(initialdata);
  const [isLoading, setLoading] = useState<boolean>(
    (initialdata?.total ?? 0) == 0,
  );
  const limit = useMemo(() => tryParseNumber(pageSize, 10) ?? 9, [pageSize]);

  // Get the rendering properties from the pageData, but only when it changes
  const { topicOptions, assetClassOptions, shareClassOptions, total, items } =
    useMemo(() => {
      const facets = pageData?.facets;
      const total = pageData?.total ?? 0;
      const items = pageData?.items ?? [];

      const topicOptions: Array<DropDownOption> =
        facets?.topic?.filter(Utils.isNotNullOrUndefined).map((t) => {
          return {
            value: t.name ?? "",
            label: `${t.name} (${t.count})`,
          };
        }) ?? [];
      topicOptions.unshift({ label: "Show all", value: "" });
      const assetClassOptions: Array<DropDownOption> =
        facets?.assetClass?.filter(Utils.isNotNullOrUndefined).map((t) => {
          return {
            value: t.name ?? "",
            label: `${t.name} (${t.count})`,
          };
        }) ?? [];
      assetClassOptions.unshift({ label: "Show all", value: "" });
      const shareClassOptions: Array<DropDownOption> =
        facets?.shareClass?.filter(Utils.isNotNullOrUndefined).map((t) => {
          return {
            value: t.name ?? "",
            label: `${t.name} (${t.count})`,
          };
        }) ?? [];
      shareClassOptions.unshift({ label: "Show all", value: "" });
      return {
        topicOptions,
        assetClassOptions,
        shareClassOptions,
        total,
        items,
      };
    }, [pageData]);

  // Use a server action to actually load the data, when the request properties change
  useEffect(() => {
    let cancelled = false;
    const params = {
      parentKey,
      locale,
      limit: tryParseNumber(pageSize) ?? 9,
      skip,
      topic,
      assetClass,
      shareClass,
    };
    console.log("Fund post fetching params", params);
    const updateData = async () => {
      const newPageData = await getFundPosts(params);
      if (cancelled) return;
      setPageData(newPageData);
      setLoading(false);
    };
    updateData();
    return () => {
      cancelled = true;
    };
  }, [parentKey, locale, pageSize, skip, topic, assetClass, shareClass]);

  const count = Math.ceil((total || 0) / limit);
  const page = Math.floor(skip / limit);
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/6 text-align-center">
          <div>
            <p>Search Filters:</p>
          </div>
          <DropDown
            className="mb-2 w-full"
            label="Share Class"
            options={shareClassOptions}
            value={
              shareClassOptions.find((o) => o.value == shareClass) ??
              shareClassOptions[0]
            }
            unselectedLabel="Filter by share class"
            onChange={(nv) => {
              setLoading(true);
              setShareClass(nv.value);
            }}
          />
          <DropDown
            className="mb-2 w-full"
            label="Asset Class"
            options={assetClassOptions}
            value={
              assetClassOptions.find((o) => o.value == assetClass) ??
              assetClassOptions[0]
            }
            unselectedLabel="Filter by asset class"
            onChange={(nv) => {
              setLoading(true);
              setAssetClass(nv.value);
            }}
          />
          <DropDown
            className="mb-2 w-[200px]"
            label="Topic"
            options={topicOptions}
            value={
              topicOptions.find((o) => o.value == topic) ?? topicOptions[0]
            }
            unselectedLabel="Filter by topic"
            onChange={(nv) => {
              setLoading(true);
              setTopic(nv.value);
            }}
          />
          <DropDown
            className="mb-2 w-full"
            label="Items per page"
            options={itemsPerPageOptions}
            value={
              itemsPerPageOptions.find((o) => o.value == pageSize) ??
              itemsPerPageOptions[1]
            }
            unselectedLabel="Set page size"
            onChange={(nv) => {
              setLoading(true);
              setPageSize(nv.value);
            }}
          />
        </div>
        <div className="basis-5/6">
          <table className="table-auto min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th colSpan={4}></th>
                <th className="border-b p-2" colSpan={2} scope="colgroup">
                  04/30/2025
                </th>
                <th className="border-b m-2 p-2" colSpan={5} scope="colgroup">
                  Annualized - 04/30/2025
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Fund Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Symbol
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Inc. Date
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  NAV
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  1-MO%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  YTD%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  1-YR%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  3-YR%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  5-YR%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  10-YR%
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  Since Inc.
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <LoadingState count={limit} parentId={parentKey} />
              ) : (
                items.filter(Utils.isNotNullOrUndefined).map((item) => {
                  const key = item.metadata?.key;
                  if (!key) return null;
                  return (
                    <FundPostCard
                      key={key}
                      blogPost={{
                        category: Array.isArray(item.topic)
                          ? item.topic.join(", ")
                          : (item.topic ?? ""),
                        id: item.metadata?.key ?? "",
                        description: "",
                        image: {
                          src: new URL(
                            item.image?.src?.default ?? "/",
                            item.image?.src?.base ?? "https://example.com",
                          ).href,
                          alt: item.metadata?.key ?? "",
                          width: 200,
                          height: 200,
                        },
                        title: item.heading ?? "",
                        url: item.metadata?.url?.default ?? "/",
                        author: item.author ?? "",
                        published: item?.metadata?.published,
                        symbol: item?.symbol ?? "",
                      }}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Paging
        totalItems={total ?? 0}
        pageSize={limit}
        pageCount={count}
        page={page}
        onPageChange={(newPage, newSkip) => {
          setLoading(true);
          setSkip(newSkip);
        }}
      />
    </>
  );
}

function LoadingState({
  count,
  parentId,
}: {
  count: number;
  parentId: string;
}) {
  const cards: JSX.Element[] = [];
  for (let seqId = 0; seqId < count; seqId++) {
    cards.push(
      <tr
        key={`${parentId}-loader-${seqId}`}
        className="bg-light-grey rounded-xl w-full aspect-[5/6] animate-pulse"
      >
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
      </tr>,
    );
  }
  return <>{cards}</>;
}

function tryParseNumber(
  ...args: Parameters<(typeof Number)["parseInt"]>
): ReturnType<(typeof Number)["parseInt"]> | undefined {
  try {
    return Number.parseInt(...args);
  } catch {
    undefined;
  }
}
