'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapResize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}
