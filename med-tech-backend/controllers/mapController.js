const asyncHandler = require('express-async-handler');
const Map = require('../models/mapModel');

const getMapDetails = asyncHandler(async (req, res) => {
  const mapDetails = await Map.find({});
  res.json(mapDetails);
});

const addMapDetails = asyncHandler(async (req, res) => {
  const { hospitalName, longitude, latitude, equipmentDetails } = req.body;

  const map = await Map.create({
    hospitalName,
    location: { longitude, latitude },
    equipmentDetails,
  });

  if (map) {
    res.status(201).json({
      _id: map._id,
      hospitalName: map.hospitalName,
      location: map.location,
      equipmentDetails: map.equipmentDetails,
    });
  } else {
    res.status(400);
    throw new Error('Invalid map details');
  }
});

const searchHospitals = asyncHandler(async (req, res) => {
  const { query } = req.params;
  
  const hospitals = await Map.find({ hospitalName: { $regex: query, $options: 'i' } });

  res.json(hospitals);
});

const getNearbyHospitals = async (req, res) => {
    try {
      const { longitude, latitude } = req.query;
  
      // Assuming a radius of 10 kilometers for nearby hospitals, adjust as needed
      const nearbyHospitals = await Map.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: 10000,
          },
        },
      });
  
      res.json(nearbyHospitals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = { getMapDetails, addMapDetails, searchHospitals, getNearbyHospitals };
