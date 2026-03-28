const fetch = require('node-fetch');

async function geocodeZip(zip) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${zip}&countrycodes=us&format=json&limit=1`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'VA-Hospital-Finder/1.0', // required by Nominatim's terms
      'Accept-Language': 'en',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to reach geocoding service. Please try again.');
  }

  const data = await res.json();

  if (!data.length) {
    throw new Error(`ZIP code "${zip}" not found. Please check and try again.`);
  }

  const result = data[0];
  const parts = result.display_name.split(',');

  return {
    lat: parseFloat(result.lat),
    lng: parseFloat(result.lon),
    label: parts.slice(0, 2).join(',').trim(),
  };
}

module.exports = { geocodeZip };