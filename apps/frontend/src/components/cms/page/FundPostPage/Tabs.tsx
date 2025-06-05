"use client";
import React, { useState, useEffect } from "react";
import { CmsEditable } from "@remkoj/optimizely-cms-react/rsc";
import { HistoricalPriceGraph } from "../../component/ChartBlock/HistoricalPriceGraph";
import { BarChart } from "../../component/ChartBlock/BarChart";
import { HistoricalPriceGraph2 } from "../../component/ChartBlock/HistoricalPriceGraph2";
import { BarChart2 } from "../../component/ChartBlock/BarChart2";

export type TabItem = {
  id: string;
  label: string;
  title?: string;
  asOfDate?: string;
  chartType: "BarChart" | "BarChart2" | "HistoricalPriceGraph" | "HistoricalPriceGraph2";
};

export type TabsProps = {
  tabs?: TabItem[];
  inEditMode?: boolean;
};

export const Tabs = ({ tabs, inEditMode = false }: TabsProps) => {
  // Use provided tabs from CMS or fallback to default tabs
  const tabItems = tabs && tabs.length > 0 ? tabs : [
    {
      id: "tab1",
      label: "Monthly",
      asOfDate: "04/30/2025",
      chartType: "BarChart" as const
    },
    {
      id: "tab2",
      label: "Quarterly", 
      asOfDate: "03/31/2025",
      chartType: "BarChart2" as const
    },
    {
      id: "tab3",
      label: "Calendar Year",
      asOfDate: "12/31/2024",
      chartType: "BarChart" as const
    },
    {
      id: "tab4",
      label: "Cumulative",
      title: "Recent Activity",
      chartType: "HistoricalPriceGraph" as const
    },
    {
      id: "tab5",
      label: "Historical NAVs",
      title: "Recent Activity", 
      chartType: "HistoricalPriceGraph2" as const
    },
  ];

  // Initialize activeTab with the first available tab's ID
  const [activeTab, setActiveTab] = useState<string>(tabItems[0]?.id || "tab1");

  // Update activeTab if tabItems change and current activeTab is not valid
  useEffect(() => {
    if (!tabItems.find(tab => tab.id === activeTab)) {
      setActiveTab(tabItems[0]?.id || "tab1");
    }
  }, [tabItems, activeTab]);

  // Dynamic chart rendering based on CMS selection
  const renderChart = (chartType: TabItem['chartType']) => {
    console.log('🎨 renderChart called with:', chartType, typeof chartType);
    console.log('🎨 chartType strict equality checks:');
    console.log('  === "BarChart":', chartType === "BarChart");
    console.log('  === "BarChart2":', chartType === "BarChart2");
    console.log('  === "HistoricalPriceGraph":', chartType === "HistoricalPriceGraph");
    console.log('  === "HistoricalPriceGraph2":', chartType === "HistoricalPriceGraph2");
    
    switch (chartType) {
      case "BarChart":
        console.log('🎨 Rendering BarChart');
        return <BarChart />;
      case "BarChart2":
        console.log('🎨 Rendering BarChart2');
        return <BarChart2 />;
      case "HistoricalPriceGraph":
        console.log('🎨 Rendering HistoricalPriceGraph');
        return <HistoricalPriceGraph />;
      case "HistoricalPriceGraph2":
        console.log('🎨 Rendering HistoricalPriceGraph2');
        return <HistoricalPriceGraph2 />;
      default:
        console.warn('🎨 Unknown chart type, falling back to BarChart:', chartType);
        return <BarChart />; // Fallback
    }
  };

  const getTabContent = (tab: TabItem) => {
    return (
      <div className="p-4">
        {/* CMS Editable title/date header */}
        {(tab.title || tab.asOfDate) ? (
          <h2 className="text-xl font-semibold text-gray-800">
            {tab.title || (tab.asOfDate ? `as of ${tab.asOfDate}` : "")}
          </h2>
        ) : null}
        
        {/* Dynamically render chart based on CMS selection */}
        {renderChart(tab.chartType)}
        
        {/* Debug info in edit mode */}
        {inEditMode && (
          <div className="mt-4 p-2 bg-gray-100 text-xs text-gray-600">
            Chart Type: {tab.chartType} | Tab ID: {tab.id}
          </div>
        )}
      </div>
    );
  };

  // Find the active tab, fallback to first tab if not found
  const currentTab = tabItems.find((tab) => tab.id === activeTab) || tabItems[0];

  // If no tabs available, show a fallback
  if (!tabItems.length || !currentTab) {
    return (
      <div className="p-4">
        <p>No tabs configured</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-indigo-500 text-people-eater"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              data-cms-editable={inEditMode ? tab.id : undefined}
            >
              {/* CMS Editable tab label */}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {getTabContent(currentTab)}
      </div>
    </div>
  );
};
