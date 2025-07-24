import React, { useState } from "react";
import PlatformSelector from "../components/PlatformSelector";
import CurrencyToggle from "../components/CurrencyToggle";

const CalculatorContainer = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-tight">Professional Calculator</h2>
        <form className="space-y-6">
          <div className="mb-4">
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
          </div>
          <div className="mb-4">
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 via-pink-500 to-red-500 text-white shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled
          >
            Calculate (Demo)
          </button>
        </form>
      </div>
    </div>
  );
};

export default CalculatorContainer;
