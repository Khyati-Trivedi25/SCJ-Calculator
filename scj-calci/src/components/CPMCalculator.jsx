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

    // Restore static shares
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
    <div className="max-w-lg mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-xl font-semibold mb-4">
        CPM Revenue Calculator – {platformName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        {adTypes.map((type) => (
          <div key={type} className="p-2 border border-neutral-700 rounded-lg bg-neutral-900">
            <h4 className="font-medium mb-2 text-pink-400">{type}</h4>
            <input
              type="number"
              placeholder="Ad Impressions"
              value={inputs[type].impressions}
              onChange={(e) =>
                handleInputChange(type, "impressions", e.target.value)
              }
              className="w-full mb-2 p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="number"
              placeholder={`CPM Rate (${currencySymbol})`}
              value={inputs[type].cpm}
              onChange={(e) => handleInputChange(type, "cpm", e.target.value)}
              className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium text-pink-400">
          SSAI Cost per 1000 Impressions
        </label>
        <input
          type="number"
          placeholder={`SSAI Cost (${currencySymbol})`}
          value={ssaiCost}
          onChange={(e) => setSsaiCost(e.target.value)}
          className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <button
        onClick={calculateRevenue}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded shadow hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        Calculate Revenue
      </button>

      {results && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Gross Revenue:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.gross.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Total Impressions:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {results.totalImpressions}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Total Deductions:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.deductions.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Net Revenue:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.net.toFixed(2)}
            </div>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Platform Share (50%):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.platform.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Production Share (40% - 5% TDS):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.creator.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">SCJ Entertainment (10%):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.scj.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CPMCalculator;
