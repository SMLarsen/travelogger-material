app.factory("TripFactory", function($http) {
    console.log('TripFactory started');

    var trips = [];
    var trip = {};
    var days = [];

    // Function to GET trips
    function getTrips() {
        return $http.get('/guest/trips')
            .then(function(response) {
                    trips = response.data;
                    console.log('All trips:', trips);
                    return trips;
                },
                function(err) {
                    console.log('Unable to retrieve all trips', err);
                    return;
                });
    } // End getTrips

    // Function to GET a single trip
    function getTrip(tripID) {
        console.log('Getting trip for:', tripID);
        return $http.get('/guest/trip/' + tripID)
            .then(function(response) {
                    trip = response.data[0];
                    console.log('Trip returned:', trip);
                    return trip;
                },
                function(err) {
                    console.log('Unable to retrieve trip', err);
                    return;
                });
    } // End getTrip

    // Function to GET days
    getDays = function(tripID) {
        console.log('Getting days for:', tripID);
        return $http.get('/guest/day/' + tripID)
            .then(function(response) {
                    days = response.data;
                    console.log('All days:', days);
                    return days;
                },
                function(err) {
                    console.log('Unable to retrieve days', err);
                    return;
                });
    }; // End getDays

    var publicApi = {
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
