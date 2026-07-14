// use rfc and tab to create react funcional component

"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MapEvents from "./MapEvents";
import "leaflet/dist/leaflet.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/utils/constants";
import "@/lib/leaflet-icon";
import { useEffect, useState } from "react";
import CreateLocationModal from "../Location/CreateLocationModal";
import { Location } from "@/types/location";
import { locationService } from "@/services/locationService";

export default function MapClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedPosition, setSelectedPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    
    const [locations, setLocations] = useState<Location[]>([]);

    async function loadLocations() {
        const data = await locationService.getAll();

        console.log(data);

        setLocations(data);
    }

    useEffect(() => {
        loadLocations();
    }, []);


    function handleMapClick(lat: number, lng: number) {
        setSelectedPosition({lat, lng});
        setIsModalOpen(true);
    }
   
    return (
    <>
        <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{
                width: "100%",
                height: "100%",
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
                >
                    <Popup>
                        <strong>{location.name}</strong>
                        <br />
                        {location.description}
                    </Popup>

                    <Tooltip>
                        {location.name}
                    </Tooltip>
                </Marker>
            ))}
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
