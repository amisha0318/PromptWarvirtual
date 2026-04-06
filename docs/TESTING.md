# TESTING & QUALITY ASSURANCE

## Integration Tests (Manual & Automate with Postman/Jest)

| ID | Feature | Test Case | Expected Result | Priority |
|---|---|---|---|---|
| 1.1 | Backend Health | `GET /health` | Status 200, return timestamp. | CRITICAL |
| 1.2 | Heatmap API | `GET /api/heatmap` | Array of area objects with 'intensity' field. | HIGH |
| 1.3 | Queue Prediction | `GET /api/queues/gate_a/predict` | JSON with 'predictedWaitSeconds' and 'display'. | CRITICAL |
| 1.4 | Staff Update | `POST /api/staff/location` | Return { success: true }. | MEDIUM |

## Failure Handling Cases (Edge Cases)

### 1. API Failure (Firebase/Google)
*   **Behavior**: Frontend checks `window.google` and API responses.
*   **Fallback**: Dashboard displays "API Loading/Error" and MapScreen uses cached historical data markers.

### 2. High Traffic (Crowd Surge)
*   **Behavior**: Backend computes high density (occupancy > 0.85).
*   **Action**: `GET /api/recommendations` triggers "URGENT REROUTING" alerts in dashboard/mobile.

### 3. Connection Offline (Stadium Dead Zones)
*   **Behavior**: Mobile screen `catch` blocks triggered.
*   **Action**: Mobile app displays `prediction: '(Offline Estimator)'` based on the last known state from `AsyncStorage`.

## Sample JSON For Manually Adding Firestore Documents

### /venues/stadium_1/areas/area_1
```json
{
  "name": "North Gate Crowd",
  "currentOccupancy": 420,
  "maxCapacity": 500,
  "lat": 34.052235,
  "lng": -118.243683
}
```

### /venues/stadium_1/queues/gate_a
```json
{
  "name": "North Gate Entrance",
  "currentPersonCount": 160,
  "avgPeoplePerMinute": 8
}
```

## Scalability Considerations
*   **Firebase Persistence**: Use Firestore snapshots for real-time reactivity without polling.
*   **Caching**: Implement Redis layer between backend and Firestore for high-frequency requests (staff location pulse).
*   **CDN**: Serve dashboard and mobile assets via Cloud CDN for fast local edge retrieval.
