// esse wrapper apenas diz ao Next para carregar o mapa somente no navegador

'use client';

import { Tool } from '@/types/tool';
import { Coordinate } from '@/types/coordinate';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
});

interface MapProps {
  selectedTool: Tool;
  drawingCoordinates: Coordinate[];
  setDrawingCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
  isZoneModalOpen: boolean;
  setIsZoneModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Map({
  selectedTool,
  drawingCoordinates,
  setDrawingCoordinates,
  isZoneModalOpen,
  setIsZoneModalOpen,
}: MapProps) {
  return (
    <MapClient
      selectedTool={selectedTool}
      drawingCoordinates={drawingCoordinates}
      setDrawingCoordinates={setDrawingCoordinates}
      isZoneModalOpen={isZoneModalOpen}
      setIsZoneModalOpen={setIsZoneModalOpen}
    />
  );
}
