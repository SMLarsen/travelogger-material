app.controller("TripController", ['TripFactory', '$filter', '$routeParams', function(TripFactory, $filter, $routeParams) {
    console.log('TripController started');
    var self = this;
    var tripFactory = TripFactory;

    self.tripID = $routeParams.tripID;
    self.trip = [];
    self.days = [];

    tripFactory.getTrip(self.tripID)
        .then(function(response) {
            self.trip = response;
        });

    tripFactory.getDays(self.tripID)
        .then(function(response) {
            self.days = response;
            // self.days.forEach(buildLocationArray);
            // console.log('location array:', self.locationArray);
        });


}]); // END: TripController
