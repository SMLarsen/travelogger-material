/*jshint esversion: 6 */
app.factory("MyTripFactory", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripFactory started');

    const authFactory = AuthFactory;

    let authData = authFactory.data;
    let data = {
        trips: [],
        trip: {},
        tripDays: [],
        userDays: [],
        day: {
            pois: [],
            routes: [],
            meals: [],
            recommendations: []
        }
    };

    // Function to GET trips
    function getTrips() {
      console.log('authData.isUserLoggedIn', authData.isUserLoggedIn);
        if (authData.isUserLoggedIn) {
            return authFactory.getIdToken()
                .then((currentUser) => {
                    return $http({
                            method: 'GET',
                            url: '/trip/all/' + authData.currentUser.id,
                            headers: {
                                id_token: authData.currentUser.authIdToken
                            }
                        })
                        .then((response) => data.trips = response.data)
                        .catch((err) => console.log('Unable to retrieve trips', err));
                });
        } else {
            return;
        }
    } // End getTrips

    // Function to GET a trip
    function getTrip(tripID) {
        if (authData.isUserLoggedIn) {
            return authFactory.getIdToken()
                .then((currentUser) => {
                    return $http({
                            method: 'GET',
                            url: '/trip/one/' + tripID,
                            headers: {
                                id_token: authData.currentUser.authIdToken
                            }
                        })
                        .then((response) => data.trip = response.data[0])
                        .catch((err) => console.log('Unable to retrieve trip', err));
                });
        } else {
            return;
        }
    } // End getTrip

    // Function to add a trips
    function addTrip() {
        console.log('addTrip:', data.trip);
        return authFactory.getIdToken()
            .then((currentUser) => {
                data.trip.user_id = authData.currentUser.id;
                // console.log('data.trip.user_id:', data.trip.user_id);
                return $http({
                        method: 'POST',
                        url: '/trip',
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        },
                        data: data.trip
                    })
                    .then((response) => data.trip = {})
                    .catch((err) => console.log('Unable to add trip', err));
            });
    } // End addTrip

    // Function to update a trip
    function updateTrip() {
        // console.log('updateTrip:', trip);
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'PUT',
                        url: '/trip/' + data.trip._id,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        },
                        data: data.trip
                    })
                    .catch((err) => console.log('Unable to update trip', err));
            });
    } // End updateTrip

    // Function to delete a trip
    function deleteTrip(tripID) {
        // console.log('deleteTrip:', tripID);
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'DELETE',
                        url: '/trip/' + tripID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .then((response) => data.trip = {})
                    .catch((err) => console.log('Unable to delete trip', err));
            });
    } // End deleteTrip

    // Function to add a day
    function addDay() {
        // console.log('addDay:', data.day);
        return authFactory.getIdToken()
            .then((currentUser) => {
                data.day.user_id = authData.currentUser.id;
                return $http({
                        method: 'POST',
                        url: '/day',
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        },
                        data: data.day
                    })
                    .then((response) => data.day = response.data)
                    .catch((err) => console.log('Unable to add new Day', err));
            });
    } // End addDay

    // Function to GET days for trip
    function getDays(tripID) {
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'GET',
                        url: '/day/all/' + tripID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .then((response) => data.tripDays = response.data)
                    .catch((err) => console.log('Unable to retrieve days', err));
            });
    } // End getDays


    // Function to GET all days for user
    function getUserDays(userID) {
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'GET',
                        url: '/day/user/' + userID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .then((response) => data.userDays = response.data)
                    .catch((err) => console.log('Unable to retrieve user days', err));
            });
    } // End getUserDays

    // Function to GET a day
    function getDay(dayID) {
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'GET',
                        url: '/day/one/' + dayID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .then((response) => data.day = response.data[0])
                    .catch((err) => console.log('Unable to retrieve day', err));
            });
    } // End getDay

    // Function to Update a day
    function updateDay() {
        console.log('updateDay:', data.day);
        return authFactory.getIdToken()
            .then((currentUser) => {
                data.day.user_id = authData.currentUser.id;
                return deleteDay(data.day._id)
            })
            .then((response) => {
                delete data.day._id;
                return addDay();
            })
            .catch((err) => console.log('Unable to update day', err));
    } // End updateDay

    // Function to Delete a day
    function deleteDay(dayID) {
        console.log('deleteDay:', dayID);
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'DELETE',
                        url: '/day/one/' + dayID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .catch((err) => console.log('Unable to delete day', err));
            });
    } // End deleteDay

    // Function to Delete all days for a trip
    function deleteTripDays(tripID) {
        console.log('delete days for trip:', tripID);
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'DELETE',
                        url: '/day/trip/' + tripID,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .catch((err) => console.log('Unable to delete days for trip', err));
            });
    } // End deleteTripDays

    const publicApi = {
        data: data,
        getTrips: function() {
            return getTrips();
        },
        getTrip: function(tripID) {
            return getTrip(tripID);
        },
        addTrip: function() {
            return addTrip();
        },
        updateTrip: function() {
            return updateTrip();
        },
        deleteTrip: function(trip) {
            return deleteTrip(trip);
        },
        addDay: function() {
            return addDay();
        },
        getDays: function(tripID) {
            return getDays(tripID);
        },
        getUserDays: function(userID) {
            return getUserDays(userID);
        },
        getDay: function(dayID) {
            return getDay(dayID);
        },
        updateDay: function() {
            return updateDay();
        },
        deleteDay: function(dayID) {
            return deleteDay(dayID);
        },
        deleteTripDays: function(tripID) {
            return deleteTripDays(tripID);
        }
    };

    return publicApi;
}]); // END: MyTripFactory updatePOI(index, data, dayID)
