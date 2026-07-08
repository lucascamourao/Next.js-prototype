// use rfc and tab to create react funcional component

"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/utils/constants";

export default function MapClient() {
    return (
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


            <Marker position={DEFAULT_CENTER}>
                <Popup>Popup Fortaleza</Popup>
                <Tooltip>Location name</Tooltip>
            </Marker>
        </MapContainer>
    );
}
