// esse wrapper apenas diz ao Next para carregar o mapa somente no navegador

"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
});

export default function Map() {
  return <MapClient />;
}