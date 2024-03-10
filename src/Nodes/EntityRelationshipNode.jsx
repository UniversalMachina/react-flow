import React, { useState, useEffect } from 'react';
import { Handle } from "reactflow";
import uniqueId from "lodash/uniqueId"; // Ensure lodash is installed or use an alternative method for unique IDs

const EntityRelationshipNode = ({ data }) => {
  const [attributes, setAttributes] = useState([
    { id: uniqueId("attr_"), name: "", type: "" },
  ]);
  const [title, setTitle] = useState('Entity Attributes');

  const [showAttributes, setShowAttributes] = useState(false);




  const handleAttributeChange = (id, newValue, field) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: newValue } : attr
      )
    );
  };

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { id: uniqueId("attr_"), name: "", type: "" },
    ]);
  };

  const removeAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const EntityAttributeDisplay = ({ attributes, title }) => {
    return (
      <div>
        <div>{title}{'{'}</div>
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            {attribute.name} {attribute.type}
          </div>
        ))}
        <div>{'}'}</div>
      </div>
    );
  };

  return (
    <div className="bg-gray-700 border-[2px] border-gray-300 rounded-lg">
      {/* <div className="flex text-white font-bold text-lg  bg-gray-800 p-2 rounded-t-lg">
        Entity Attributes
      </div> */}
            <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex text-white font-bold text-lg  bg-gray-800 p-2 rounded-t-lg outline-none self-stretch w-full"
      />
      {/* <div className="p-4"> */}
      {attributes.map((attribute, index) => (
        <div
          key={attribute.id}
          className="flex items-center p-2 bg-gray-600 border-t border-t-gray-300"
        >
          <Handle
            type="target"
            position="left"
            id={`${attribute.id}_left`}
            style={{ background: "#555", top: 70 + index * 49 }}
          />
          <input
            type="text"
            value={attribute.name}
            onChange={(e) =>
              handleAttributeChange(attribute.id, e.target.value, "name")
            }
            className="text-white bg-gray-600 mr-2 flex-grow p-1 rounded w-[200px] outline-none" // Added outline-none
            placeholder="Name"
          />
          <input
            type="text"
            value={attribute.type}
            onChange={(e) =>
              handleAttributeChange(attribute.id, e.target.value, "type")
            }
            className="text-white bg-gray-600 mr-2 p-1 rounded w-[100px] outline-none" // Added outline-none
            placeholder="Type"
          />

          <Handle
            type="source"
            position="right"
            id={`${attribute.id}_right`}
            style={{ background: "#555", top: 70 + index * 49 }}
          />
          <button
            onClick={() => removeAttribute(attribute.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            −
          </button>
        </div>
      ))}
      <div className="flex justify-end p-2">
        <button
          onClick={addAttribute}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          +
        </button>
      </div>
      <div className='flex justify-end p-2'>
        <button onClick={() => setShowAttributes(!showAttributes)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          {showAttributes ? '-' : '+'}
        </button>
      </div>

      {showAttributes && <EntityAttributeDisplay attributes={attributes} title={title}/>}
    </div>
  );
};

export default EntityRelationshipNode;
