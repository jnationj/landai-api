// index.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

// 🔐 Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Optional
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// ✅ Example route: GET all land documents
app.get('/landNFTs', async (req, res) => {
  try {
    const snapshot = await db.collection('landNFTs').get();
    const landNFTs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(landNFTs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch landNFTs' });
  }
});

// ✅ Example route: POST new land document
app.post('/landNFTs', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('landNFTs').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create land entry' });
  }
});

// 🚀 Start the server
if (process.env.NODE_ENV !== 'test') {
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
}

// Export the app for testing purposes
module.exports = app;