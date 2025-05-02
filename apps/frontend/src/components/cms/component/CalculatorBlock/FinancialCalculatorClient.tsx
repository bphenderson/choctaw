"use client";
import React, { useState } from "react";
import { CalculatorConfig, calculatorConfigs } from "./calculatorConfigs";

export default function FinancialCalculatorClient() {
  const [calculatorType, setCalculatorType] = useState(
    Object.keys(calculatorConfigs)[0],
  );
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState("");

  const config: CalculatorConfig = calculatorConfigs[calculatorType];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedData: Record<string, string | number> = {};
    config.inputs.forEach((input) => {
      parsedData[input.name] =
        input.type === "number"
          ? parseFloat(String(formData[input.name] || input.default))
          : formData[input.name] || input.default;
    });
    const result = config.calculate(parsedData);
    setResult(result);
  };

  return (
    <>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={calculatorType}
        onChange={(e) => {
          setCalculatorType(e.target.value);
          setFormData({});
          setResult("");
        }}
      >
        {Object.keys(calculatorConfigs).map((key) => (
          <option key={key} value={key}>
            {calculatorConfigs[key].label}
          </option>
        ))}
      </select>
      <div className="mb-4 p-4 bg-gray-50 rounded border">
        <h2 className="text-lg font-semibold mb-2">About This Calculator</h2>
        <p className="text-sm text-gray-700">{config.explanation}</p>
      </div>
      <form onSubmit={handleSubmit} id="calculator-form">
        {config.inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {input.label}
            </label>
            {input.type === "select" ? (
              <select
                name={input.name}
                value={String(formData[input.name] || input.default)}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                {input.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={input.type}
                name={input.name}
                value={String(formData[input.name] || input.default)}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                min="0"
                step={input.type === "number" ? "0.01" : undefined}
              />
            )}
          </div>
        ))}
        <a
          className="btn--primary btn--cta block w-fit mx-auto"
          onClick={handleSubmit}
          href="javascript:{}"
        >
          <div class="btn__content">Calculate</div>
        </a>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded border">
          <h2 className="text-lg font-semibold">Result</h2>
          <p>{result}</p>
        </div>
      )}
    </>
  );
}
