import React, { useState } from "react";
import CurrencyToggle from "./CurrencyToggle";
import PlatformSelector from "./PlatformSelector";

const adTypes = [
  "Pre Roll",
  "Mid Roll",
  "Post Roll",
  "Sponsored Overlay",
  "Banner",
];

const MGCalculator = () => {
  const [currency, setCurrency] = useState("INR");
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");

  const [inputs, setInputs] = useState(
    adTypes.reduce((acc, type) => {
      acc[type] = { impressions: "", cpm: "", cpi: "" };
      return acc;
    }, {})
  );

  const [ssaiCost, setSsaiCost] = useState("");
  const [minimumGuarantee, setMinimumGuarantee] = useState("");
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
      const cpi = parseFloat(inputs[type].cpi || 0);

      const revenue = (imp / 1000) * cpm + imp * cpi;

      breakdown[type] = revenue;
      gross += revenue;
      totalImpressions += imp;
    });

    const minG = parseFloat(minimumGuarantee || 0);
    gross += minG;

    const upkeep = 0.05 * gross;
    const ssai = (totalImpressions / 1000) * parseFloat(ssaiCost || 0);
    const deductions = upkeep + ssai;
    const net = gross - deductions;

    const platform = 0.5 * net;
    const creatorGross = 0.4 * net;
    const tds = 0.05 * creatorGross;
    const creator = creatorGross - tds;
    const scj = 0.1 * net;

    setResults({
      breakdown,
      minimumGuarantee: minG,
      gross,
      totalImpressions,
      deductions,
      net,
      shares: { platform, creator, scj },
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-xl font-semibold mb-4">
        MG + Revenue Share Calculator
      </h2>

      <CurrencyToggle currency={currency} setCurrency={setCurrency} />

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
              className="w-full mb-2 p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="number"
              placeholder={`CPI Rate (${currencySymbol})`}
              value={inputs[type].cpi}
              onChange={(e) => handleInputChange(type, "cpi", e.target.value)}
              className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
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
        <div>
          <label className="block mb-1 font-medium text-pink-400">Minimum Guarantee</label>
          <input
            type="number"
            placeholder={`Minimum Guarantee (${currencySymbol})`}
            value={minimumGuarantee}
            onChange={(e) => setMinimumGuarantee(e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
          />
        </div>
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
            <span className="font-bold text-gray-300 min-w-[180px]">Gross Revenue (incl. MG):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.gross.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">Total Impressions:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {results.totalImpressions}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">Total Deductions:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.deductions.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">Net Revenue:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.net.toFixed(2)}
            </div>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">Platform Share (50%):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.platform.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">Content Creator (40% - 5% TDS):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.creator.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[180px]">SCJ (10% incl. GST):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}{results.shares.scj.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MGCalculator;
