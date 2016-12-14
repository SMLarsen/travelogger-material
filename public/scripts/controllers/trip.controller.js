app.controller("TripController", ['$http', '$filter', '$q', function($http, $filter, $q) {
    console.log('TripController started');
    var self = this;

    self.trips = [];
    self.days = [];

    getTrips();

    // Function to GET trips
    function getTrips() {
        $http.get('/guest/trips')
        .then(function(response) {
                self.trips = response.data;
                console.log('response.data', response.data);
            },
            function(err) {
                console.log('Unable to retrieve trips', err);
            });
    } // End getTrips

    // Function to GET days
    self.getDays = function(tripID) {
        console.log('getting days for:', tripID);
        $http.get('/guest/day/' + tripID)
        .then(function(response) {
                self.days = response.data;
                console.log('response.data', self.days);
            },
            function(err) {
                console.log('Unable to retrieve days', err);
            });
    }; // End getDays

}]); // END: TripController
