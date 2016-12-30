app.controller('MyTripController', ['MyTripFactory', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, $http, AuthFactory, NgMap, GeoCoder) {
    console.log('MyTripController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;

    self.trips = [];

    var currentUser = authFactory.currentUser;

    // Get all trips for the user
    myTripFactory.getTrips()
        .then(function(response) {
                self.trips = response;
                // console.log('Trips returned', self.trips);
                self.trips.forEach(formatDates);
            },
            function(err) {
                console.log('Error getting trips', err);
            });

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
                                console.log('Trips added');
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
    // Function to delete a trip
    self.deleteTrip = function(tripID) {
      console.log('tripID:', tripID);
        myTripFactory.deleteTrip(tripID)
            .then(function(response) {
                    myTripFactory.deleteTripDays(tripID)
                        .then(function(response) {
                                myTripFactory.getTrips()
                                    .then(function(response) {
                                            self.trips = response;
                                            console.log('Trip deleted');
                                        },
                                        function(err) {
                                            console.log('Error getting trips after delete', err);
                                        });
                            },
                            function(err) {
                                console.log('Error deleting trip', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete trip', err);
                });
    }; // End deleteTrip

}]); // END: MyTripController
