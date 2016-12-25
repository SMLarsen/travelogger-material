app.controller('AddTripController', ['MyTripFactory', '$location', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, $location, $http, AuthFactory, NgMap, GeoCoder) {
    console.log('AddTripController started');
    var self = this;

    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    self.newTrip = {};
    self.positions = [];

    self.newAddress = '';
    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];
    self.startLocation = '';
    self.endLocation = '';

    function buildLocationArray() {
        var newLocation = {
            pos: [self.lat, self.lng],
            name: self.newAddress
        };
        self.locationArray.push(newLocation);
        console.log(self.locationArray);
        self.startLocation = self.locationArray[0];
        self.endLocation = self.locationArray[self.locationArray.length - 1];
        console.log('start:', self.startLocation);
        console.log('stop:', self.endLocation);
    }

    self.findAddress = function(address) {
        GeoCoder.geocode({
            address: address
        }).then(function(result) {
            self.location = result[0].geometry.location;
            self.lat = self.location.lat();
            self.lng = self.location.lng();
            console.log("Latitude: " + self.lat);
            console.log("Longitude: " + self.lng);
            buildLocationArray();
        });
    };

    // function to geocode destination
    self.pinDestinationLocation = function() {
        self.findAddress(self.newTrip.destination);
        self.newTrip.destination_location = self.location;
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        self.findAddress(self.newTrip.begin_location);
        self.newTrip.begin_map_location = self.location;
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        self.findAddress(self.newTrip.end_location);
        self.newTrip.end_map_location = self.location;
    }; // end pinEndLocation

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
