import React, { useEffect } from 'react';
import { useEntityAttributes } from '../hooks/entityHooks/useEntityAttributes';
import AttributeItem from '../hooks/entityHooks/AttributeItem';
import { useNodeAttributes } from '../hooks/appHooks/useNodeAttributes'; // Assuming this is the correct path

const EntityRelationshipNode = ({ id, data, updateAttributes }) => {
  const { attributes, title, setTitle, handleAttributeChange, addAttribute, removeAttribute } = useEntityAttributes(data, (attrs, title) => updateAttributes(id, attrs, title));

  return (
    <div className="bg-gray-700 border-[2px] border-gray-300 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex text-white font-bold text-lg bg-gray-800 p-2 rounded-t-lg outline-none self-stretch w-full"
        placeholder="Entity Title"
      />
      {attributes.map((attribute, index) => (
        <AttributeItem
          key={attribute.id}
          attribute={attribute}
          index={index}
          handleAttributeChange={handleAttributeChange}
          removeAttribute={removeAttribute}
        />
      ))}
      <div className="flex justify-end p-2">
        <button onClick={addAttribute} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          +
        </button>
      </div>
    </div>
  );
};

export default EntityRelationshipNode;
