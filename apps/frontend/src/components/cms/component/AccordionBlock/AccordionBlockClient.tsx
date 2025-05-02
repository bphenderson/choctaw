"use client";

import React, { useState } from "react";
import { RichText } from "@remkoj/optimizely-cms-react"; // <-- Client-safe import
import type { AccordionBlockDataFragment } from "@/gql/graphql";

export default function AccordionBlockClient({
  data,
}: {
  data: AccordionBlockDataFragment;
}) {
  const initialOpenStates = (data.items ?? []).map(
    (item) => !!(item?.itemOpenByDefault ?? false),
  );
  const [openStates, setOpenStates] = useState<boolean[]>(initialOpenStates);

  const toggleItem = (index: number) => {
    setOpenStates((prev) => {
      if (data.multipleOpenItems) {
        const newStates = [...prev];
        newStates[index] = !newStates[index];
        return newStates;
      } else {
        return prev.map((_, i) => (i === index ? !prev[i] : false));
      }
    });
  };

  return (
    <div className="accordion-items divide-y divide-gray-300 dark:divide-gray-600 rounded-[1rem] overflow-hidden">
      {(data.items ?? []).map((item, idx) => (
        <div key={idx} className="accordion-item">
          <h3 className="m-0">
            <button
              className="flex justify-between items-center w-full text-left py-4 px-6 font-medium text-vulcan dark:text-ghost-white hover:bg-azure/5 dark:hover:bg-verdansk/5 transition-colors"
              onClick={() => toggleItem(idx)}
              aria-expanded={openStates[idx]}
            >
              <span className="text-lg">{item?.itemTitle}</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-azure/10 dark:bg-verdansk/10 text-azure dark:text-verdansk font-semibold text-xl">
                {openStates[idx] ? "−" : "+"}
              </span>
            </button>
          </h3>
          {openStates[idx] && (
            <div className="accordion-content py-2 px-6 pb-6 prose dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: item?.itemContent?.html }}
                className="text-vulcan-85 dark:text-ghost-white"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
