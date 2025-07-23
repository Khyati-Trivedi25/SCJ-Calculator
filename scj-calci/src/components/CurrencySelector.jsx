import React from "react";

const CurrencySelector = ({ currency, setCurrency }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Currency:</span>
      <button
        onClick={() => setCurrency("INR")}
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          currency === "INR"
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300 hover:border-black"
        }`}
      >
        ₹ INR
      </button>
      <button
        onClick={() => setCurrency("USD")}
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          currency === "USD"
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300 hover:border-black"
        }`}
      >
        $ USD
      </button>
    </div>
  );
};

export default CurrencySelector;
