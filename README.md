# 🏟️ Venue Experience Platform (VXP)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Node.js](https://img.shields.io/badge/Backend-Node.js%20(Express)-green)](https://nodejs.org/)
[![Stack: React](https://img.shields.io/badge/Frontend-React.js-blue)](https://reactjs.org/)
[![Stack: React Native](https://img.shields.io/badge/Mobile-React%20Native-blueviolet)](https://reactnative.dev/)
[![Stack: Firebase](https://img.shields.io/badge/BaaS-Firebase-orange)](https://firebase.google.com/)

**Transforming the Physical Event Experience at Large-Scale Sporting Venues.**

VXP is a production-ready, full-stack solution designed to optimize crowd movement, reduce waiting times, and enable real-time coordination between staff and attendees using Google Cloud and Firebase.

---

## 🌟 Key Features

### 🗺️ Smart Crowd Navigation
*   **Real-time Heatmaps:** Visualize crowd density across the stadium using Google Maps API.
*   **AI Route Suggestions:** Dynamic rerouting to avoid bottlenecks during high-traffic entry/exit.

### ⏱️ Queue Prediction System
*   **Wait Time Estimations:** Real-time wait times for gates, food stalls, and restrooms.
*   **Dynamic Load Balancing:** Recommends the shortest nearby queue to attendees.

### 📢 Live Alerts & Staff Coordination
*   **Emergency Notifications:** High-priority push alerts via Firebase Cloud Messaging (FCM).
*   **Admin Dashboard:** Real-time visualization of capacity utilization for venue staff.
*   **Resource Allocation:** AI suggestions for staff relocation based on crowd density spikes.

### 📶 Offline Mode
*   **Resilience:** Continued basic navigation and ticket info access even in cellular dead zones.

---

## 🛠️ Technical Stack

-   **Frontend:** React.js (Admin/Staff Dashboard)
-   **Mobile:** React Native (Attendee App)
-   **Backend:** Node.js (Express)
-   **Database:** Firebase Firestore (Real-time sync)
-   **Auth:** Firebase Authentication
-   **Maps:** Google Maps SDK (Android/iOS) & Maps JavaScript API
-   **Notifications:** Firebase Cloud Messaging (FCM)

---

## 📂 Project Structure

```text
venue_experience/
├── backend/            # Express Server, Firestore Admin SDK & Controllers
├── dashboard/          # React Admin Dashboard (Heatmaps & Stats)
├── mobile/             # React Native Mobile App (Attendee App)
├── docs/               # ARCHITECTURE, SETUP, and TESTING guides
└── .env.example        # Environment variable configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
-   Node.js (v16+) & npm
-   Firebase Account (Free tier is sufficient)
-   Google Maps API Key

### 2. Setup Backend
```bash
cd venue_experience/backend
npm install
# Configure .env with your Firebase Service Account
npm run dev
```

### 3. Setup Dashboard
```bash
cd venue_experience/dashboard
npm install
npm start
```

### 4. Setup Mobile
```bash
cd venue_experience/mobile
npm install
npx react-native run-android # or run-ios
```

---

## 📖 Documentation
Detailed documentation is available in the `docs/` folder:
-   [Architecture Overview](./docs/ARCHITECTURE.md)
-   [Full Setup Guide](./docs/SETUP.md)
-   [Testing & Edge Cases](./docs/TESTING.md)

---

## ⚖️ License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Feedback
Built with ❤️ for elite event management. For inquiries, please reach out to the project maintainers.
