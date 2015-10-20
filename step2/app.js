(function() {

  var beerApp = angular.module("beerApp", []);


  beerApp.directive("beerThumbnail", function() {
    return {
      restrict: 'E',
      templateUrl: "beer-thumbnail.html"
    };
  });


  beerApp.controller("BeerController", ['$http', function($http) {

    var apiSparkParams = {
      endPoint: "https://maxpou.apispark.net/v1"
    };

    var app = this;
    app.beers = [];

    $http.get(apiSparkParams.endPoint + "/beers/").then(
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
      if (aBeer.id) {
        $http.put(apiSparkParams.endPoint + '/beers/' + aBeer.id, aBeer);
      } else {
        $http.post(apiSparkParams.endPoint + '/beers/', aBeer).then(
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
      $http.delete(apiSparkParams.endPoint + '/beers/' + aBeer.id).then(
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
        $http.get('../step1/beer-list.json').success(function(data) {
          var beerWithoutId = data.map(function deleteId(aBeer) {
            aBeer.id = null;
            return aBeer;
          });
          beerWithoutId.forEach(function(aBeer) {
            app.addOrUpdate(aBeer);
          });
        });
    };


    this.reinitializeAppPromise = function() {
      var deletePromise = [];
      app.beers.forEach(function(aBeer) {
        var prom = new Promise(function(resolve, reject) {
          resolve(app.remove(aBeer));
        });
        console.log(prom);
        deletePromise.push(prom);
      });

      //Then, recreate all beer :)
      Promise.all(deletePromise).then(
        $http.get('../step1/beer-list.json').success(function(data) {
          var beerWithoutId = data.map(function deleteId(aBeer) {
            aBeer.id = null;
            return aBeer;
          });
          beerWithoutId.forEach(function(aBeer) {
            app.addOrUpdate(aBeer);
          });
        })
      );

    };
  }]);

})();
