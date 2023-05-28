const mongoose = require('mongoose');
require('dotenv').config()

const oemSpecsSchema = mongoose.Schema({
  model: { type: String, required: true },
  year: { type: String, required: true },
  listPrice: { type: Number, required: true },
  availableColors: { type: [String], required: true },
  mileage: { type: Number, required: true },
  power: { type: Number, required: true },
  maxSpeed: { type: Number, required: true }
},{versionKey:false});

oemSpecsSchema.index({ model: "text", year: "text" });

const OEMSpecsModel = mongoose.model('OEMSpecs', oemSpecsSchema);

module.exports = {OEMSpecsModel};