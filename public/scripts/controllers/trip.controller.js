app.controller("TripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('TripController started');
    var self = this;
    self.trips = [];
    self.auth = AuthFactory;

        // Function to GET trips
        self.auth.getTrips = function() {
          $http({
              method: 'GET',
              url: '/trip',
              headers: {
                  id_token: self.auth.idToken
              }
          }).then(function(response) {
                  self.trips = response.data;
                  console.log('response.data', response.data);
              },
              function(err) {
                  console.log('Unable to retrieve trips', err);
              });
        }; // End getTrips

}]); // END: TripController
