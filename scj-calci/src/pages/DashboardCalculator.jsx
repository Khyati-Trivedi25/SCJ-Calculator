import React, { useState } from "react";
import CPMCalculator from "../components/CPMCalculator";
import CPICalculator from "../components/CPICalculator";
import MGCalculator from "../components/MGCalculator";
import CARCalculator from "../components/CARCalculator";
import TVODCalculator from "../components/TVODCalculator";
import Sidebar from "../components/Sidebar";
import CurrencyToggle from "../components/CurrencyToggle";
import CurrencySymbol from "../components/CurrencySymbol";
import PlatformSelector from "../components/PlatformSelector";

const DashboardCalculator = () => {
  const [selectedModel, setSelectedModel] = useState("CPM");
  const [currency, setCurrency] = useState("INR");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["YouTube"]);
  const [platformRevenues, setPlatformRevenues] = useState({});

  const handleRevenueChange = (platform, revenue) => {
    setPlatformRevenues((prev) => ({
      ...prev,
      [platform]: revenue || 0, // prevent NaN
    }));
  };

  const getTotalRevenue = () => {
    return Object.values(platformRevenues).reduce((acc, rev) => acc + rev, 0);
  };

  const renderCalculator = (platform) => {
    const props = {
      currency,
      platformName: platform,
      onRevenueChange: (rev) => handleRevenueChange(platform, rev),
    };

    switch (selectedModel) {
      case "CPM":
        return <CPMCalculator {...props} />;
      case "CPI":
        return <CPICalculator {...props} />;
      case "MG":
        return <MGCalculator {...props} />;
      case "CAR":
        return <CARCalculator {...props} />;
      case "TVOD":
        return <TVODCalculator currency={currency} />;
      default:
        return <div>Select a model</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar selectedModel={selectedModel} onSelectModel={setSelectedModel} />

      {/* Main Content */}
      <div className="flex-1 bg-neutral-900 p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
          <CurrencyToggle currency={currency} setCurrency={setCurrency} />
        </div>

        {/* Calculators */}
        <div className="space-y-8">
          {selectedPlatforms.map((platform) => (
            <div key={platform} className="border border-neutral-800 bg-neutral-800 p-4 rounded-md shadow">
              <h3 className="text-lg font-extrabold mb-2 text-gray-100">
                {selectedModel} Calculator – {platform}
              </h3>
              {renderCalculator(platform)}
            </div>
          ))}
        </div>

        {/* Total Revenue */}
        {selectedPlatforms.length > 1 && (
          <div className="mt-8 p-4 rounded-md bg-neutral-800 text-lg font-semibold">
            Total Revenue: <CurrencySymbol currency={currency} />
            {getTotalRevenue().toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCalculator;
