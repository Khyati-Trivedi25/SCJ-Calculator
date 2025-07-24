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
    <div className="max-w-3xl mx-auto p-6 bg-neutral-900 rounded-xl shadow text-white">
      <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent tracking-tight leading-tight">TVOD Revenue Calculator</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={e => { e.preventDefault(); setShowResults(true); }}>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">Total Transactions</span>
          <input
            type="number"
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
            value={inputs.transactions}
            onChange={e => handleInputChange("transactions", e.target.value)}
            placeholder="e.g. 1500"
          />
        </div>
        <div className="flex items-center gap-2 p-2 border border-neutral-700 rounded bg-neutral-900 h-12 min-w-[220px]">
          <span className="font-medium text-gray-300 min-w-[120px] text-sm">Ticket Price ({currency})</span>
          <input
            type="number"
            className="flex-1 p-1 border border-neutral-700 rounded bg-neutral-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-right text-sm h-8"
            value={inputs.ticketPrice}
            onChange={e => handleInputChange("ticketPrice", e.target.value)}
            placeholder="e.g. 120 or 1.99"
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

      {showResults && (
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold text-purple-500">Results</h3>
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
