'use strict';

module.exports = function(app) {
	var beerCtrl = require('../controllers/beer.server.controller');
	
  app.route('/beers')
    .get(beerCtrl.getAll)
    .post(beerCtrl.create);

  app.route('/beers/:id')
    .get(beerCtrl.getOne)
    .put(beerCtrl.update)
    .delete(beerCtrl.detele);
};
