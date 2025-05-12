"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { RichText } from "@remkoj/optimizely-cms-react";
import ButtonBlock from "../ButtonBlock";
import { getFragmentData } from "@gql/fragment-masking";
import {
  ReferenceDataFragmentDoc,
  ButtonBlockPropertyDataFragmentDoc,
  type ComparisonBlockDataFragment
} from "@/gql/graphql";

export default function ComparisonClient({
  products,
  factory              /* ← receive it */
}: {
  products: ComparisonBlockDataFragment[];
  factory: any;         /* (type is internal) */
}) {
  const blockRef = useRef(null);
  
  // Align feature rows across all comparison blocks on the page
  useEffect(() => {
    if (!blockRef.current) return;
    
    // Function to align feature rows
    const alignFeatureRows = () => {
      // Get all comparison blocks
      const allBlocks = document.querySelectorAll('.comparison-block');
      if (allBlocks.length <= 1) return; // No need to align if only one block
      
      // Get all feature rows from all blocks
      const featureRowsByIndex = {};
      
      allBlocks.forEach(block => {
        const featureRows = block.querySelectorAll('.feature-row');
        featureRows.forEach((row, index) => {
          if (!featureRowsByIndex[index]) featureRowsByIndex[index] = [];
          featureRowsByIndex[index].push(row);
        });
      });
      
      // Set equal heights for each row across blocks
      Object.values(featureRowsByIndex).forEach(rowGroup => {
        // Find tallest row
        const maxHeight = Math.max(...Array.from(rowGroup).map(row => row.scrollHeight));
        // Apply height to all rows in this group
        rowGroup.forEach(row => {
          row.style.minHeight = `${maxHeight}px`;
        });
      });
    };
    
    // Run alignment after render and on window resize
    alignFeatureRows();
    window.addEventListener('resize', alignFeatureRows);
    
    return () => {
      window.removeEventListener('resize', alignFeatureRows);
    };
  }, [products]);

  return (
    <div className="grid gap-6 lg:grid-cols-2" ref={blockRef}>
      {products.map((p, idx) => {
        const img   = getFragmentData(ReferenceDataFragmentDoc, p.productImage);
        const cta   = getFragmentData(ButtonBlockPropertyDataFragmentDoc, p.cta);
        const feats = p.features ?? [];

        return (
          <div key={idx} className="border rounded-lg p-6 flex flex-col comparison-block">
            {img && (
              <Image
                src={img.url?.default ?? ""}
                alt={p.productName}
                width={400}
                height={260}
                className="rounded mb-4 object-contain"
              />
            )}

            <h3 className="text-xl font-semibold mb-2">{p.productName}</h3>

            <div className="mb-4 text-sm leading-relaxed w-full">
              {feats.map((f, i) => (
                <div 
                  key={i} 
                
                  style={{borderBottom: "1px solid #ccc", padding: '0.5rem', marginBottom: '0.5rem', borderRadius: i % 2 === 1 ? '0.25rem' : '0'}}  
                >
                  <strong className="text-lg block mb-1">{f.featureLabel}</strong>
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: f.featureDescription.html }}
                  />
                </div>
              ))}
            </div>

            <a
              className="btn--primary btn--cta block w-fit mx-auto mt-auto"
              href="javascript:{}"
            >
              <div className="btn__content">Learn More</div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
