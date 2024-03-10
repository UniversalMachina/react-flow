import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import EntityRelationshipNode from '../Nodes/EntityRelationshipNode';
import { useMemo } from 'react';
import { initialEdges, initialNodes } from '../Data/initial_data';
const home = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCount, setNodeCount] = useState(3); // To keep track of the node count for unique IDs
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
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
  
  
  // Inside your component
  const nodeTypes = useMemo(() => ({
    entityRelationship: EntityRelationshipNode,
  }), [/* dependencies, if any */]);
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button className="bg-white p-4 rounded-lg" onClick={() => addNode('left')} style={{ position: 'absolute', left: '10px', top: '10px', zIndex: 100 }}>
        Add Node 
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default home