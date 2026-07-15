// use rfc and tab to create react funcional component
'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet';
import MapEvents from './MapEvents';
import 'leaflet/dist/leaflet.css';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/utils/constants';
import '@/lib/leaflet-icon';
import { useEffect, useState } from 'react';
import CreateLocationModal from '../Location/CreateLocationModal';
import { Location } from '@/types/location';
import { Connection } from '@/types/connection';
import { locationService } from '@/services/locationService';
import { connectionService } from '@/services/connectionService';
import { Tool } from '@/types/tool';

interface MapClientProps {
  selectedTool: Tool;
}

export default function MapClient({ selectedTool }: MapClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [firstSelectedLocationId, setFirstSelectedLocationId] = useState<string | null>(null);

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  async function loadLocations() {
    const data = await locationService.getAll();

    setLocations(data);
  }

  async function loadConnections() {
    const data = await connectionService.getAll();

    setConnections(data);
  }

  // chamadas no mesmo momento
  useEffect(() => {
    loadLocations();
    loadConnections();
  }, []);

  function handleMapClick(lat: number, lng: number) {
    setSelectedPosition({ lat, lng });
    setIsModalOpen(true);
  }

  async function handleLocationClick(locationId: string) {
    if (selectedTool !== 'connection') {
      return;
    }

    if (!firstSelectedLocationId) {
      setFirstSelectedLocationId(locationId);

      console.log('Primeiro ponto: ', locationId);

      return;
    }

    if (firstSelectedLocationId === locationId) {
      console.log('Você escolheu o mesmo ponto!');
      return;
    }

    const connectionAlreadyExists = connections.some(
      (connection) =>
        (connection.sourceId === firstSelectedLocationId && connection.targetId === locationId) ||
        (connection.sourceId === locationId && connection.targetId === firstSelectedLocationId)
    );

    if (connectionAlreadyExists) {
      console.log('Conexão já existe! ');
      return;
    }

    console.log('Segundo ponto:', locationId);

    await connectionService.create({
      sourceId: firstSelectedLocationId,
      targetId: locationId,
    });

    await loadConnections();

    setFirstSelectedLocationId(null);
  }

  return (
    <>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEvents onMapClick={handleMapClick} />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => handleLocationClick(location.id),
            }}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.description}
            </Popup>

            <Tooltip>{location.name}</Tooltip>
          </Marker>
        ))}

        {connections.map((connection) => {
          const source = locations.find((location) => location.id === connection.sourceId);

          const target = locations.find((location) => location.id === connection.targetId);

          if (!source || !target) {
            return null;
          }

          return (
            <Polyline
              positions={[
                [source?.lat, source?.lng],
                [target?.lat, target?.lng],
              ]}
            />
          );
        })}
      </MapContainer>

      <CreateLocationModal
        open={isModalOpen}
        position={selectedPosition}
        onCancel={() => setIsModalOpen(false)}
        onLocationCreated={loadLocations}
      />
    </>
  );
}
