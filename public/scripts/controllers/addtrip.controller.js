app.controller('AddTripController', ['MyTripFactory', '$location', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, $location, $http, AuthFactory, NgMap, GeoCoder) {
    console.log('AddTripController started');
    var self = this;

    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    self.newTrip = {};
    self.positions = [];

    // function to geocode destination
    self.pinDestinationLocation = function() {
        locationGeocode(self.newTrip.destination)
            .then(function(result) {
                self.newTrip.destination_location = location;
            });
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        locationGeocode(self.newTrip.begin_location)
            .then(function(result) {
                self.newTrip.begin_map_location = location;
            });
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        locationGeocode(self.newTrip.end_location)
            .then(function(result) {
                self.newTrip.end_map_location = location;
            });
    }; // end pinEndLocation

    function locationGeocode(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            console.log('results:', result);
            var lat = result[0].geometry.location.lat;
            var lng = result[0].geometry.location.lng;
            console.log("lat:", lat, "lng", lng);
            var location = {
                pos: [
                    lat,
                    lng,
                ]
            };
            self.newTrip.end_map_location = location;
            self.positions.push(location);
            console.log('positions:', self.positions);
            return location;
        });
    }

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // Function to add a trip
    self.addTrip = function() {
        console.log('add trip:', self.newTrip);
        myTripFactory.addTrip(self.newTrip)
            .then(function(response) {
                    self.newTrip = {};
                    myTripFactory.getTrips()
                        .then(function(response) {
                                self.trips = response;
                                self.addTripStatus = false;
                                console.log('Trips added', self.trips);
                                self.newTrip = {};
                                $location.path('mytrips');
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
        $location.path('mytrips');
    };

}]); // END: MyTripController
