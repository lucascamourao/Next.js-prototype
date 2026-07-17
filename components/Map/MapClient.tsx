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
import { locationService } from '@/services/locationService';
import { Tool } from '@/types/tool';
import { Coordinate } from '@/types/coordinate';
import { Zone } from '@/types/zone';
import { zoneService } from '@/services/zoneService';
import CreateZoneModal from '../Zone/CreateZoneModal';
import LocationDetailsModal from '../Location/LocationDetailsModal';
import { pointsInPolygon } from '@/utils/poinstInPolygon';
import ZoneDetailsModal from '../Zone/ZoneDetailsModal';
import { Relation } from '@/types/relation';
import { relationService } from '@/services/relationService';
import CreateRelationModal from '../Relation/CreateRelationModal';
import MapResize from './MapResize';

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

  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);

  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [locationsInsideZone, setLocationsInsideZone] = useState<Location[]>([]);
  const [isZoneDetailsOpen, setIsZoneDetailsOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] = useState(false);

  const locationsMap = Object.fromEntries(locations.map((location) => [location.id, location]));

  const [relations, setRelations] = useState<Relation[]>([]);
  const [firstSelectedRelationLocationId, setFirstSelectedRelationLocationId] = useState<
    string | null
  >(null);
  const [isRelationModalOpen, setIsRelationModalOpen] = useState(false);
  const [pendingRelation, setPendingRelation] = useState<{
    sourceId: string;
    targetId: string;
  } | null>(null);

  // load functions =======================================================
  async function loadLocations() {
    const data = await locationService.getAll();

    setLocations(data);
  }

  async function loadZones() {
    const data = await zoneService.getAll();

    setZones(data);
  }

  async function loadRelations() {
    const data = await relationService.getAll();

    setRelations(data);
  }

  // =====================================================================

  // useEffect: chamadas no mesmo momento
  useEffect(() => {
    loadLocations();
    loadZones();
    loadRelations();
  }, []);

  // useEffect para limpar desenho temporário de zona
  useEffect(() => {
    if (selectedTool !== 'zone') {
      setDrawingCoordinates([]);
    }
  }, [selectedTool, setDrawingCoordinates]);

  // useEffect para limpar relação temporária (antes da confirmação do formulário)
  useEffect(() => {
    if (selectedTool !== 'relation') {
      setFirstSelectedRelationLocationId(null);
      setPendingRelation(null);
    }
  }, [selectedTool]);

  // handle functions ===================================================

  function handleMapClick(lat: number, lng: number) {
    switch (selectedTool) {
      case 'location':
        setSelectedPosition({ lat, lng });
        setIsModalOpen(true);
        break;

      case 'zone':
        handleZoneDrawingClick(lat, lng);
        break;

      default:
        // relation e none
        break;
    }
  }

  async function handleLocationClick(location: Location) {
    switch (selectedTool) {
      case 'relation':
        await handleRelationClick(location);
        break;

      case 'none':
        const currLocation = locationsMap[location.id];

        if (!currLocation) return;

        setSelectedLocation(location);
        setIsLocationDetailsOpen(true);

      default:
        break;
    }
  }

  function handleZoneDrawingClick(lat: number, lng: number) {
    const newCoordinate: Coordinate = { lat, lng };

    // essa forma de atualização funcional evita problemas de concorrência
    setDrawingCoordinates((previousCoordinates) => [...previousCoordinates, newCoordinate]);
  }

  async function handleRelationClick(location: Location) {
    if (!firstSelectedRelationLocationId) {
      setFirstSelectedRelationLocationId(location.id);
      return;
    }

    if (firstSelectedRelationLocationId === location.id) {
      console.log('Erro: Você escolheu o mesmo ponto!');
      return;
    }

    const relationAlreadyExists = relations.some(
      (relation) =>
        (relation.sourceId === firstSelectedRelationLocationId &&
          relation.targetId === location.id) ||
        (relation.sourceId === location.id && relation.targetId === firstSelectedRelationLocationId)
    );

    if (relationAlreadyExists) {
      console.log('Relação já existe!');
      return;
    }

    setPendingRelation({
      sourceId: firstSelectedRelationLocationId,
      targetId: location.id,
    });

    setIsRelationModalOpen(true);
    setFirstSelectedRelationLocationId(null);
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

        <MapResize />

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
              click: () => {
                if (selectedTool === 'none') {
                  handleZoneClick(zone);
                }
              },
            }}
          />
        ))}

        {relations.map((relation) => {
          const source = locationsMap[relation.sourceId];
          const target = locationsMap[relation.targetId];

          if (!source || !target) {
            return null;
          }

          return (
            <Polyline
              key={relation.id}
              positions={[
                [source.lat, source.lng],
                [target.lat, target.lng],
              ]}
              pathOptions={{
                color: 'green',
                weight: 4,
                dashArray: '8,4',
              }}
            >
              <Tooltip sticky>{relation.name}</Tooltip>

              <Popup>
                <strong>{relation.name}</strong>
                <br />
                {source.name} → {target.name}
              </Popup>
            </Polyline>
          );
        })}
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

      <CreateRelationModal
        open={isRelationModalOpen}
        onCancel={() => setIsRelationModalOpen(false)}
        onRelationCreated={async ({ name }) => {
          if (!pendingRelation) return;

          await relationService.create({
            name,
            sourceId: pendingRelation.sourceId,
            targetId: pendingRelation.targetId,
          });

          await loadRelations();

          setPendingRelation(null);
          setIsRelationModalOpen(false);
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
