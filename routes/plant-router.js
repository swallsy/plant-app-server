const express = require('express');

const PlantCtrl = require('../controllers/plant-ctrl');

const router = express.Router();

router.post('/plant', PlantCtrl.createPlant);
router.put('/plant/:id', PlantCtrl.updatePlant);
router.delete('/plant/:id', PlantCtrl.deletePlant);
router.get('/plant/:id', PlantCtrl.getPlantById);
router.get('/plants', PlantCtrl.getPlants);

module.exports = router;