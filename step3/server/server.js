var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors'); //authorize multiple ports
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/beers');

var beerSchema = {
  name: String,
  img: String,
  alcohol: String,
  description: String
};

var Beer = mongoose.model('Beer', beerSchema, 'beer');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/beers', function(req, res) {
  Beer.find({}, function(err, doc) {
    res.send(doc);
  });
});

app.get('/beers/:id', function(req, res) {
  var beerId = req.params.id;
  if (beerId) {
    Beer.findOne({
      _id: beerId
    }, function(err, doc) {
      res.send(doc);
    });
  }
});

app.put('/beers/:id', function(req, res) {
  var beerId = req.params.id;
  if (beerId === req.body._id) {
    Beer.findByIdAndUpdate(beerId, req.body, function(err, beer) {
      if (err) {
        throw err;
      }
      res.status(200).json(beer);
    });
  }
});

app.delete('/beers/:id', function(req, res) {
  var beerId = req.params.id;
  if (beerId) {
    Beer.findByIdAndRemove(beerId, function(err) {
      if (err) {
        res.send(err);
      }
    });
    res.status(200).json({ message: 'Successfully deleted' });
  }
});

app.post('/beers', function(req, res) {
  var beerSend = Beer(req.body);

  beerSend.save(function(err, newBeer) {
    if (err) {
      res.send(500, err);
    }
    res.status(201).json(newBeer);
  });
});

app.get('/', function(req, res) {
  res.send("Hello beer!");
});

app.listen(3000);
