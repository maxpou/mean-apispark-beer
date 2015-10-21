(function() {

  var beerApp = angular.module("beerApp", []);


  beerApp.directive("beerThumbnail", function() {
    return {
      restrict: 'E',
      templateUrl: "beer-thumbnail.html"
    };
  });


  beerApp.controller("BeerController", ['$http', function($http) {

    var apiParams = {
      endPoint: "http://scotch.local:3000"
    };

    var app = this;
    app.beers = [];

    $http.get(apiParams.endPoint + "/beers/").then(
      function successCallback(callback) {
        app.beers = callback.data;
      },
      function errorCallback(callback) {
        alert("An error occurred while loading the data !");
      }
    );

    app.currentBeer = {
      img: "../img/new.jpg"
    };

    this.addOrUpdate = function(aBeer) {
      if (aBeer._id) {
        $http.put(apiParams.endPoint + '/beers/' + aBeer._id, aBeer);
      } else {
        $http.post(apiParams.endPoint + '/beers/', aBeer).then(
          function successCallback(callback) {
            aBeer = callback.data;
            app.beers.push(aBeer);
            app.reset();
          }
        );
      }
    };

    this.modifyForm = function(aBeer) {
      app.currentBeer = aBeer;
    };

    this.reset = function() {
      app.currentBeer = {
        img: "../img/new.jpg"
      };
    };

    this.remove = function(aBeer) {
      $http.delete(apiParams.endPoint + '/beers/' + aBeer._id).then(
        function successCallback(callback) {
          var elementIndex = app.beers.map(function getId(e) {
            return e.id;
          }).indexOf(aBeer.id);
          app.beers.splice(elementIndex, 1);
        }
      );
    };


    this.reinitializeApp = function() {
      //Delte all beer :(
      app.beers.forEach(function(aBeer) {
        app.remove(aBeer);
      });

      //Recreate all beer :)
      $http.get('../../step1/beer-list.json').success(function(data) {
        var beerWithoutId = data.map(function deleteId(aBeer) {
          aBeer.id = null;
          return aBeer;
        });
        beerWithoutId.forEach(function(aBeer) {
          app.addOrUpdate(aBeer);
        });
      });
    };
  }]);

})();
