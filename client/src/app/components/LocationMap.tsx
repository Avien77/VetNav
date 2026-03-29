import { useEffect } from "react";
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

// Custom icon for employment locations
const employmentIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
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

  // Don't render map if no locations
  if (!filteredLocations || filteredLocations.length === 0) {
    return (
      <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-slate-200 flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">No locations to display</p>
      </div>
    );
  }

  // Create a unique key based on center coordinates to force re-render when location changes
  const mapKey = `${center[0]}-${center[1]}`;

  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-lg border-2 border-slate-200">
      <MapContainer
        key={mapKey}
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
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={location.type === "employment" ? employmentIcon : defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                {location.description && (
                  <p className="text-sm text-slate-700 mb-2 italic">
                    {location.description}
                  </p>
                )}
                <p className="text-sm text-slate-600 mb-1">{location.address}</p>
                {location.phone && (
                  <p className="text-sm text-blue-600 font-semibold">
                    {location.phone}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}