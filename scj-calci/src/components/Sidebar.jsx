import React from "react";
import {
  MonitorPlay,
  Video,
  BarChart3,
  BadgeDollarSign,
  Ticket,
} from "lucide-react";

const highlightColor = "cyan-400";

const sidebarSections = [
  {
    title: "AVOD",
    models: [
      { label: "CPM", key: "CPM", icon: <BarChart3 className="w-5 h-5" /> },
      { label: "CPI", key: "CPI", icon: <MonitorPlay className="w-5 h-5" /> },
      { label: "CAR", key: "CAR", icon: <Video className="w-5 h-5" /> },
      {
        label: "MG + Rev Share",
        key: "MG",
        icon: <BadgeDollarSign className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "TVOD",
    models: [
      { label: "TVOD", key: "TVOD", icon: <Ticket className="w-5 h-5" /> },
    ],
  },
];

const Sidebar = ({ selectedModel, onSelectModel }) => {
  // Find which section is selected
  const selectedSection = sidebarSections.find(section =>
    section.models.some(model => model.key === selectedModel)
  );

  return (
    <aside className="w-64 min-h-screen p-6 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-r border-neutral-800 flex flex-col">
      <h2 className="text-2xl font-extrabold text-gray-100 mb-8 tracking-tight">Revenue Models</h2>
      <nav className="flex-1 space-y-8">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <h3
              className={`text-xs uppercase tracking-widest mb-3 font-bold pl-2 transition-colors duration-150
                ${selectedSection && selectedSection.title === section.title ? "text-cyan-400" : "text-gray-400"}
              `}
            >
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.models.map(({ label, key, icon }) => {
                const selected = selectedModel === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => onSelectModel(key)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 font-medium text-left group relative
                        ${selected
                          ? "border-l-4 border-cyan-400 bg-neutral-900 text-cyan-400 shadow-md"
                          : "border-l-4 border-transparent bg-neutral-900 text-gray-300 hover:bg-neutral-800 hover:text-cyan-300"}
                      `}
                    >
                      <span className={`transition-all duration-150 ${selected ? "scale-110 text-cyan-400" : "group-hover:text-cyan-300"}`}>{icon}</span>
                      <span className="flex-1">{label}</span>
                      {selected && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded bg-cyan-400/10 text-cyan-400 font-bold tracking-wide">Selected</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
