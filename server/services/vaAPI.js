const fetch = require('node-fetch');

const VA_API_BASE = 'https://sandbox-api.va.gov/services/va_facilities/v1';

async function fetchFacilities(lat, lng, radius = 50, perPage = 20) {
  const url = `${VA_API_BASE}/facilities?lat=${lat}&long=${lng}&radius=${radius}&type=health&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: {
      apiKey: process.env.VA_API_KEY,
    },
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error('Invalid VA API key. Check your .env file.');
  }

  if (!res.ok) {
    throw new Error(`VA API error (${res.status}). Please try again.`);
  }

  const json = await res.json();
  const facilities = json.data || [];

  // Sort by distance from the ZIP coords
  return facilities
    .map((f) => ({
      id: f.id,
      name: f.attributes.name,
      lat: f.attributes.lat,
      lng: f.attributes.long,
      address: formatAddress(f.attributes.address?.physical),
      phone: f.attributes.phone?.main || null,
      hours: f.attributes.hours || null,
      distance: haversine(lat, lng, f.attributes.lat, f.attributes.long),
      facilityType: f.attributes.facility_type || null,
      website: f.attributes.website || null,
    }))
    .sort((a, b) => a.distance - b.distance);
}

function formatAddress(addr) {
  if (!addr) return null;
  return [addr.address1, addr.city, addr.state, addr.zip]
    .filter(Boolean)
    .join(', ');
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // miles
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = { fetchFacilities };
