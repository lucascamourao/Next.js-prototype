'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  Node,
  Edge,
  NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Location } from '@/types/location';
import { Relation } from '@/types/relation';

import { locationService } from '@/services/locationService';
import { relationService } from '@/services/relationService';

export default function GraphView() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  async function loadLocations() {
    const data = await locationService.getAll();
    setLocations(data);
  }

  async function loadRelations() {
    const data = await relationService.getAll();
    setRelations(data);
  }

  useEffect(() => {
    loadLocations();
    loadRelations();
  }, []);

  useEffect(() => {
    setNodes(
      locations.map((location, index) => ({
        id: location.id,
        data: {
          label: location.name,
        },
        position: {
          x: (index % 3) * 250,
          y: Math.floor(index / 3) * 150,
        },
      }))
    );
  }, [locations]);

  useEffect(() => {
    setEdges(
      relations.map((relation) => ({
        id: relation.id,
        source: relation.sourceId,
        target: relation.targetId,
        label: relation.name,
      }))
    );
  }, [relations]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
