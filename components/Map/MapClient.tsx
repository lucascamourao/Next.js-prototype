// use rfc and tab to create react funcional component

"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MapEvents from "./MapEvents";
import "leaflet/dist/leaflet.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/utils/constants";
import "@/lib/leaflet-icon";
import { useState } from "react";
import CreateLocationModal from "../Location/CreateLocationModal";

export default function MapClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedPosition, setSelectedPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

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

            <Marker position={DEFAULT_CENTER}>
                <Popup>Popup Fortaleza</Popup>
                <Tooltip>Location name</Tooltip>
            </Marker>
        </MapContainer>

        <CreateLocationModal
            open={isModalOpen}
            position={selectedPosition}
            onCancel={() => setIsModalOpen(false)}
        />
    </>
);
}
