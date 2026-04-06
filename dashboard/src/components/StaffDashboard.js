import React, { useState, useEffect } from 'react';
import Heatmap from './Heatmap';
import axios from 'axios';

const StaffDashboard = () => {
    const [crowdData, setCrowdData] = useState([]);
    const [stats, setStats] = useState({ totalAttendees: 45000, capacityUtilization: '85%' });
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const heatmapResponse = await axios.get('/api/heatmap');
                const recommendationResponse = await axios.get('/api/recommendations');
                setCrowdData(heatmapResponse.data);
                setAlerts(recommendationResponse.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        const interval = setInterval(fetchDashboardData, 10000); // 10s updates
        fetchDashboardData();
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <h1 style={{ fontWeight: '800', color: '#1e293b' }}>🏟️ Stadium Core | Admin Control</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', marginTop: '24px' }}>
                <section>
                    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <h2 style={{ marginBottom: '12px' }}>Real-time Crowd Density Heatmap</h2>
                        <Heatmap locations={crowdData} />
                    </div>
                </section>

                <aside>
                    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', marginBottom: '24px' }}>
                        <h3>Live Statistics</h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalAttendees}</p>
                        <span style={{ color: '#64748b' }}>People in the Venue</span>
                        <hr style={{ margin: '16px 0' }} />
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{stats.capacityUtilization}</p>
                        <span style={{ color: '#64748b' }}>Capacity Utilization</span>
                    </div>

                    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <h3>AI Alerts ({alerts.length})</h3>
                        {alerts.map((alert, idx) => (
                            <div key={idx} style={{ padding: '12px', borderLeft: '4px solid #ef4444', backgroundColor: '#fef2f2', marginBottom: '8px', borderRadius: '4px' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>Gate Check: {alert.from}</p>
                                <p style={{ fontSize: '14px' }}>{alert.suggestedAction}</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default StaffDashboard;
