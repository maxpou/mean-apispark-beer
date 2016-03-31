'use strict';

var express    = require('express');
var cors       = require('cors'); //authorize multiple ports
var bodyParser = require('body-parser');
var app        = express();

//Config app
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Routing files
require('./routes/hello.server.routes')(app);
require('./routes/beer.server.routes')(app);
app.listen(3000);

module.exports = app;
