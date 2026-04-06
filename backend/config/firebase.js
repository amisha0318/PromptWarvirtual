const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

// Ensure path to service account key is specified in environment or defaults to config directory
// It's recommended to place the serviceAccountKey.json in the backend/config directory.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) 
    : require('./serviceAccountKey.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
} catch (error) {
    console.error('Firebase Initialization Error:', error.message);
}

const db = admin.firestore();
const fcm = admin.messaging();

module.exports = { admin, db, fcm };
