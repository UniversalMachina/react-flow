import { useState, useCallback } from 'react';

export const useNodeAttributes = () => {
  const [nodeAttributes, setNodeAttributes] = useState({});

  const updateNodeAttributes = useCallback((nodeId, updatedAttributes, updatedTitle) => {
    setNodeAttributes((prevAttributes) => ({
      ...prevAttributes,
      [nodeId]: {
        ...prevAttributes[nodeId],
        attributes: updatedAttributes,
        title: updatedTitle,
      },
    }));
  }, []); // No dependencies, this callback does not recreate

  const handleAttributeNameChange = useCallback((nodeId, index, newValue) => {
    setNodeAttributes((prevAttributes) => {
      const updatedAttributes = { ...prevAttributes };
      if (updatedAttributes[nodeId] && updatedAttributes[nodeId].attributes[index]) {
        updatedAttributes[nodeId].attributes[index].name = newValue;
      }
      return updatedAttributes;
    });
  }, []); // No dependencies, this callback does not recreate

  const handleAttributeTypeChange = useCallback((nodeId, index, newValue) => {
    setNodeAttributes((prevAttributes) => {
      const updatedAttributes = { ...prevAttributes };
      if (updatedAttributes[nodeId] && updatedAttributes[nodeId].attributes[index]) {
        updatedAttributes[nodeId].attributes[index].type = newValue;
      }
      return updatedAttributes;
    });
  }, []); // No dependencies, this callback does not recreate

  return {
    nodeAttributes,
    updateNodeAttributes,
    handleAttributeNameChange,
    handleAttributeTypeChange,
  };
};
