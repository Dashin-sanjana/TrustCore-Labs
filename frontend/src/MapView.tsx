import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const location: L.LatLngExpression = [6.8470201, 79.9510519];

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(location, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    L.circleMarker(location, {
      radius: 9,
      color: '#ffffff',
      weight: 3,
      fillColor: '#e6a500',
      fillOpacity: 1,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div className="footer-map-view" ref={containerRef} role="img" aria-label="Map of the Pannipitiya location" />;
}
