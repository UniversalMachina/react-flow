import React from 'react';
import { Handle } from 'reactflow';

const AttributeItem = ({ attribute, index, handleAttributeChange, removeAttribute }) => (
  <div className="flex items-center p-2 bg-gray-600 border-t border-t-gray-300">
    <input
      type="text"
      value={attribute.name}
      onChange={(e) => handleAttributeChange(attribute.id, e.target.value, 'name')}
      className="text-white bg-gray-600 mr-2 flex-grow p-1 rounded w-[200px] outline-none"
      placeholder="Name"
    />
    <input
      type="text"
      value={attribute.type}
      onChange={(e) => handleAttributeChange(attribute.id, e.target.value, 'type')}
      className="text-white bg-gray-600 mr-2 p-1 rounded w-[100px] outline-none"
      placeholder="Type"
    />
    <Handle type="target" position="left" id={`${attribute.id}_left`} style={{ background: '#555' }} />
    <Handle type="source" position="right" id={`${attribute.id}_right`} style={{ background: '#555' }} />
    <button onClick={() => removeAttribute(attribute.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
      −
    </button>
  </div>
);

export default AttributeItem;
