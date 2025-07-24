import React, { useState, useEffect } from "react";
import CurrencySymbol from "./CurrencySymbol";

const CARCalculator = ({ currency, onRevenueChange }) => {
  const [inputs, setInputs] = useState({
    adRequests: "",
    car: "",
    ssaiCost: "",
  });
  const [results, setResults] = useState(null);

  const totalAdRequests = parseFloat(inputs.adRequests) || 0;
  const costPerAdRequest = parseFloat(inputs.car) || 0;
  const ssai = (parseFloat(inputs.ssaiCost) || 0) * (totalAdRequests / 1000);

  const grossRevenue = totalAdRequests * costPerAdRequest;
  const dashboardUpkeep = grossRevenue * 0.05;
  const deductions = ssai + dashboardUpkeep;
  const netRevenue = grossRevenue - deductions;

  const platformShare = netRevenue * 0.5;
  const contentShareAfterTDS = netRevenue * 0.4 * 0.95;
  const scjShare = netRevenue * 0.1;

  useEffect(() => {
    if (onRevenueChange) {
      onRevenueChange(netRevenue);
    }
  }, [netRevenue, onRevenueChange]);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight leading-tight">CAR (Cost per Ad Request) Calculator</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={e => { e.preventDefault(); setResults(true); }}>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">Total Ad Requests</span>
          <input
            type="number"
            placeholder="e.g. 200000"
            value={inputs.adRequests}
            onChange={e => handleInputChange("adRequests", e.target.value)}
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
          />
        </div>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">CAR ({currency})</span>
          <input
            type="number"
            placeholder="e.g. 0.05"
            value={inputs.car}
            onChange={e => handleInputChange("car", e.target.value)}
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
          />
        </div>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 md:col-span-2 min-w-[220px]">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">SSAI Cost/1000</span>
          <input
            type="number"
            placeholder="e.g. 2"
            value={inputs.ssaiCost}
            onChange={e => handleInputChange("ssaiCost", e.target.value)}
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded shadow hover:from-blue-700 hover:to-purple-700 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Create Revenue
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold text-purple-500">Results</h3>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Gross Revenue:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{grossRevenue.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Deductions:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{deductions.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Net Revenue:</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{netRevenue.toFixed(2)}
            </div>
          </div>
          <hr className="border-0 h-1 bg-gray-700 opacity-30 my-2" />
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Platform Share (50%):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{platformShare.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">Content Creator (40% - 5% TDS):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{contentShareAfterTDS.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">SCJ Share (10% incl. GST):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{scjShare.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CARCalculator;
