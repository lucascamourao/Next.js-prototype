// use rfc and tab to create react funcional component

"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapClient() {
    return (
        <MapContainer
        center={[-23.55052, -46.633308]}
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
