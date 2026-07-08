// use rfc and tab to create react funcional component

"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER: [number, number] = [-3.7319, -38.5267]; // Fortaleza

export default function MapClient() {
    return (
        <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        style={{
            width: "100%",
            height: "100%",
        }}
        >
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
