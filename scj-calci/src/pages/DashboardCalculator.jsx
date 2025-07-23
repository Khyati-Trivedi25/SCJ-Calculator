import React, { useState } from "react";
import CPMCalculator from "../components/CPMCalculator";
import CPICalculator from "../components/CPICalculator";
import MGCalculator from "../components/MGCalculator";
import CARCalculator from "../components/CARCalculator";
import TVODCalculator from "../components/TVODCalculator";
import Sidebar from "../components/Sidebar";
import PlatformSelector from "../components/PlatformSelector";
import CurrencyToggle from "../components/CurrencyToggle";

const DashboardCalculator = () => {
  const [selectedModel, setSelectedModel] = useState("CPM");
  const [currency, setCurrency] = useState("INR");
  const [platform, setPlatform] = useState("YouTube");

  const renderCalculator = () => {
    switch (selectedModel) {
      case "CPM":
        return <CPMCalculator currency={currency} />;
      case "CPI":
        return <CPICalculator currency={currency} />;
      case "MG":
        return <MGCalculator currency={currency} />;
      case "CAR":
        return <CARCalculator currency={currency} />;
      case "TVOD":
        return <TVODCalculator currency={currency} />;
      default:
        return <div>Select a model from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar selectedModel={selectedModel} onSelectModel={setSelectedModel} />

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PlatformSelector selected={platform} onChange={setPlatform} />
          <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        </div>

        {/* Calculator View */}
        <div className="mt-4">{renderCalculator()}</div>
      </div>
    </div>
  );
};

export default DashboardCalculator;
