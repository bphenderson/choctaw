import "server-only";
import { Tabs } from "../../page/FundPostPage/Tabs";

export type FundTabsProps = {
  data?: {
    TabItems?: Array<{
      TabId: string;
      TabLabel: string;
      TabTitle?: string;
      AsOfDate?: string;
      ChartType: "BarChart" | "BarChart2" | "HistoricalPriceGraph" | "HistoricalPriceGraph2";
    }>;
  };
  inEditMode?: boolean;
  contentLink?: any;
};

export const FundTabs = ({ data, inEditMode = false }: FundTabsProps) => {
  // Handle case where data is missing or TabItems is empty
  if (!data || !data.TabItems || data.TabItems.length === 0) {
    console.log('No TabItems data available, using fallback');
    return <Tabs inEditMode={inEditMode} />;
  }

  // Debug: Log the raw CMS data
  console.log('🔍 Raw CMS data:', data);
  console.log('🔍 TabItems from CMS:', data.TabItems);

  // Transform CMS data to component props with proper mapping
  const tabs = data.TabItems.map((item, index) => {
    console.log(`🔍 Processing TabItem ${index}:`, item);
    console.log(`🔍 ChartType for ${item.TabLabel}:`, item.ChartType, typeof item.ChartType);
    
    return {
      id: item.TabId || `tab-${Math.random()}`,
      label: item.TabLabel || 'Untitled Tab',
      title: item.TabTitle,
      asOfDate: item.AsOfDate,
      chartType: item.ChartType || 'BarChart' as const
    };
  });

  console.log('🔍 Transformed tabs data:', tabs);

  return <Tabs tabs={tabs} inEditMode={inEditMode} />;
};

export default FundTabs;
