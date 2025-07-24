import React from "react";

const platformData = [
  { name: "YouTube", icon: "▶️" },
  { name: "Facebook", icon: "📘" },
  { name: "JioCinema", icon: "🎬" },
  { name: "SonyLIV", icon: "📺" },
  { name: "Hotstar", icon: "🔥" },
];

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
      <p className="text-lg font-extrabold text-gray-200 mb-2 tracking-tight">Select Platforms:</p>
      <div className="flex flex-wrap gap-4">
        {platformData.map(({ name, icon }) => {
          const selected = selectedPlatforms.includes(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => togglePlatform(name)}
              className={`w-20 h-20 flex flex-col items-center justify-center font-semibold rounded-xl border-2 shadow transition-all duration-200 text-lg select-none
                ${selected
                  ? "border-pink-500 bg-neutral-900 scale-105 shadow-lg"
                  : "border-neutral-700 bg-neutral-900 hover:border-pink-400 hover:scale-105 hover:shadow-md"}
              `}
            >
              <span className="text-2xl mb-1">{icon}</span>
              <span className="text-xs text-white mt-1">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
