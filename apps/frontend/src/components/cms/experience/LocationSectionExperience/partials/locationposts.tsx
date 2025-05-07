"use client";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState } from "react";
import { DropDown, type DropDownOption } from "@/components/shared/drop_down";
import LocationPostCard from "@/components/shared/location_card";
import { Utils } from "@remkoj/optimizely-cms-react";
import {
  getLocationPosts,
  type GetLocationPostsResult,
} from "../actions/getLocationPosts";
import { Paging } from "./paging";

const MapComponent = dynamic(
  () =>
    import("../../../page/LocationSearch/MapComponent").then(
      (mod) => mod.MapComponent,
    ),
  { ssr: false },
);

export type LocationPostsSectionProps = {
  parentKey: string;
  locale: string;
  initialdata?: GetLocationPostsResult;
};

const itemsPerPageOptions: Array<DropDownOption> = [
  { value: "6" },
  { value: "9" },
  { value: "12" },
  { value: "24" },
];

export default function LocationPostsSection({
  parentKey,
  locale,
  initialdata = {
    total: 0,
    items: [],
    facets: null,
  },
}: LocationPostsSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  // Build the context
  const [pageSize, setPageSize] = useState<string>(
    itemsPerPageOptions[1].value,
  );
  const [skip, setSkip] = useState<number>(0);
  const [topic, setTopic] = useState<string>("");
  const [pageData, setPageData] = useState<GetLocationPostsResult>(initialdata);
  const [isLoading, setLoading] = useState<boolean>(
    (initialdata?.total ?? 0) == 0,
  );
  const limit = useMemo(() => tryParseNumber(pageSize, 10) ?? 9, [pageSize]);

  // Get the rendering properties from the pageData, but only when it changes
  const { topicOptions, total, items } = useMemo(() => {
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

    return { topicOptions, total, items };
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
    };
    console.log("Location post fetching params", params);
    const updateData = async () => {
      const newPageData = await getLocationPosts(params);
      if (cancelled) return;
      setPageData(newPageData);
      setLoading(false);
    };
    updateData();
    return () => {
      cancelled = true;
    };
  }, [parentKey, locale, pageSize, skip, topic]);

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
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left column - 1/4 width */}
        <div className="w-full lg:w-1/4 overflow-auto max-h-[calc(100vh-6rem)] sticky top-24">
          {isLoading ? (
            <LoadingState count={limit} parentId={parentKey} />
          ) : (
            items.filter(Utils.isNotNullOrUndefined).map((item) => {
              const key = item.metadata?.key;
              if (!key) return null;
              return (
                <div
                  key={key}
                  className="w-full mb-2 lg:mb-4 xl:mb-8 break-inside-avoid"
                >
                  <LocationPostCard
                    locationPost={{
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
                      published: item?.metadata?.published,
                    }}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Right column - 3/4 width */}
        <div className="w-full lg:w-3/4 h-[calc(100vh-6rem)] sticky top-24">
          <MapComponent
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
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
