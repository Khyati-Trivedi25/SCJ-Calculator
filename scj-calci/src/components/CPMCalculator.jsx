import React, { useState, useEffect } from "react";
import CurrencyToggle from "./CurrencyToggle";

const adTypes = [
  "Pre Roll",
  "Mid Roll",
  "Post Roll",
  "Sponsored Overlay",
  "Banner",
];

const CPMCalculator = ({ currency, platformName, onRevenueChange }) => {
  const [inputs, setInputs] = useState(
    adTypes.reduce((acc, type) => {
      acc[type] = { impressions: "", cpm: "" };
      return acc;
    }, {})
  );

  const [ssaiCost, setSsaiCost] = useState("");
  const [results, setResults] = useState(null);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const handleInputChange = (type, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const calculateRevenue = () => {
    let gross = 0;
    let totalImpressions = 0;
    const breakdown = {};

    adTypes.forEach((type) => {
      const imp = parseFloat(inputs[type].impressions || 0);
      const cpm = parseFloat(inputs[type].cpm || 0);
      const revenue = (imp / 1000) * cpm;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(ssaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    const finalResults = {
      breakdown,
      gross,
      totalImpressions,
      deductions,
      net,
      shares: { platform, creator, scj },
    };

    setResults(finalResults);
    if (onRevenueChange) onRevenueChange(net);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        CPM Revenue Calculator – {platformName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {adTypes.map((type) => (
          <div key={type} className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">{type}</h4>
            <input
              type="number"
              placeholder="Ad Impressions"
              value={inputs[type].impressions}
              onChange={(e) =>
                handleInputChange(type, "impressions", e.target.value)
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder={`CPM Rate (${currencySymbol})`}
              value={inputs[type].cpm}
              onChange={(e) => handleInputChange(type, "cpm", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block mb-1 font-medium">
          SSAI Cost per 1000 Impressions
        </label>
        <input
          type="number"
          placeholder={`SSAI Cost (${currencySymbol})`}
          value={ssaiCost}
          onChange={(e) => setSsaiCost(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={calculateRevenue}
        className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Calculate Revenue
      </button>

      {results && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Results</h3>
          <div>
            <p>
              Gross Revenue:{" "}
              <strong>
                {currencySymbol}
                {results.gross.toFixed(2)}
              </strong>
            </p>
            <p>
              Total Impressions: <strong>{results.totalImpressions}</strong>
            </p>
            <p>
              Total Deductions:{" "}
              <strong>
                {currencySymbol}
                {results.deductions.toFixed(2)}
              </strong>
            </p>
            <p>
              Net Revenue:{" "}
              <strong>
                {currencySymbol}
                {results.net.toFixed(2)}
              </strong>
            </p>
          </div>
          <div className="border-t pt-4">
            <p>
              Platform Share (50%):{" "}
              <strong>
                {currencySymbol}
                {results.shares.platform.toFixed(2)}
              </strong>
            </p>
            <p>
              Content Creator (40% - 5% TDS):{" "}
              <strong>
                {currencySymbol}
                {results.shares.creator.toFixed(2)}
              </strong>
            </p>
            <p>
              SCJ (10% incl. GST):{" "}
              <strong>
                {currencySymbol}
                {results.shares.scj.toFixed(2)}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CPMCalculator;
