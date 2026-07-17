// use rfc and tab to create react funcional component
'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, Polygon } from 'react-leaflet';
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
import { Coordinate } from '@/types/coordinate';
import { Zone } from '@/types/zone';
import { zoneService } from '@/services/zoneService';
import CreateZoneModal from '../Zone/CreateZoneModal';
import LocationDetailsModal from '../Location/LocationDetailsModal';
import { pointsInPolygon } from '@/utils/pointInPolygon';
import ZoneDetailsModal from '../Zone/ZoneDetailsModal';

interface MapClientProps {
  selectedTool: Tool;
  drawingCoordinates: Coordinate[];
  setDrawingCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
  isZoneModalOpen: boolean;
  setIsZoneModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapClient({
  selectedTool,
  drawingCoordinates,
  setDrawingCoordinates,
  isZoneModalOpen,
  setIsZoneModalOpen,
}: MapClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [firstSelectedLocationId, setFirstSelectedLocationId] = useState<string | null>(null);

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const [zones, setZones] = useState<Zone[]>([]);

  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [locationsInsideZone, setLocationsInsideZone] = useState<Location[]>([]);
  const [isZoneDetailsOpen, setIsZoneDetailsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] = useState(false);

  const locationsMap = Object.fromEntries(locations.map((location) => [location.id, location]));

  // load functions =======================================================
  async function loadLocations() {
    const data = await locationService.getAll();

    setLocations(data);
  }

  async function loadConnections() {
    const data = await connectionService.getAll();

    setConnections(data);
  }

  async function loadZones() {
    const data = await zoneService.getAll();

    setZones(data);
  }

  // =====================================================================

  // useEffect: chamadas no mesmo momento
  useEffect(() => {
    loadLocations();
    loadConnections();
    loadZones();
  }, []);

  // useEffect para limpar desenho temporário de zona
  useEffect(() => {
    if (selectedTool !== 'zone') {
      setDrawingCoordinates([]);
    }
  }, [selectedTool, setDrawingCoordinates]);

  // useEffect para limpar connection temporário (após troca de ação)
  useEffect(() => {
    if (selectedTool !== 'connection') {
      setFirstSelectedLocationId(null);
    }
  }, [selectedTool, setFirstSelectedLocationId]);

  // handle functions ===================================================

  function handleMapClick(lat: number, lng: number) {
    switch (selectedTool) {
      case 'zone':
        handleZoneDrawingClick(lat, lng);
        break;
      default:
        setSelectedPosition({ lat, lng });
        setIsModalOpen(true);
    }
  }

  async function handleLocationClick(location: Location) {
    switch (selectedTool) {
      case 'connection':
        await handleConnectionClick(location.id);
        break;

      case 'relation':
        await handleRelationClick(location.id);
        break;

      default:
        const currLocation = locationsMap[location.id];

        if (!currLocation) return;

        setSelectedLocation(location);
        setIsLocationDetailsOpen(true);
    }
  }

  async function handleConnectionClick(locationId: string) {
    if (!firstSelectedLocationId) {
      setFirstSelectedLocationId(locationId);
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

    await connectionService.create({
      sourceId: firstSelectedLocationId,
      targetId: locationId,
    });

    await loadConnections();

    setFirstSelectedLocationId(null);
  }

  function handleZoneDrawingClick(lat: number, lng: number) {
    const newCoordinate: Coordinate = { lat, lng };

    // essa forma de atualização funcional evita problemas de concorrência
    setDrawingCoordinates((previousCoordinates) => [...previousCoordinates, newCoordinate]);
  }

  async function handleRelationClick(locationId: string) {
    return;
  }

  function handleZoneClick(zone: Zone) {
    const pointsInside = locations.filter((location) =>
      pointsInPolygon(
        {
          lat: location.lat,
          lng: location.lng,
        },
        zone.coordinates
      )
    );

    console.log(pointsInside);
    setSelectedZone(zone);
    setLocationsInsideZone(pointsInside);
    setIsZoneDetailsOpen(true);
  }

  // ====================================================================

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
              click: () => handleLocationClick(location),
            }}
          >
            <Tooltip>{location.name}</Tooltip>
          </Marker>
        ))}

        {connections.map((connection) => {
          const source = locationsMap[connection.sourceId];
          const target = locationsMap[connection.targetId];

          if (!source || !target) {
            return null;
          }

          return (
            <Polyline
              key={connection.id}
              positions={[
                [source.lat, source.lng],
                [target.lat, target.lng],
              ]}
            />
          );
        })}

        {selectedTool === 'zone' && drawingCoordinates.length >= 3 && (
          <Polygon positions={drawingCoordinates} pathOptions={{ dashArray: '5,5' }}></Polygon>
        )}

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: zone.color,
            }}
            eventHandlers={{
              click: () => handleZoneClick(zone),
            }}
          />
        ))}
      </MapContainer>

      <CreateLocationModal
        open={isModalOpen}
        position={selectedPosition}
        onCancel={() => setIsModalOpen(false)}
        onLocationCreated={loadLocations}
      />

      <CreateZoneModal
        open={isZoneModalOpen}
        onCancel={() => setIsZoneModalOpen(false)}
        onZoneCreated={async ({ name, color }) => {
          await zoneService.create({
            name,
            color,
            coordinates: drawingCoordinates,
          });

          await loadZones();

          setDrawingCoordinates([]);

          setIsZoneModalOpen(false);
        }}
      />

      <LocationDetailsModal
        open={isLocationDetailsOpen}
        location={selectedLocation}
        onCancel={() => setIsLocationDetailsOpen(false)}
      />

      <ZoneDetailsModal
        open={isZoneDetailsOpen}
        zone={selectedZone}
        locationsInsideZone={locationsInsideZone}
        onCancel={() => setIsZoneDetailsOpen(false)}
      />
    </>
  );
}
