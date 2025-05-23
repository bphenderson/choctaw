"use client";
import React, { useState } from "react";
import { HistoricalPriceGraph } from "../../component/ChartBlock/HistoricalPriceGraph";
import { BarChart } from "../../component/ChartBlock/BarChart";
import { HistoricalPriceGraph2 } from "../../component/ChartBlock/HistoricalPriceGraph2";
import { BarChart2 } from "../../component/ChartBlock/BarChart2";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {
      id: "tab1",
      label: "Monthly",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            as of 04/30/2025
          </h2>

          <BarChart />
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Quarterly",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            as of 03/31/2025
          </h2>

          <BarChart2 />
        </div>
      ),
    },
    {
      id: "tab3",
      label: "Calendar Year",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            as of 12/31/2024
          </h2>

          <BarChart />
        </div>
      ),
    },
    {
      id: "tab4",
      label: "Cumulative",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>

          <HistoricalPriceGraph />
        </div>
      ),
    },
    {
      id: "tab5",
      label: "Historical NAVs",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>

          <HistoricalPriceGraph2 />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-indigo-500 text-people-eater"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
