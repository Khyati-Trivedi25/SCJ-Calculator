import React from "react";
import {
  MonitorPlay,
  Video,
  BarChart3,
  BadgeDollarSign,
  Ticket,
} from "lucide-react";

const Sidebar = ({ selectedModel, onSelectModel }) => {
  const avodModels = [
    { label: "CPM", key: "CPM", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "CPI", key: "CPI", icon: <MonitorPlay className="w-5 h-5" /> },
    { label: "CAR", key: "CAR", icon: <Video className="w-5 h-5" /> },
    {
      label: "MG + Rev Share",
      key: "MG",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
  ];

  const tvodModel = {
    label: "TVOD",
    key: "TVOD",
    icon: <Ticket className="w-5 h-5" />,
  };

  const renderItem = ({ label, key, icon }) => (
    <li
      key={key}
      onClick={() => onSelectModel(key)}
      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors ${
        selectedModel === key
          ? "bg-white text-black font-semibold"
          : "hover:bg-gray-800 text-gray-300"
      }`}
    >
      {icon}
      {label}
    </li>
  );

  return (
    <div className="w-64 bg-black text-white min-h-screen p-6">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Revenue Models</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
            AVOD
          </h3>
          <ul className="space-y-1">{avodModels.map(renderItem)}</ul>
        </div>

        <div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
            TVOD
          </h3>
          <ul>{renderItem(tvodModel)}</ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
