const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const vizSchema = new Schema({
  graphDataX: [String],
  graphDataY: [Number]
});

// Model
const Viz = mongoose.model('Viz', vizSchema);

module.exports = Viz;
