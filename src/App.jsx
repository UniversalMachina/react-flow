import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import EntityRelationshipNode from './Nodes/EntityRelationshipNode';
import { initialEdges, initialNodes } from './Data/initial_data';
import Sidebar from './Sidebar'; // Make sure the path is correct

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(3); // To keep track of the node count for unique IDs
  const [nodeAttributes, setNodeAttributes] = useState({}); // New state for node attributes

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

// Adjusting the updateNodeAttributes function in App to include titles
const updateNodeAttributes = (nodeId, attributes, title) => {
  setNodeAttributes(prev => ({ ...prev, [nodeId]: { attributes, title } }));
};




  const addNode = (side) => {
    const position = side === 'left' 
      ? { x: -100, y: Math.random() * 400 }
      : { x: window.innerWidth - 250, y: Math.random() * 400 };

    const newNode = {
      id: `${nodeCount}`,
      type: 'entityRelationship',
      position,
      data: { 
        label: `Node ${nodeCount}`, 
        updateAttributes: updateNodeAttributes // Passing callback to update attributes
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  };

  const nodeTypes = useMemo(() => ({
    entityRelationship: (nodeProps) => <EntityRelationshipNode {...nodeProps} updateAttributes={updateNodeAttributes} />,
  }), []);

  // Display node information in a header


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Sidebar nodeAttributes={nodeAttributes} />

      <button className="bg-white p-4 rounded-lg" onClick={() => addNode('left')} style={{ position: 'absolute', left: '10px', top: '50px', zIndex: 100 }}>
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
  );
}

export default App;
