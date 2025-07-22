import React from "react";

const platforms = ["YouTube", "Facebook", "Instagram", "OTT", "Others"];

const PlatformSelector = ({ selectedPlatform, setSelectedPlatform }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Platform
      </label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedPlatform === platform
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {platform}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;
