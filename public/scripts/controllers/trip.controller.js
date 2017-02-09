/*jshint esversion: 6 */
app.controller("TripController", ['TripFactory', '$filter', '$routeParams', function(TripFactory, $filter, $routeParams) {
    console.log('TripController started');

    const tripFactory = TripFactory;

    let self = this;
    self.data = tripFactory.data;
    self.tripID = $routeParams.tripID;

    tripFactory.getTrip(self.tripID);

    tripFactory.getDays(self.tripID);

}]); // END: TripController
