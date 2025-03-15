"use client";
import React from "react";
import SelectElement from "./Darko/SelectElement";
import DarkoButton from "./Darko/DarkoButton";

const Demo = () => {
  const [upperBoundText, setUpperBoundText] = React.useState("10");
  const [lowerBoundText, setLowerBoundText] = React.useState("0");
  const [upperBound, setUpperBound] = React.useState(10);
  const [lowerBound, setLowerBound] = React.useState(0);
  const [keyType, setKeyType] = React.useState<"RANDOM" | "RANGE">("RANDOM");
  const [numberType, setNumberType] = React.useState<"INTEGER" | "FLOAT">(
    "INTEGER",
  );
  const [result, setResult] = React.useState<number | string>("0");
  // Generate random number logic
  const generateRandomNumber = () => {
    if (numberType === "INTEGER") {
      return (
        Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER * 2 + 1)) -
        Number.MAX_SAFE_INTEGER
      );
    } else {
      // For FLOAT, decide on a random magnitude and generate a number with that magnitude
      const magnitude = Math.floor(Math.random() * 300) - 150; // Random magnitude between -150 and +150
      const randomValue =
        Math.random() * 10 ** magnitude * (Math.random() > 0.5 ? 1 : -1);
      return randomValue;
    }
  };

  return (
    <div className="mx-auto flex w-3/5 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-1">
            <span>Key Type</span>
            <SelectElement
              disabled={false}
              selected={{
                value: keyType,
                label: keyType === "RANDOM" ? "Random" : "Range",
              }}
              options={[
                { label: "Random", value: "RANDOM" },
                { label: "Range", value: "RANGE" },
              ]}
              setSelected={(option) => {
                if (option) {
                  setKeyType(option.value as "RANDOM" | "RANGE");
                }
              }}
              placeholder="Select Key Type"
            />
          </div>
        </div>

        {keyType === "RANGE" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span>Lower Bound</span>
              <input
                type="number"
                value={lowerBoundText}
                onChange={(e) => {
                  const value = e.target.value.replace(/^0/g, "");
                  setLowerBoundText(value);
                  setLowerBound(parseFloat(value));
                }}
                className="border-background-800 placeholder:text-text-200 focus:border-background-600 w-full rounded-lg border bg-transparent p-3 invalid:border-red-300 focus:outline-none"
                placeholder="Lower Bound"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Upper Bound</span>
              <input
                type="number"
                value={upperBoundText}
                onChange={(e) => {
                  const value = e.target.value.replace(/^0/g, "");
                  setUpperBoundText(value);
                  setUpperBound(parseFloat(value));
                }}
                className="border-background-800 placeholder:text-text-200 focus:border-background-600 w-full rounded-lg border bg-transparent p-3 invalid:border-red-300 focus:outline-none"
                placeholder="Upper Bound"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span>Number Type</span>
          <SelectElement
            disabled={false}
            selected={{
              value: numberType,
              label: numberType === "INTEGER" ? "Integer" : "Float",
            }}
            options={[
              { label: "Integer", value: "INTEGER" },
              { label: "Float", value: "FLOAT" },
            ]}
            setSelected={(option) => {
              if (option) {
                setNumberType(option.value as "INTEGER" | "FLOAT");
              }
            }}
            placeholder="Select Number Type"
          />
        </div>

        <DarkoButton
          variant="ghost"
          onClick={() => setResult(generateRandomNumber())}
        >
          Generate
        </DarkoButton>

        <div className="mt-4">
          <span className="font-semibold">Result:</span> <span>{result}</span>
        </div>
      </div>
    </div>
  );
};

export default Demo;
