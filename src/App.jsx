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
import EntityRelationshipNode from './EntityRelationshipNode';
import { useMemo } from 'react';

// Define a custom node component
// const CustomNodeComponent = ({ data }) => (
//   <div style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: 'black' }}>
//     <Handle type="target" position="left" style={{ borderRadius: 0 }} />
//       {data.label} hey
//     <Handle type="source" position="right" style={{ borderRadius: 0 }} />
//     <Handle type="source" position="right" style={{ borderRadius: 0 }} />
    
//   </div>
// );

// Custom node component with multiple connectors on each side
const CustomNodeComponent = ({ data }) => (
  <div style={{ padding: 10, border: '1px solid #ddd', backgroundColor: 'black' }}>
    <Handle type="target" position="left" id="left-1" style={{ top: 10 }} /> // Connector 1 on the left
    <Handle type="target" position="left" id="left-2" style={{ top: 30 }} /> // Connector 2 on the left
    {data.label}
    <Handle type="source" position="right" id="right-1" style={{ top: 10 }} /> // Connector 1 on the right
    <Handle type="source" position="right" id="right-2" style={{ top: 30 }} /> // Connector 2 on the right
  </div>
);

// Make sure to assign 'CustomNode' to the 'nodeTypes' in ReactFlow component


// const initialNodes = [
//   { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: '2', type: 'customNode', position: { x: 400, y: 100 }, data: { label: 'Node 2' } },
// ];

const initialNodes = [
  { id: 'er1', type: 'entityRelationship', position: { x: 250, y: 5 }, data: "hey" },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
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

  // Define custom node types with the custom component
  // const nodeTypes = {
  //   customNode: CustomNodeComponent,
    
  // };

  // const nodeTypes = { entityRelationship: EntityRelationshipNode };

// Inside your component
const nodeTypes = useMemo(() => ({
  entityRelationship: EntityRelationshipNode,
}), [/* dependencies, if any */]);


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button className="bg-white p-4 rounded-lg" onClick={() => addNode('left')} style={{ position: 'absolute', left: '10px', top: '10px', zIndex: 100 }}>
        Add Node 
      </button>
      {/* <button onClick={() => addNode('right')} style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 100 }}>
        Add Node on Right
      </button> */}
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
