import React from 'react';

const Sidebar = ({ nodeAttributes, handleAttributeNameChange, handleAttributeTypeChange }) => {

    
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-200 p-4 overflow-auto z-50" style={{ zIndex: 100 }}>
      {Object.entries(nodeAttributes).map(([nodeId, { attributes, title }]) => (
        <div key={nodeId} className="mb-3">
          <div className="font-bold text-xl mb-2">{title}</div>
          {attributes.map((attr, index) => (
            <div key={index} className="flex flex-col mb-2">
              <input
                type="text"
                value={attr.name}
                onChange={(e) => handleAttributeNameChange(nodeId, index, e.target.value)}
                className="text-sm p-1 border border-gray-300 rounded mb-1"
                placeholder="Attribute name"
              />
              <input
                type="text"
                value={attr.type}
                onChange={(e) => handleAttributeTypeChange(nodeId, index, e.target.value)}
                className="text-sm p-1 border border-gray-300 rounded"
                placeholder="Attribute type"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
