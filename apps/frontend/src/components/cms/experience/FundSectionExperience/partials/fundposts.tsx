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
  const [author, setAuthor] = useState<string>("");
  const [pageData, setPageData] = useState<GetFundPostsResult>(initialdata);
  const [isLoading, setLoading] = useState<boolean>(
    (initialdata?.total ?? 0) == 0,
  );
  const limit = useMemo(() => tryParseNumber(pageSize, 10) ?? 9, [pageSize]);

  // Get the rendering properties from the pageData, but only when it changes
  const { topicOptions, authorOptions, total, items } = useMemo(() => {
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
    const authorOptions: Array<DropDownOption> =
      facets?.author?.filter(Utils.isNotNullOrUndefined).map((t) => {
        return {
          value: t.name ?? "",
          label: `${t.name} (${t.count})`,
        };
      }) ?? [];
    authorOptions.unshift({ label: "Show all", value: "" });

    return { topicOptions, authorOptions, total, items };
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
      author,
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
  }, [parentKey, locale, pageSize, skip, topic, author]);

  const count = Math.ceil((total || 0) / limit);
  const page = Math.floor(skip / limit);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-4 py-4">
        <DropDown
          label="Topic"
          options={topicOptions}
          value={topicOptions.find((o) => o.value == topic) ?? topicOptions[0]}
          unselectedLabel="Filter by topic"
          onChange={(nv) => {
            setLoading(true);
            setTopic(nv.value);
          }}
        />
        <DropDown
          label="Author"
          options={authorOptions}
          value={
            authorOptions.find((o) => o.value == author) ?? authorOptions[0]
          }
          unselectedLabel="Filter by author"
          onChange={(nv) => {
            setLoading(true);
            setAuthor(nv.value);
          }}
        />
        <DropDown
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
      <div>
        <table className="table-auto min-w-full divide-y divide-gray-300">
          <thead>
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
      <div
        key={`${parentId}-loader-${seqId}`}
        className="w-full mb-2 lg:mb-4 xl:mb-8 break-inside-avoid"
      >
        <div className="bg-light-grey rounded-xl w-full aspect-[5/6] animate-pulse"></div>
      </div>,
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
