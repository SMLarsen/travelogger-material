app.controller("TripsController", ['TripFactory', '$http', '$filter', function(TripFactory, $http, $filter) {
    console.log('TripsController started');
    var self = this;
    var tripFactory = TripFactory;

    self.trips = [];
    self.days = [];

    tripFactory.getTrips()
        .then(function(response) {
                self.trips = response;
            });

    // Function to get all trips
    self.getTrips = function() {
        tripFactory.getTrips()
            .then(function(response) {
                    self.trips = response;
                    console.log('All trips:', response);
                },
                function(err) {
                    console.log('Unable to retrieve trips', err);
                });
        console.log(self.trips);
    }; // End: tripFactory.getTrips

}]); // END: TripController
