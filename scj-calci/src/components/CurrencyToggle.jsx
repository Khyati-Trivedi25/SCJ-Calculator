import React from "react";

const CurrencyToggle = ({ currency, setCurrency }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Currency
      </label>
      <div className="inline-flex rounded-full border border-gray-300 overflow-hidden">
        <button
          onClick={() => setCurrency("INR")}
          className={`px-4 py-2 text-sm font-medium ${
            currency === "INR"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          ₹ Rupees
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={`px-4 py-2 text-sm font-medium ${
            currency === "USD"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          $ Dollars
        </button>
      </div>
    </div>
  );
};

export default CurrencyToggle;
