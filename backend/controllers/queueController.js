const { db } = require('../config/firebase');

/**
 * Fetch all queue times for all stadium services
 */
exports.getAllQueues = async (req, res) => {
    try {
        const queuesSnapshot = await db.collection('venues').doc('stadium_1').collection('queues').get();
        const queues = queuesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(queues);
    } catch (error) {
        res.status(500).json({ error: 'Queue data unavailable', details: error.message });
    }
};

/**
 * Predict queue wait times based on historical throughput and current headcount
 */
exports.predictWaitTime = async (req, res) => {
    const { queueId } = req.params;
    if (!queueId) return res.status(400).json({ error: 'Missing queue ID' });

    try {
        const queueRef = db.collection('venues').doc('stadium_1').collection('queues').doc(queueId);
        const queue = await queueRef.get();

        if (!queue.exists) return res.status(404).json({ error: 'Queue not found' });

        const queueData = queue.data();
        const currentCount = queueData.currentPersonCount || 0;
        const averageServiceRate = queueData.avgPeoplePerMinute || 5; // Default if missing

        const predictedWait = Math.ceil(currentCount / averageServiceRate);

        res.status(200).json({
            queueId,
            predictedWaitSeconds: predictedWait * 60,
            unit: 'minutes',
            display: `${predictedWait} - ${predictedWait + 2} minutes`
        });
    } catch (error) {
        res.status(500).json({ error: 'Wait time prediction error', details: error.message });
    }
};
