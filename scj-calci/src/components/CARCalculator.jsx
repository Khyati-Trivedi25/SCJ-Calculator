import React, { useState, useEffect } from "react";
import CurrencySymbol from "./CurrencySymbol";

const CARCalculator = ({ currency, onRevenueChange }) => {
  const [inputs, setInputs] = useState({
    adRequests: "",
    car: "",
    ssaiCost: "",
  });
  const [showResults, setShowResults] = useState(false);

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
    setShowResults(false);
    if (onRevenueChange) {
      onRevenueChange(netRevenue);
    }
    // eslint-disable-next-line
  }, [inputs.adRequests, inputs.car, inputs.ssaiCost]);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        CAR (Cost per Ad Request) Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="p-2 border border-neutral-700 rounded-lg bg-neutral-900">
          <label className="font-medium text-pink-400 mb-1 block">Total Ad Requests</label>
          <input
            type="number"
            placeholder="e.g. 200000"
            value={inputs.adRequests}
            onChange={(e) => handleInputChange("adRequests", e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="p-2 border border-neutral-700 rounded-lg bg-neutral-900">
          <label className="font-medium text-pink-400 mb-1 block">CAR (INR)</label>
          <input
            type="number"
            placeholder="e.g. 0.05"
            value={inputs.car}
            onChange={(e) => handleInputChange("car", e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="p-2 border border-neutral-700 rounded-lg bg-neutral-900 md:col-span-2">
          <label className="font-medium text-pink-400 mb-1 block">SSAI Cost per 1000 Requests</label>
          <input
            type="number"
            placeholder="e.g. 2"
            value={inputs.ssaiCost}
            onChange={(e) => handleInputChange("ssaiCost", e.target.value)}
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded shadow hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
        onClick={() => setShowResults(true)}
      >
        Create Revenue
      </button>

      {showResults && (
        <div className="mt-6 space-y-3">
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
