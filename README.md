VetNav is a web application that connects veterans with their local VA hospitals and streamlines the process of discovering and accessing the benefits they've earned based on their service, rank, and disability status.
 
The Problem:
Navigating the VA benefits system is overwhelming. Between confusing government websites and a largely non-tech-savvy veteran community, accessing earned benefits remains a significant and widespread challenge.

Features:
VA Hospital Finder — Enter your ZIP code and find nearby VA medical facilities with addresses and phone numbers
Benefits Matcher — Answer a few questions about your service to see which benefits you qualify for

Tech Stack:

Frontend

React 18 + TypeScript
Vite
Tailwind CSS
React Router
Radix UI / shadcn
Lucide React

Backend

Node.js + Express
node-fetch
dotenv

APIs

VA Facilities API (sandbox)
Nominatim Geocoding

Geting Started:
Prerequisites

Node.js v18+
A VA API sandbox key from https://developer.va.gov/explore/api/va-facilities/sandbox-access

1. Clone the repository

 2. Set up environment variables

Create a `.env` file in the root folder:

VA_API_KEY=your_sandbox_key_here
PORT=5000

3. Install dependencies
npm install

# Client dependencies
cd client
npm install --legacy-peer-deps
cd ..

# Server dependencies
cd server
npm install
cd ..
4. Run the app
From the root folder, run "npm rum dev"

