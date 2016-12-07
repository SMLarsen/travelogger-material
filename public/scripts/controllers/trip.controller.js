app.controller("TripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('TripController started');
    var self = this;
    self.trips = [];
    var auth = AuthFactory;

        // Function to GET trips
        self.getTrips = function() {
          console.log('getTrips');
          console.log('idtoken', auth.idToken);
          $http({
              method: 'GET',
              url: '/trip',
              headers: {
                  id_token: auth.idToken
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
