const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  availableFrom: {
    type: String,
    required: true,
  },
  availableTo: {
    type: String,
    required: true,
  },
  testPrice: {
    type: Number,
    required: true,
  },
});

const locationSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

const mapSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  location: locationSchema,
  equipmentDetails: [equipmentSchema],
});

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;
