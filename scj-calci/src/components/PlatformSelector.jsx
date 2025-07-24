import React from "react";
import youtubeLogo from "../assets/youtube.jpeg";
import facebookLogo from "../assets/facebook.jpeg";
import jiocinemaLogo from "../assets/jiocinema.jpeg";
import sonyLogo from "../assets/sony.jpeg";
import hotstarLogo from "../assets/hotstar.jpeg";

const platformData = [
  { name: "YouTube", logo: youtubeLogo },
  { name: "Facebook", logo: facebookLogo },
  { name: "JioCinema", logo: jiocinemaLogo },
  { name: "SonyLIV", logo: sonyLogo },
  { name: "Hotstar", logo: hotstarLogo },
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
        {platformData.map(({ name, logo }) => {
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
              <img
                src={logo}
                alt={name + " logo"}
                className={`w-10 h-10 rounded shadow mb-1 bg-white ${name === 'YouTube' ? 'object-cover' : 'object-contain'}`}
                draggable={false}
              />
              <span className="text-xs text-white mt-1">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
