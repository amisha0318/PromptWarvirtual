import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OfflineInfo = ({ type, data }) => (
    <View style={styles.offlineBanner}>
        <Text style={styles.offlineTitle}>📶 Offline Mode Active</Text>
        <Text style={styles.offlineText}>Displaying last known {type}. Stats may not be real-time.</Text>
        {data && <Text style={styles.dataPoint}>{data}</Text>}
    </View>
);

const styles = StyleSheet.create({
    offlineBanner: { backgroundColor: '#fef3c7', padding: 12, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#d97706', marginBottom: 16 },
    offlineTitle: { fontWeight: '900', color: '#92400e', marginBottom: 4 },
    offlineText: { fontSize: 13, color: '#b45309' },
    dataPoint: { marginTop: 8, fontSize: 12, fontStyle: 'italic', color: '#d97706' }
});

export default OfflineInfo;
