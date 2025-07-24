import React, { useState } from "react";
import CurrencySymbol from "./CurrencySymbol";

const TVODCalculator = ({ currency }) => {
  const [inputs, setInputs] = useState({
    transactions: "",
    ticketPrice: "",
  });
  const [showResults, setShowResults] = useState(false);

  const totalTransactions = parseFloat(inputs.transactions) || 0;
  const pricePerTicket = parseFloat(inputs.ticketPrice) || 0;

  // Deductions
  const gstAmount = pricePerTicket * 0.18;
  const transactionFee = currency === "INR" ? 3 : 0.1;
  const inAppFee = pricePerTicket * 0.3;

  const netPerTicket = pricePerTicket - gstAmount - transactionFee - inAppFee;
  const grossRevenue = totalTransactions * netPerTicket;

  const platformShare = grossRevenue * 0.5;
  const contentCreatorShare = grossRevenue * 0.4 * 0.95; // After 5% TDS
  const scjShare = grossRevenue * 0.1;

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">TVOD Revenue Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="p-2 border border-neutral-700 rounded-lg bg-neutral-900">
          <label className="font-medium text-pink-400 mb-1 block">Total Transactions</label>
          <input
            type="number"
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
            value={inputs.transactions}
            onChange={(e) => handleInputChange("transactions", e.target.value)}
            placeholder="e.g. 1500"
          />
        </div>
        <div className="p-2 border border-neutral-700 rounded-lg bg-neutral-900">
          <label className="font-medium text-pink-400 mb-1 block">Ticket Price ({currency})</label>
          <input
            type="number"
            className="w-full p-2 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
            value={inputs.ticketPrice}
            onChange={(e) => handleInputChange("ticketPrice", e.target.value)}
            placeholder="e.g. 120 or 1.99"
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
            <span className="font-bold text-gray-300 min-w-[160px]">Net Per Ticket (after GST, platform & transaction fee):</span>
            <div className="flex-1 p-2 border border-neutral-700 rounded bg-neutral-800 text-white text-right">
              <CurrencySymbol currency={currency} />{netPerTicket.toFixed(2)}
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
              <CurrencySymbol currency={currency} />{contentCreatorShare.toFixed(2)}
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

export default TVODCalculator;
