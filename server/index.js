const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const facilitiesRouter = require('./routes/facilities');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' })); // Vite's default port
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'VA Hospital Finder API is running' });
});

app.use('/api/facilities', facilitiesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

    
});