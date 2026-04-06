import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const QueueScreen = () => {
    const [queues, setQueues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQueues = async () => {
            try {
                const response = await axios.get('https://your-api.com/api/queues');
                const queuePredictions = await Promise.all(response.data.map(async (q) => {
                    const predictionResponse = await axios.get(`https://your-api.com/api/queues/${q.id}/predict`);
                    return { ...q, prediction: predictionResponse.data.display };
                }));
                setQueues(queuePredictions);
                setLoading(false);
            } catch (err) {
                console.warn('Network issue, displaying estimated queue times', err);
                setQueues([
                    { id: 'gate_a', name: 'Gate A Entry', prediction: '15 - 20 minutes (Offline)' },
                    { id: 'concessions_main', name: 'Main Food Hall', prediction: '10 - 12 minutes (Offline)' }
                ]);
                setLoading(false);
            }
        };

        fetchQueues();
        const pollInteral = setInterval(fetchQueues, 60000); // 1 minute updates
        return () => clearInterval(pollInteral);
    }, []);

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1e293b" /></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍔 Live Wait Times</Text>
            <FlatList
                data={queues}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.queueItem}>
                        <View>
                            <Text style={styles.label}>{item.name}</Text>
                            <Text style={styles.status}>{item.id.includes('gate') ? 'ENTRY' : 'FOOD/REST'}</Text>
                        </View>
                        <View style={styles.timeBadge}>
                            <Text style={styles.timeText}>{item.prediction}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#f1f5f9' },
    header: { fontSize: 24, fontWeight: '900', color: '#1e293b', marginBottom: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    queueItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 12, elevation: 2 },
    label: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
    status: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', marginTop: 4 },
    timeBadge: { padding: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#dcfce7' },
    timeText: { color: '#166534', fontWeight: 'bold' }
});

export default QueueScreen;
