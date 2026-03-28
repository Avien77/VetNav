import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Location } from "../data/benefits";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface LocationMapProps {
  locations: Location[];
  center: [number, number];
  selectedBenefitId?: string;
}

function MapUpdater({
  center,
  locations,
}: {
  center: [number, number];
  locations: Location[];
}) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else {
      map.setView(center, 11);
    }
  }, [center, locations, map]);

  return null;
}

export function LocationMap({
  locations,
  center,
  selectedBenefitId,
}: LocationMapProps) {
  const filteredLocations = selectedBenefitId
    ? locations.filter((loc) => loc.benefitTypes.includes(selectedBenefitId))
    : locations;

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-slate-200">
      <MapContainer
        center={center}
        zoom={11}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} locations={filteredLocations} />
        {filteredLocations.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                <p className="text-sm text-slate-600 mb-1">{location.address}</p>
                {location.phone && (
                  <p className="text-sm text-blue-600">{location.phone}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}