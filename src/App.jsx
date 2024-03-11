import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import EntityRelationshipNode from "./Nodes/EntityRelationshipNode";
import { initialEdges, initialNodes } from "./Data/initial_data";
import Sidebar from "./Sidebar";
import { useNodeAttributes } from "./hooks/appHooks/useNodeAttributes";
import { useNodes } from "./hooks/appHooks/useNodes";
import { useEdges } from "./hooks/appHooks/useEdges";

const App = () => {
  const {
    nodeAttributes,
    updateNodeAttributes,
    handleAttributeNameChange,
    handleAttributeTypeChange,
  } = useNodeAttributes();
  const { nodes, onNodesChange, addNode } = useNodes(initialNodes);
  const { edges, onEdgesChange, onConnect } = useEdges(initialEdges);

  const nodeTypes = useMemo(
    () => ({
      entityRelationship: (nodeProps) => (
        <EntityRelationshipNode
          {...nodeProps}
          updateAttributes={updateNodeAttributes}
        />
      ),
    }),
    [updateNodeAttributes]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Sidebar
        nodeAttributes={nodeAttributes}
        handleAttributeNameChange={handleAttributeNameChange}
        handleAttributeTypeChange={handleAttributeTypeChange}
      />
            <button className="bg-white p-4 rounded-lg" onClick={() => addNode('left')} style={{ position: 'absolute', left: '10px', top: '50px', zIndex: 100 }}>Add Node</button>
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
};

export default App;
