import React from "react";

const allPlatforms = ["YouTube", "Facebook", "JioCinema", "SonyLIV", "Hotstar"];

const PlatformSelector = ({ selectedPlatforms = [], setSelectedPlatforms }) => {
  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev = []) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-gray-600">Select Platforms:</p>
      <div className="flex flex-wrap gap-3">
        {allPlatforms.map((platform) => {
          const selected = selectedPlatforms.includes(platform);
          return (
            <label
              key={platform}
              className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer text-sm border ${
                selected
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selected}
                onChange={() => togglePlatform(platform)}
              />
              {platform}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
