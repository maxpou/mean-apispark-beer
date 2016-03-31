'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');
var	Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  alcohol: {
    type: Number,
    min: [5, 'Provide real beer please (too few degree)'],
    max: [25, 'Provide real beer please (too few degree)'],
    required: true
  },
  description: {
    type: String,
    required: false
  },
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
