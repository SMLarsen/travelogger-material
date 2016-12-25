app.controller('AddTripController', ['MyTripFactory', '$location', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, $location, $http, AuthFactory, NgMap, GeoCoder) {
    console.log('AddTripController started');
    var self = this;

    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    self.newTrip = {};

    // function to geocode destination
    self.pinDestinationLocation = function() {
        locationGeocode(self.newTrip.destination)
            .then(function(result) {
                self.newTrip.destination_location = result;
                self.positions.push(result.geometry.location);
                console.log('positions:', self.positions);
            });
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        locationGeocode(self.newTrip.begin_location).then(function(result) {
            self.newTrip.begin_map_location = result;
        });
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        locationGeocode(self.newTrip.end_location).then(function(result) {
            self.newTrip.end_map_location = result;
        });
    }; // end pinEndLocation

    function locationGeocode(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            console.log('Address geocode result:', result[0]);
            return result[0];
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
