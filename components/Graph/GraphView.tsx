'use client';

import { useEffect, useState } from 'react';

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Location } from '@/types/location';
import { Relation } from '@/types/relation';

import { locationService } from '@/services/locationService';
import { relationService } from '@/services/relationService';

export default function GraphView() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);

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

  const nodes = locations.map((location, index) => ({
    id: location.id,
    data: {
      label: location.name,
    },
    position: {
      x: (index % 3) * 250,
      y: Math.floor(index / 3) * 150,
    },
  }));

  const edges = relations.map((relation) => ({
    id: relation.id,
    source: relation.sourceId,
    target: relation.targetId,
    label: relation.name,
  }));

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
