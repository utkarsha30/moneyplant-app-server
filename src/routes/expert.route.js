const { Router } = require('express');
const expertCtrl = require('../controllers/expert.controller');
const router = Router();
router.post('/', expertCtrl.newExpert);
router.get('/', expertCtrl.filterExperts);
router.get('/', expertCtrl.allExperts);
router.get('/locations', expertCtrl.getAllLocations);
router.patch('/connectnow/:id', expertCtrl.connectToExpert);

module.exports = router;
