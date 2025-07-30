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
    <div className="max-w-3xl mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent tracking-tight leading-tight">
        MG + Revenue Share Calculator
      </h2>

      
      <form
        className="grid grid-cols-1 gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          calculateRevenue();
        }}
      >
        {adTypes.map((type) => (
          <React.Fragment key={type}>
            {/* Row: Impressions + CPM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12">
                <span className="font-medium text-gray-300 min-w-[120px] text-sm">
                  {type} Impressions
                </span>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={inputs[type].impressions}
                  onChange={(e) =>
                    handleInputChange(type, "impressions", e.target.value)
                  }
                  className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
                />
              </div>
              <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12">
                <span className="font-medium text-gray-300 min-w-[120px] text-sm">
                  {type} CPM ({currencySymbol})
                </span>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={inputs[type].cpm}
                  onChange={(e) =>
                    handleInputChange(type, "cpm", e.target.value)
                  }
                  className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
                />
              </div>
            </div>

            {/* Row: CPI */}
            <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12">
              <span className="font-medium text-gray-300 min-w-[120px] text-sm">
                {type} CPI ({currencySymbol})
              </span>
              <input
                type="number"
                placeholder="e.g. 2"
                value={inputs[type].cpi}
                onChange={(e) => handleInputChange(type, "cpi", e.target.value)}
                className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
              />
            </div>
          </React.Fragment>
        ))}

        {/* SSAI & MG fields */}
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">
            SSAI Cost/1000
          </span>
          <input
            type="number"
            placeholder={`e.g. 2 (${currencySymbol})`}
            value={ssaiCost}
            onChange={(e) => setSsaiCost(e.target.value)}
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
          />
        </div>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">
            Minimum Guarantee
          </span>
          <input
            type="number"
            placeholder={`e.g. 1000 (${currencySymbol})`}
            value={minimumGuarantee}
            onChange={(e) => setMinimumGuarantee(e.target.value)}
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded shadow hover:from-blue-700 hover:to-purple-700 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Calculate Revenue
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold text-purple-500">Results</h3>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Gross Revenue (incl. MG):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.gross.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Total Impressions:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {results.totalImpressions}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Total Deductions:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.deductions.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Net Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.net.toFixed(2)}
            </div>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Platform Share (50%):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.shares.platform.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Content Creator (40% - 5% TDS):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.shares.creator.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              SCJ (10% incl. GST):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              {currencySymbol}
              {results.shares.scj.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MGCalculator;
