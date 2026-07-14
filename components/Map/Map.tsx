// esse wrapper apenas diz ao Next para carregar o mapa somente no navegador

"use client";

import { Tool } from "@/types/tool";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
});

interface MapProps {
  selectedTool: Tool;
}

export default function Map({selectedTool}: MapProps) {
  return <MapClient selectedTool={selectedTool}/>;
}