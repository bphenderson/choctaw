import {
  type FundMetricsBlockDataFragment,
  FundMetricsBlockDataFragmentDoc,
} from "@/gql/graphql";
import type { DocumentNode } from "graphql";
import { type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import FundMetricsBlockClient from "./FundMetricsBlockClient";

export const FundMetricsBlockComponent: CmsComponent<
  Partial<FundMetricsBlockDataFragment>
> = ({ data, inEditMode = false }) => {
  return <FundMetricsBlockClient />;
};

FundMetricsBlockComponent.displayName = "Fund Metrics Block";
FundMetricsBlockComponent.getDataFragment = () => [
  "FundMetricsBlockData",
  FundMetricsBlockDataFragmentDoc,
];

export default FundMetricsBlockComponent;
