const express = require('express');
const router = express.Router();
const crowdController = require('../controllers/crowdController');
const queueController = require('../controllers/queueController');

// Crowd Analysis Routes
router.get('/heatmap', crowdController.getHeatmap);
router.post('/staff/location', crowdController.updateStaffLocation);
router.get('/recommendations', crowdController.getAIRecommendations);

// Queue Analysis Routes
router.get('/queues', queueController.getAllQueues);
router.get('/queues/:queueId/predict', queueController.predictWaitTime);

module.exports = router;
