/*jshint esversion: 6 */
app.controller('EditTripController', ['MyTripFactory', '$location', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, $location, NgMap, GeoCoder, $routeParams) {
    console.log('EditTripController started');

    const myTripFactory = MyTripFactory;

    var self = this;
    self.data = myTripFactory.data;
    var tripID = $routeParams.tripID;

    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];
    self.trip = {};

    // Get trip
    myTripFactory.getTrip(tripID)
        .then(function(response) {
                self.data.trip.begin_date = new Date(self.trip.begin_date);
                self.data.trip.end_date = new Date(self.trip.end_date);
                buildLocationArray();
                console.log('Trip returned', self.data.trip);
            },
            function(err) {
                console.log('Error getting trip', err);
            });

    function buildLocationArray() {
        self.locationArray = [];
        self.locationArray.push(self.data.trip.destination_location);
        self.locationArray.push(self.data.trip.begin_map_location);
        self.locationArray.push(self.data.trip.end_map_location);
        console.log('locations:', self.locationArray);
    }

    function findAddress(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            var location = result[0].geometry.location;
            self.lat = location.lat();
            self.lng = location.lng();
            console.log("Latitude: " + self.lat);
            console.log("Longitude: " + self.lng);
            self.newLocation = {
                pos: [self.lat, self.lng]
            };
        });
    }

    // function to geocode destination
    self.pinDestinationLocation = function() {
        findAddress(self.data.trip.destination)
            .then(function(result) {
                self.data.trip.destination_location = self.newLocation;
                buildLocationArray();
            });
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        findAddress(self.data.trip.begin_location)
            .then(function(result) {
                self.data.trip.begin_map_location = self.newLocation;
                buildLocationArray();
            });
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        findAddress(self.data.trip.end_location)
            .then(function(result) {
                self.data.trip.end_map_location = self.newLocation;
                buildLocationArray();
            });
    }; // end pinEndLocation

    // Function to update a trip
    self.updateTrip = function() {
        console.log('update trip:', self.data.trip);
        myTripFactory.updateTrip(self.data.trip)
            .then(function(response) {
                    console.log('Trip updated');
                    window.location = '/#/mytrips';
                },
                function(err) {
                    console.log('Unable to update trip', err);
                }
            );
    }; // End updateTrip

    self.cancel = function() {
        window.location = '/#/mytrips';
    };

}]); // END: MyTripController
