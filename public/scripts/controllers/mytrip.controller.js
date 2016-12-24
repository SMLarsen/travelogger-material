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
                console.log('Trips returned', self.trips);
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

}]); // END: MyTripController
