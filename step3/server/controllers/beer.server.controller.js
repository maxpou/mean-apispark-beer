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
      res.status(400).send(err);
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
    Beer.findByIdAndUpdate(beerId, req.body, {'new':true} ,function(err, beer) {
      if (err) {
        throw err;
      }
      res.status(204).send(beer);
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
    res.status(204).json({
      message: 'Successfully deleted'
    });
  }
};
