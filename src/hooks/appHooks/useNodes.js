// useNodes.js
import { useState } from 'react';
import { useNodesState } from 'reactflow';

export const useNodes = (initialNodes) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodeCount, setNodeCount] = useState(3);

  const addNode = (side) => {
    const position = side === 'left'
      ? { x: -100, y: Math.random() * 400 }
      : { x: window.innerWidth - 250, y: Math.random() * 400 };

    const newNode = {
      id: `${nodeCount}`,
      type: 'entityRelationship',
      position,
      data: { label: `Node ${nodeCount}` },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  };

  return { nodes, setNodes, onNodesChange, addNode };
};
