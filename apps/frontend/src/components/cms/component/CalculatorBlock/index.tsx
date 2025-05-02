import React, { useState } from "react";
import { CmsImage } from "@/components/shared/cms_image";
import {
  CmsEditable,
  type CmsComponent,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import { CalculatorBlock } from "@gql/graphql";
import {
  CalculatorBlockDataFragment,
  CalculatorBlockDataFragmentDoc,
} from "@/gql/graphql";
import { calculatorConfigs } from "./calculatorConfigs";
import FinancialCalculatorClient from "./FinancialCalculatorClient";

export const CalculatorBlockComponent: CmsComponent<
  CalculatorBlockDataFragment
> = ({ data: { Name, Bio, ProfileImage } }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Financial Calculators
        </h1>
        <FinancialCalculatorClient />
      </div>
    </div>
  );
};

CalculatorBlockComponent.displayName =
  "Calculator Block (Component/CalculatorBlock)";
CalculatorBlockComponent.getDataFragment = () => [
  "CalculatorBlockData",
  CalculatorBlockDataFragmentDoc,
];

export default CalculatorBlockComponent;
