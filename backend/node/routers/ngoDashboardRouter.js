const express = require('express');
const router = express.Router();
const ngoDashboardController = require('../controllers/ngoDashboardController');

// Routes
router.get('/', ngoDashboardController.getDashboard);
router.post('/', ngoDashboardController.createOrUpdateDashboard);
router.post('/volunteers', ngoDashboardController.addVolunteer);
router.delete('/volunteers/:volunteerId', ngoDashboardController.removeVolunteer);
router.delete('/', ngoDashboardController.deleteDashboard);

module.exports = router;
