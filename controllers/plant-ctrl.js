const Plant = require('../models/plant-model');

createPlant = (req, res) => {
  const body = req.body;

  if (!body) {
    console.log('there is no body')
    return res.status(400).json({
      success: false,
      error: 'You must provide a plant'
    })
  }

  const plant = new Plant(body);
  console.log('this is the plant');

  if (!plant) {
    return res.status(400).json({ success: false, error: err })
  }

  plant
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: plant._id,
        message: 'Plant created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Plant not created!',
      })
    })
}

updatePlant = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Plant.findOne({ _id: req.params.id }, (err, plant) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Plant not found!',
      })
    }
    plant.name = body.name;
    plant.zone = body.zone;
    plant.light = body.light;
    plant.watered = body.watered;
    plant
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: plant._id,
          message: 'Plant updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Plant not updated!',
        })
      })
  })
}

deletePlant = async (req, res) => {
  await Plant.findOneAndDelete({ _id: req.params.id }, (err, plant) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!plant) {
      return res
        .status(404)
        .json({ success: false, error: `Plant not found` })
    }

    return res.status(200).json({ success: true, data: plant })
  }).catch(err => console.log(err))
}

getPlantById = async (req, res) => {
  await Plant.findOne({ _id: req.params.id }, (err, plant) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!plant) {
      return res
        .status(404)
        .json({ success: false, error: `Plant not found` })
    }
    return res.status(200).json({ success: true, data: plant })
  }).catch(err => console.log(err))
}

getPlants = async (req, res) => {
  await Plant.find({}, (err, plants) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!plants.length) {
      return res
        .status(404)
        .json({ success: false, error: `Plant not found` })
    }
    return res.status(200).json({ success: true, data: plants })
  }).catch(err => console.log(err))
}

module.exports = {
  createPlant,
  updatePlant,
  deletePlant,
  getPlants,
  getPlantById
}