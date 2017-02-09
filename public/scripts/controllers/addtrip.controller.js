/*jshint esversion: 6 */
app.controller('AddTripController', ['MyTripFactory', '$scope', 'NgMap', 'GeoCoder', function(MyTripFactory, $scope, NgMap, GeoCoder) {
    console.log('AddTripController started');

    let self = this;
    self.data = MyTripFactory.data;

    self.newTrip = {};
    self.positions = [];

    self.newAddress = '';
    self.lat = '';
    self.lng = '';
    self.locationArray = [];
    self.startLocation = '';
    self.endLocation = '';

    function buildLocationArray() {
        self.locationArray = [];
        self.locationArray.push(self.trip.destination_location);
        self.locationArray.push(self.trip.begin_map_location);
        self.locationArray.push(self.trip.end_map_location);
    }

    self.findAddress = function(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            let location = result[0].geometry.location;
            self.lat = location.lat();
            self.lng = location.lng();
            self.newLocation = {
                pos: [self.lat, self.lng]
            };
        });
    };

    // function to geocode destination
    self.pinDestinationLocation = function() {
        self.findAddress(self.newTrip.destination)
            .then(function(result) {
                self.newTrip.destination_location = self.newLocation;
                buildLocationArray();
                $scope.$apply();
            });
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        self.findAddress(self.newTrip.begin_location)
            .then(function(result) {
                self.newTrip.begin_map_location = self.newLocation;
                buildLocationArray();
                $scope.$apply();
            });
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        self.findAddress(self.newTrip.end_location)
            .then(function(result) {
                self.newTrip.end_map_location = self.newLocation;
                buildLocationArray();
                $scope.$apply();
            });
    }; // end pinEndLocation

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // Function to add a trip
    self.addTrip = function() {
        myTripFactory.addTrip(self.newTrip)
            .then(function(response) {
                    self.newTrip = {};
                    myTripFactory.getTrips()
                        .then(function(response) {
                                self.addTripStatus = false;
                                console.log('Trip added');
                                self.newTrip = {};
                                window.location = '/#/mytrips';
                            },
                            function(err) {
                                console.log('Error getting trips', err);
                            });

                },
                function(err) {
                    console.log('Unable to add trip', err);
                }
            );
    }; // End addTrip

    self.cancel = function() {
        self.newTrip = {};
        window.location = '/#/mytrips';
    };

}]); // END: MyTripController
