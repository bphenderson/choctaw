import "server-only";

export type TabItemProps = {
  data: {
    TabId: string;
    TabLabel: string;
    TabTitle?: string;
    AsOfDate?: string;
    ChartType: "BarChart" | "BarChart2" | "HistoricalPriceGraph" | "HistoricalPriceGraph2";
  };
  inEditMode: boolean;
  contentLink?: any;
};

// This component doesn't render anything directly - it's just a data container
export const TabItem = ({ data }: TabItemProps) => {
  return null;
};

export default TabItem;
