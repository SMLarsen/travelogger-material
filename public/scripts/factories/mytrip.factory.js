app.factory("MyTripFactory", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripFactory started');

    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    var trips = [];
    var trip = {};
    var days = [];
    var day = {};
    var pois = [];
    var routes = [];
    var meals = [];
    var recommendations = [];

    var newTrip = {};
    var newDay = {
        interesting_locations: [],
        routes: [],
        meals: [],
        recommendations: []
    };
    var newPointOfInterest = {
        name: '',
        description: ''
    };

    var newRoute = {};
    var newMeal = {};
    var newRecommendation = {};

    // Function to GET trips
    function getTrips() {
        // console.log('authfact isUserLoggedIn', authFactory.isUserLoggedIn);
        if (authFactory.isUserLoggedIn) {
            return authFactory.getIdToken().then(function(currentUser) {
                return $http({
                        method: 'GET',
                        url: '/trip/all/' + currentUser.id,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            trips = response.data;
                            // console.log('My Trips:', trips);
                            return trips;
                        },
                        function(err) {
                            console.log('Unable to retrieve trips', err);
                            return;
                        });
            });
        } else {
            return;
        }
    } // End getTrips

    // Function to GET a trip
    function getTrip(tripID) {
        if (authFactory.isUserLoggedIn) {
            return authFactory.getIdToken()
                .then(function(currentUser) {
                    return $http({
                            method: 'GET',
                            url: '/trip/one/' + tripID,
                            headers: {
                                id_token: currentUser.authIdToken
                            }
                        })
                        .then(function(response) {
                                trip = response.data[0];
                                console.log('My Trip:', trip);
                                return trip;
                            },
                            function(err) {
                                console.log('Unable to retrieve trip', err);
                                return;
                            });
                });
        } else {
            return;
        }
    } // End getTrip

    // Function to add a trips
    function addTrip(newTrip) {
        console.log('addTrip:', newTrip);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                newTrip.user_id = currentUser.id;
                console.log('newTrip.user_id:', newTrip.user_id);
                return $http({
                        method: 'POST',
                        url: '/trip',
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newTrip
                    })
                    .then(function(response) {
                            console.log('Trip added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add trip', err);
                            return;
                        });
            });
    } // End addTrip

    // Function to update a trip
    function updateTrip(trip) {
        console.log('updateTrip:', trip);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/trip/' + trip._id,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: trip
                    })
                    .then(function(response) {
                            console.log('Trip updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update trip', err);
                            return;
                        });
            });
    } // End updateTrip

    // Function to delete a trip
    function deleteTrip(tripID) {
        console.log('deleteTrip:', tripID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/trip/' + tripID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Trip deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete trip', err);
                            return;
                        });
            });
    } // End deleteTrip

    // Function to add a day
    function addDay(newDay) {
        console.log('addDay:', newDay);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'POST',
                        url: '/day',
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newDay
                    })
                    .then(function(response) {
                            console.log('Day added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add new Day', err);
                            return;
                        }
                    );

            });
    } // End addDay

    // Function to GET days
    function getDays(tripID) {
        return authFactory.getIdToken().then(function(currentUser) {
            return $http({
                    method: 'GET',
                    url: '/day/all/' + tripID,
                    headers: {
                        id_token: currentUser.authIdToken
                    }
                })
                .then(function(response) {
                        days = response.data;
                        console.log('My Days:', days);
                        return days;
                    },
                    function(err) {
                        console.log('Unable to retrieve days', err);
                        return;
                    });
        });
    } // End getDays

    // Function to GET a day
    function getDay(dayID) {
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'GET',
                        url: '/day/one/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            day = response.data[0];
                            // console.log('My Day:', day);
                            return day;
                        },
                        function(err) {
                            console.log('Unable to retrieve day', err);
                            return;
                        });
            });
    } // End getDay

    // Function to Update a day
    function updateDay(day) {
        console.log('updateDay:', day);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return deleteDay(day._id)
                    .then(function(response) {
                            delete day._id;
                            return addDay(day)
                                .then(function(response) {
                                        console.log('Day updated (deleted/added)');
                                        return;
                                    },
                                    function(err) {
                                        console.log('Unable to update (add) day', err);
                                        return;
                                    });
                        },
                        function(err) {
                            console.log("Unable to update (delete) day", err);
                        }
                    );
            });
    } // End updateDay

    // Function to Delete a day
    function deleteDay(dayID) {
        console.log('deleteDay:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/one/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Day deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete day', err);
                            return;
                        });
            });
    } // End deleteDay

    // Function to Delete all days for a trip
    function deleteTripDays(tripID) {
        console.log('delete days for trip:', tripID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/trip/' + tripID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Days deleted for trip');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete days for trip', err);
                            return;
                        });
            });
    } // End deleteTripDays

    var publicApi = {
        getTrips: function() {
            return getTrips();
        },
        getTrip: function(tripID) {
            return getTrip(tripID);
        },
        addTrip: function(newTrip) {
            return addTrip(newTrip);
        },
        updateTrip: function(trip) {
            return updateTrip(trip);
        },
        deleteTrip: function(trip) {
            return deleteTrip(trip);
        },
        addDay: function(trip) {
            return addDay(trip);
        },
        getDays: function(tripID) {
            return getDays(tripID);
        },
        getDay: function(dayID) {
            return getDay(dayID);
        },
        updateDay: function(day) {
            return updateDay(day);
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
