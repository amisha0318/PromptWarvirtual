# SETUP GUIDE: Venue Experience Platform

## API Keys Required
1.  **Google Maps API Key**: Enable Maps JavaScript API (Dashboard), Maps SDK for Android/iOS (Mobile), and Places API.
2.  **Firebase Project Settings**:
    *   Create a project at [Firebase Console](https://console.firebase.google.com).
    *   Enable Firestore, Auth, and Cloud Messaging.
    *   Download `serviceAccountKey.json` from Project Settings > Service Accounts and place it in `venue_experience/backend/config/`.

## Environment Variables (.env)

### Backend (`venue_experience/backend/.env`)
```env
PORT=5000
FIREBASE_DATABASE_URL=https://<your-project-id>.firebaseio.com
FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}'
# Or place serviceAccountKey.json in venue_experience/backend/config/
```

### Dashboard (`venue_experience/dashboard/.env`)
```env
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```

## Setup Instructions

### 1. Backend
```bash
cd venue_experience/backend
npm install
# Seed mock data to Firestore (Required for first run)
# Run node scripts/seedFirestore.js (Optional)
npm run dev
```

### 2. Dashboard
```bash
cd venue_experience/dashboard
npm install
npm start
```

### 3. Mobile
```bash
cd venue_experience/mobile
npm install
# For iOS
# cd ios && pod install && cd ..
npx react-native run-android # or run-ios
```

## Mock Data Seeding (Firestore)
Example `venues/stadium_1/areas`:
*   `area_1`: { currentOccupancy: 450, maxCapacity: 500, lat: 34.0522, lng: -118.2437 }
*   `area_2`: { currentOccupancy: 120, maxCapacity: 500, lat: 34.0530, lng: -118.2440 }

Example `venues/stadium_1/queues`:
*   `gate_a`: { name: 'Gate A Entry', currentPersonCount: 150, avgPeoplePerMinute: 8 }
*   `concessions_main`: { name: 'Main Food Hall', currentPersonCount: 80, avgPeoplePerMinute: 4 }
