import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import {
  ChartBlockDataFragment,
  ChartBlockDataFragmentDoc,
} from "@/gql/graphql";

const HistoricalPriceGraph = dynamic(
  () =>
    import("./HistoricalPriceGraph").then((mod) => mod.HistoricalPriceGraph),
  { ssr: false },
);

export const ChartBlockComponent: CmsComponent<ChartBlockDataFragment> = () => {
  return (
    <div className="w-full p-4">
      <HistoricalPriceGraph />
    </div>
  );
};

ChartBlockComponent.displayName = "Chart Block";
ChartBlockComponent.getDataFragment = () => [
  "ChartBlockData",
  ChartBlockDataFragmentDoc,
];

export default ChartBlockComponent;
