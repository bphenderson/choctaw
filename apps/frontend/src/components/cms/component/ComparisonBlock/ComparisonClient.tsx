"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { RichText } from "@remkoj/optimizely-cms-react";
import ButtonBlock from "../ButtonBlock";
import { getFragmentData } from "@gql/fragment-masking";
import {
  ReferenceDataFragmentDoc,
  ButtonBlockPropertyDataFragmentDoc,
  type ComparisonBlockDataFragment,
} from "@/gql/graphql";

// ❶  Describe the **single product** type that lives inside the fragment
type ComparisonProduct =
  NonNullable<
    NonNullable<ComparisonBlockDataFragment["products"]>[number]
  >;            // ⇡ remove array-nullability  ⇡ remove item-nullability

export default function ComparisonClient({
  products,
  factory              /* ← unused */
}: {
  // ❷  Use the correct type here
  products: ComparisonProduct[];
  factory?: any;        // optional, not used
}) {
  const blockRef = useRef(null);
  
  // Determine the grid column count based on the number of products
  const getGridClass = () => {
    const count = products.length;
    
    // Keep 2 columns for 1-2 products
    if (count <= 2) return "lg:grid-cols-2";
    
    // Use 3 columns for 3 products
    if (count === 3) return "lg:grid-cols-3";
    
    // Use 4 columns for 4 or more products
    return "lg:grid-cols-4";
  };
  
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
      // `featureRowsByIndex` is Record<number, Set<HTMLDivElement>>
      Object.values(featureRowsByIndex as Record<number, Set<HTMLDivElement>>)
        .forEach((rowGroup) => {
          // Convert the set to an array with a type the compiler understands
          const rows = Array.from(rowGroup as Set<HTMLDivElement>);
          
          // Find the tallest row
          const maxHeight = Math.max(...rows.map((row) => row.scrollHeight));
          
          // Apply that height to all rows in this group
          rows.forEach((row) => {
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
    <div className={`grid gap-6 ${getGridClass()}`} ref={blockRef}>
      {products.map((p, idx) => {
        const img   = getFragmentData(ReferenceDataFragmentDoc, p.productImage);
        // Filter out any null feature items right away
        const feats = (p.features ?? []).filter(
          (f): f is NonNullable<typeof f> => Boolean(f)
        );

        return (
          <div key={idx} className="border rounded-lg p-6 flex flex-col comparison-block">
            {img && (
              <Image
                /* the generated type doesn't expose `default`, but the field exists at runtime */
                src={(img.url as Record<string, string | undefined>)?.["default"] ?? ""}
                alt={p.productName ?? ""}
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
                  className="feature-row"
                  style={{borderBottom: "1px solid #ccc", padding: '0.5rem', marginBottom: '0.5rem', borderRadius: i % 2 === 1 ? '0.25rem' : '0'}}  
                >
                  <strong className="text-lg block mb-1">
                    {f.featureLabel ?? ""}
                  </strong>
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: f.featureDescription?.html ?? "",
                    }}
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
