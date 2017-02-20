/*jshint esversion: 6 */
app.controller('EditTripController', ['MyTripFactory', 'NgMap', 'GeoCoder', '$routeParams', 'NavFactory', function(MyTripFactory, NgMap, GeoCoder, $routeParams, NavFactory) {
    console.log('EditTripController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    var self = this;
    self.data = myTripFactory.data;
    var tripID = $routeParams.tripID;

    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];
    self.trip = {};

    // Set left nav parameters
    navFactory.setNav('Change Trip', '#/mytrips', true);

    // Get trip
    myTripFactory.getTrip(tripID)
        .then(function(response) {
                self.data.trip.begin_date = new Date(self.data.trip.begin_date);
                self.data.trip.end_date = new Date(self.data.trip.end_date);
            },
            function(err) {
                console.log('Error getting trip', err);
            });

    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        self.map.setCenter(self.place.geometry.location);
        let location = self.place.geometry.location;
        self.lat = location.lat();
        self.lng = location.lng();
        self.data.trip.destination_location = {
            pos: [self.lat, self.lng]
        };
        NgMap.getMap()
            .then(function(map) {
                self.map = map;
            });
    };

    NgMap.getMap()
        .then(function(map) {
            self.map = map;
        });

    // Function to update a trip
    self.updateTrip = function() {
        myTripFactory.updateTrip(self.data.trip)
            .then(function(response) {
                    window.location = '/#/mytrips';
                },
                function(err) {
                    console.log('Unable to update trip', err);
                }
            );
    }; // End updateTrip

}]); // END: MyTripController
