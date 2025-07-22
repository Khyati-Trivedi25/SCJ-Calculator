import React, { useState } from "react";
import PlatformSelector from "../components/PlatformSelector";
import CurrencyToggle from "../components/CurrencyToggle";
const CalculatorContainer = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");

  return (
    <div className="p-4">
      <PlatformSelector
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
      <CurrencyToggle currency={currency} setCurrency={setCurrency} />
    </div>
  );
};

export default CalculatorContainer;
