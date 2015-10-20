(function() {

  var beerApp = angular.module("beerApp", []);


  beerApp.directive("beerThumbnail", function() {
    return {
      restrict: 'E',
      templateUrl: "beer-thumbnail.html"
    };
  });


  beerApp.controller("BeerController", ['$http', function($http){
    var app = this;
    app.beers = [];

    $http.get('./beer-list.json').success(function(data){
        app.beers = data;
    });

    app.currentBeer = {img:"../img/new.jpg"};

    this.addOrUpdate = function(aBeer) {
      if (aBeer.id) {
        console.log("It's already update. Thanks to data binding :)");
      } else {
        aBeer.id= aBeer.name.replace(/ /g,'').toLowerCase();
        app.beers.push(aBeer);
        this.reset();
      }
    };

    this.modifyForm= function(aBeer) {
      app.currentBeer = aBeer;
    };

    this.reset = function() {
      app.currentBeer = {img:"../img/new.jpg"};
    };

    this.remove = function(aBeer) {
      var elementIndex = app.beers.map(function(e) {return e.id;}).indexOf(aBeer.id);
      app.beers.splice(elementIndex, 1);
    };
  }]);

})();
