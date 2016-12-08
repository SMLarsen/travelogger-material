app.controller("MyTripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripController started');
    var self = this;
    self.trips = [];
    var authFactory = AuthFactory;

    // Function to GET trips
    self.getTrips = function() {
        authFactory.getIdToken().then(function(idToken) {
            $http({
                method: 'GET',
                url: '/trip',
                headers: {
                    id_token: idToken
                }
            }).then(function(response) {
                    self.trips = response.data;
                    console.log('response.data', response.data);
                },
                function(err) {
                    console.log('Unable to retrieve trips', err);
                });
        });
    }; // End getTrips

    // Function to add a trips
    self.addTrip = function() {
      console.log('addTrip');
    }; // End addTrip

}]); // END: TripController
