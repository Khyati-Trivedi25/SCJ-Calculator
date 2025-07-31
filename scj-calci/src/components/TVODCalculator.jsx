import React, { useState } from "react";
import CurrencySymbol from "./CurrencySymbol";

const TVODCalculator = ({ currency }) => {
  const [inputs, setInputs] = useState({
    androidRent: "",
    androidBuy: "",
    iosRent: "",
    iosBuy: "",
    androidRentPrice: "",
    androidBuyPrice: "",
    iosRentPrice: "",
    iosBuyPrice: "",
  });
  const [showResults, setShowResults] = useState(false);

  const parse = (val) => parseFloat(val) || 0;

  const calculateNet = (platformKey) => {
    const priceKey = platformKey + "Price";
    const ticketPrice = parse(inputs[priceKey]);
    const gst = ticketPrice * 0.18;
    const transactionFee = currency === "INR" ? 3 : 0.1;
    const isIOS = platformKey.includes("ios");
    const inAppFee = isIOS ? ticketPrice * 0.25 : 0;
    return ticketPrice - gst - transactionFee - inAppFee;
  };

  const calcRevenue = (platformKey) => {
    const streams = parse(inputs[platformKey]);
    const net = calculateNet(platformKey);
    return {
      streams,
      net,
      gross: streams * net,
    };
  };

  const androidRent = calcRevenue("androidRent");
  const androidBuy = calcRevenue("androidBuy");
  const iosRent = calcRevenue("iosRent");
  const iosBuy = calcRevenue("iosBuy");

  const totalRevenue =
    androidRent.gross + androidBuy.gross + iosRent.gross + iosBuy.gross;
  const platformShare = totalRevenue * 0.3;
  const netRevenue = totalRevenue - platformShare;

  const contentCreatorShare = netRevenue * 0.75 * 0.95; // 5% TDS
  const scjShare = netRevenue * 0.25;

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent tracking-tight leading-tight">
        TVOD Revenue Calculator
      </h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          setShowResults(true);
        }}
      >
        {[
          ["androidRent", "Android Rent"],
          ["androidBuy", "Android Buy"],
          ["iosRent", "iOS Rent"],
          ["iosBuy", "iOS Buy"],
        ].map(([key, label]) => (
          <div
            key={key}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2"
          >
            {/* Streams */}
            <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
              <span className="font-medium text-gray-300 min-w-[120px] text-sm">
                {label} Streams
              </span>
              <input
                type="number"
                className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
                value={inputs[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder="e.g. 100"
              />
            </div>
            {/* Price */}
            <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
              <span className="font-medium text-gray-300 min-w-[120px] text-sm">
                {label} Price ({currency})
              </span>
              <input
                type="number"
                className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
                value={inputs[key + "Price"]}
                onChange={(e) => handleInputChange(key + "Price", e.target.value)}
                placeholder="e.g. 120 or 1.99"
              />
            </div>
          </div>
        ))}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded shadow hover:from-blue-700 hover:to-purple-700 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Calculate Revenue
          </button>
        </div>
      </form>

      {showResults && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold text-purple-500">Results</h3>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Android Rent Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {androidRent.gross.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Android Buy Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {androidBuy.gross.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              iOS Rent Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {iosRent.gross.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              iOS Buy Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {iosBuy.gross.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Total Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {totalRevenue.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Platform Share (30%):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {platformShare.toFixed(2)}
            </div>
          </div>
          

          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Net Revenue:
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {netRevenue.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              Content Creator (75% - 5% TDS):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {contentCreatorShare.toFixed(2)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 min-w-[160px]">
              SCJ Share (25% incl. GST):
            </span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />
              {scjShare.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVODCalculator;