import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TrafficMapProps {
  roads: {
    id: number;
    name: string;
    type: string;
    geometry: { lat: number; lon: number }[];
  }[];
}

const TrafficMap: React.FC<TrafficMapProps> = ({ roads }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = L.map(mapRef.current!).setView([19.9975, 73.7898], 13); // Coordinates for Nashik

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Plot roads on the map
    roads.forEach((road) => {
      const coordinates = road.geometry.map((point) => [point.lat, point.lon]);
      L.polyline(coordinates, { color: 'blue' }).addTo(map).bindPopup(`<b>${road.name}</b>`);
    });

    return () => {
      map.remove();
    };
  }, [roads]);

  return <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />;
};

export default TrafficMap;