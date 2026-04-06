import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const [mapData, setMapData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heatmapRes, recommendationRes] = await Promise.all([
          axios.get('https://your-api.com/api/heatmap'),
          axios.get('https://your-api.com/api/recommendations')
        ]);
        setMapData(heatmapRes.data);
        setRecommendations(recommendationRes.data);
      } catch (error) {
        console.warn('API Error, falling back to cached local data');
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 34.0522,
          longitude: -118.2437,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Heatmap
          points={mapData.map(point => ({
            latitude: point.lat,
            longitude: point.lng,
            weight: point.intensity
          }))}
          radius={50}
          opacity={0.7}
        />
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.title}>🏟️ Stadium Live Insights</Text>
        <FlatList
          horizontal
          data={recommendations}
          keyExtractor={(item) => item.from}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.navCard}>
              <Text style={styles.cardTitle}>{item.suggestedAction}</Text>
              <Text style={styles.cardInfo}>{item.reason}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  overlay: { position: 'absolute', bottom: 40, left: 16, right: 16 },
  title: { fontSize: 20, fontWeight: '900', color: '#1e293b', marginBottom: 12, backgroundColor: 'white', padding: 8, alignSelf: 'flex-start', borderRadius: 8 },
  navCard: { padding: 16, backgroundColor: 'white', borderRadius: 12, marginRight: 12, width: 220, elevation: 5 },
  cardTitle: { fontWeight: 'bold', color: '#1e293b', fontSize: 16 },
  cardInfo: { fontSize: 12, color: '#64748b' }
});

export default MapScreen;
