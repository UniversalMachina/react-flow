// Sidebar.jsx adjusted for titles
import React from "react";

const Sidebar = ({ nodeAttributes }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-200 p-4 overflow-auto">
      {Object.entries(nodeAttributes).map(([nodeId, { attributes, title }]) => (
        <div key={nodeId} className="mb-3">
          <div className="font-bold text-xl mb-2">
            {title} <p className="font-normal text-base">{"{"}</p>
          </div>
          {attributes.map((attr, index) => (
            <div key={index} className="text-sm">
              {attr.name} <span className="text-gray-600">{attr.type}</span>
            </div>
          ))}
          <div>{"}"}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
