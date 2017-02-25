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
            .then((response) => data.trips = response.data)
            .catch((err) => console.log('Unable to retrieve all trips', err));
    } // End getTrips

    // Function to GET a single trip
    function getTrip(tripID) {
        return $http.get('/guest/trip/' + tripID)
            .then((response) => data.trip = response.data[0])
            .catch((err) => console.log('Unable to retrieve trip', err));
    } // End getTrip

    // Function to GET days
    function getDays(tripID) {
        return $http.get('/guest/day/' + tripID)
            .then((response) => data.days = response.data)
            .catch((err) => console.log('Unable to retrieve days', err));
    } // End getDays

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
