const express = require('express');
const { getMapDetails, addMapDetails, searchHospitals, getNearbyHospitals } = require('../controllers/mapController');

const router = express.Router();

router.route('/').get(getMapDetails).post(addMapDetails);
router.get('/search/:query', searchHospitals);
router.get('/all', getMapDetails);
router.get('/nearby', getNearbyHospitals);

module.exports = router;
