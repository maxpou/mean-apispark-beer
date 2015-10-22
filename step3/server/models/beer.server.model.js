'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
var	Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: String,
  img: String,
  alcohol: Number,
  description: String
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
