// useEdges.js
import { useCallback } from 'react';
import { useEdgesState, addEdge } from 'reactflow';

export const useEdges = (initialEdges) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return { edges, setEdges, onEdgesChange, onConnect };
};
