const fetch = require('node-fetch');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config({ path: '../.env' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function geocodeZip(zip) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${zip}&countrycodes=us&format=json&limit=1`,
    { headers: { 'User-Agent': 'VA-Hospital-Finder' } }
  );
  const data = await res.json();
  if (!data.length) throw new Error(`ZIP code "${zip}" not found.`);
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

async function findHospitals(zip) {
  console.log(`\nSearching for VA hospitals near ${zip}...\n`);

  const { lat, lng } = await geocodeZip(zip);

  const res = await fetch(
    `https://sandbox-api.va.gov/services/va_facilities/v1/facilities?lat=${lat}&long=${lng}&radius=50&type=health&per_page=20`,
    { headers: { apiKey: process.env.VA_API_KEY } }
  );

  const json = await res.json()
  console.log('API response status:', res.status);      // ← add
console.log('API response:', JSON.stringify(json, null, 2)); // ← add
  const facilities = json.data || [];

  if (!facilities.length) {
    console.log('No VA hospitals found within 50 miles.');
    return;
  }

  console.log(`Found ${facilities.length} VA facilities:\n`);
  console.log('─'.repeat(60));

  facilities.forEach((f, i) => {
    const a = f.attributes;
    const addr = [
      a.address?.physical?.address1,
      a.address?.physical?.city,
      a.address?.physical?.state,
      a.address?.physical?.zip,
    ].filter(Boolean).join(', ');

    console.log(`${i + 1}. ${a.name}`);
    console.log(`   Address : ${addr}`);
    console.log(`   Phone   : ${a.phone?.main || 'N/A'}`);
    console.log(`   Website : ${a.website || 'N/A'}`);
    console.log('─'.repeat(60));
  });
}

rl.question('Enter a ZIP code: ', async (zip) => {
  if (!/^\d{5}$/.test(zip.trim())) {
    console.log('Please enter a valid 5-digit ZIP code.');
    rl.close();
    return;
  }

  try {
    await findHospitals(zip.trim());
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    rl.close();
  }
});