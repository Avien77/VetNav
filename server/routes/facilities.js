const express = require('express');
const router = express.Router();
const { geocodeZip } = require('../services/geocode');
const { fetchFacilities } = require('../services/vaApi');

// GET /api/facilities?zip=90210&radius=50
router.get('/', async (req, res) => {
  const { zip, radius = 50 } = req.query;

  if (!zip || !/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: 'A valid 5-digit ZIP code is required.' });
  }

  try {
    const coords = await geocodeZip(zip);
    const facilities = await fetchFacilities(coords.lat, coords.lng, radius);

    res.json({
      zip,
      location: coords.label,
      lat: coords.lat,
      lng: coords.lng,
      count: facilities.length,
      facilities,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;