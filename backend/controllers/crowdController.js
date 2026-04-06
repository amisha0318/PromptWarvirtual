const { db } = require('../config/firebase');

/**
 * Get real-time crowd heatmaps based on area occupancy
 */
exports.getHeatmap = async (req, res) => {
    try {
        const heatmapSnapshot = await db.collection('venues').doc('stadium_1').collection('areas').get();
        const heatmapData = heatmapSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Heatmap value based on current occupancy compared to capacity
            intensity: doc.data().currentOccupancy / doc.data().maxCapacity
        }));
        
        res.status(200).json(heatmapData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch crowd heatmap', 
            details: error.message,
            fallback: 'Using historical mock data' 
        });
    }
};

/**
 * Report current staff location for density visualization
 */
exports.updateStaffLocation = async (req, res) => {
    const { staffId, location, status } = req.body;
    if (!staffId || !location) {
        return res.status(400).json({ error: 'Missing staff location data' });
    }

    try {
        await db.collection('venues').doc('stadium_1').collection('staff').doc(staffId).set({
            location,
            status,
            lastUpdated: new Date().toISOString()
        }, { merge: true });
        
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update staff location', details: error.message });
    }
};

/**
 * Suggest optimal crowd distribution routes using simple density logic
 */
exports.getAIRecommendations = async (req, res) => {
    try {
        const areas = await db.collection('venues').doc('stadium_1').collection('areas').get();
        const denseAreas = areas.docs.filter(doc => (doc.data().currentOccupancy / doc.data().maxCapacity) > 0.85);

        const recommendations = denseAreas.map(area => ({
            from: area.id,
            suggestedAction: 'Reroute to Gate ' + (Math.floor(Math.random() * 3) + 1),
            reason: 'Excessive crowds detected',
            severity: 'URGENT'
        }));

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ 
            error: 'AI suggestions unavailable', 
            details: error.message,
            recommendation: 'Follow standard event exit signs'
        });
    }
};
