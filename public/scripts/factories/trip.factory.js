/*jshint esversion: 6 */
app.factory("TripFactory", function($http) {
    console.log('TripFactory started');

    let data = {
      trips: [],
      trip: {},
      days: []
    };

    // Function to GET trips
    function getTrips() {
        return $http.get('/guest/trips')
            .then(function(response) {
                    data.trips = response.data;
                    return;
                },
                function(err) {
                    console.log('Unable to retrieve all trips', err);
                    return;
                });
    } // End getTrips

    // Function to GET a single trip
    function getTrip(tripID) {
        return $http.get('/guest/trip/' + tripID)
            .then(function(response) {
                    data.trip = response.data[0];
                    return;
                },
                function(err) {
                    console.log('Unable to retrieve trip', err);
                    return;
                });
    } // End getTrip

    // Function to GET days
    getDays = function(tripID) {
        return $http.get('/guest/day/' + tripID)
            .then(function(response) {
                    data.days = response.data;
                    return;
                },
                function(err) {
                    console.log('Unable to retrieve days', err);
                    return;
                });
    }; // End getDays

    var publicApi = {
        data: data,
        getTrips: function() {
            return getTrips();
        },
        getTrip: function(tripID) {
            return getTrip(tripID);
        },
        getDays: function(tripID) {
            return getDays(tripID);
        }
    };

    return publicApi;

}); // END: TripFactory
