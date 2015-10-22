'use strict';

var Beer = require('../models/beer.server.model');


exports.getAll = function(req, res) {
  Beer.find({}, function(err, doc) {
    res.send(doc);
  });
};

exports.create = function(req, res) {
  var beerSend = new Beer(req.body);
  beerSend.save(function(err, newBeer) {
    if (err) {
      res.send(500, err);
    }
    res.status(201).json(newBeer);
  });
};

exports.getOne = function(req, res) {
  var beerId = req.params.id;
  if (beerId) {
    Beer.findOne({
      _id: beerId
    }, function(err, doc) {
      res.send(doc);
    });
  }
};

exports.update = function(req, res) {
  var beerId = req.params.id;
  if (beerId === req.body._id) {
    Beer.findByIdAndUpdate(beerId, req.body, function(err, beer) {
      if (err) {
        throw err;
      }
      res.status(200).json(beer);
    });
  }
};

exports.detele = function(req, res) {
  var beerId = req.params.id;
  if (beerId) {
    Beer.findByIdAndRemove(beerId, function(err) {
      if (err) {
        res.send(err);
      }
    });
    res.status(200).json({
      message: 'Successfully deleted'
    });
  }
};
