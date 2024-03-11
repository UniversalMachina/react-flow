import { useState, useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';

export const useEntityAttributes = (data, updateAttributes) => {
  const [attributes, setAttributes] = useState([{ id: uniqueId('attr_'), name: '', type: '' }]);
  const [title, setTitle] = useState(data.title || 'Entity Attributes');

  useEffect(() => {
    updateAttributes(attributes, title);
  }, [attributes, title, updateAttributes]);

  useEffect(() => {
    if (data.attributes) {
      setAttributes(data.attributes);
    }
    if (data.title) {
      setTitle(data.title);
    }
  }, [data]);

  const handleAttributeChange = (attributeId, newValue, attributeKey) => {
    const updatedAttributes = attributes.map((attr) => {
      if (attr.id === attributeId) {
        return { ...attr, [attributeKey]: newValue };
      }
      return attr;
    });
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { id: uniqueId('attr_'), name: '', type: '' }]);
  };

  const removeAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  return { attributes, title, setTitle, handleAttributeChange, addAttribute, removeAttribute };
};
