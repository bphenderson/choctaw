"use client";

import React from "react";
import Image from "next/image";
import { RichText } from "@remkoj/optimizely-cms-react";
import ButtonBlock from "../ButtonBlock";
import { getFragmentData } from "@gql/fragment-masking";
import {
  ReferenceDataFragmentDoc,
  ButtonBlockPropertyDataFragmentDoc,
  type ComparisonItemBlockDataFragment
} from "@/gql/graphql";

export default function ComparisonClient({
  products,
  factory              /* ← receive it */
}: {
  products: ComparisonItemBlockDataFragment[];
  factory: any;         /* (type is internal) */
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p, idx) => {
        const img   = getFragmentData(ReferenceDataFragmentDoc, p.productImage);
        const cta   = getFragmentData(ButtonBlockPropertyDataFragmentDoc, p.cta);
        const feats = p.features ?? [];

        return (
          <div key={idx} className="border rounded-lg p-6 flex flex-col">
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

            <div className="list-disc list-inside space-y-1 mb-4 text-sm leading-relaxed">
  {feats.map((f, i) => (
    <div key={i}>
      <strong>{f.featureLabel}</strong>
      <span
        dangerouslySetInnerHTML={{ __html: f.featureDescription.html }}
      />
    </div>
  ))}
</div>

            {cta && <ButtonBlock data={cta} />}
          </div>
        );
      })}
    </div>
  );
}
