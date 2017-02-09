/*jshint esversion: 6 */
app.controller("TripsController", ['TripFactory', '$http', '$filter', function(TripFactory, $http, $filter) {
    console.log('TripsController started');

    const tripFactory = TripFactory;

    let self = this;
    self.data = tripFactory.data;

    tripFactory.getTrips()
        .then(function(response) {
            // self.data.trips = response;
        });

    // Function to get all trips
    self.getTrips = function() {
        tripFactory.getTrips()
            .then(function(err) {
                    console.log('Unable to retrieve trips', err);
                });
    }; // End: tripFactory.getTrips

}]); // END: TripController
