app.factory("MyTripFactory", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripFactory started');

    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    var trips = [];
    var days = [];
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
                            console.log('My Trips:', trips);
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
            // console.log('authfact isUserLoggedIn', authFactory.isUserLoggedIn);
            if (authFactory.isUserLoggedIn) {
                return authFactory.getIdToken().then(function(currentUser) {
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
        function getDay(tripID) {
            return authFactory.getIdToken().then(function(currentUser) {
                return $http({
                        method: 'GET',
                        url: '/day/one/' + tripID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            day = response.data;
                            console.log('My Day:', day);
                            return day;
                        },
                        function(err) {
                            console.log('Unable to retrieve day', err);
                            return;
                        });
            });
        } // End getDay

    // Function to Update a day's general data
    function updateDayGeneral(day) {
        console.log('updateDayGeneral:', day);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/general/' + day._id,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: day
                    })
                    .then(function(response) {
                            console.log('Day general info updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update day general info', err);
                            return;
                        });
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

    // add poi to day
    function addPOI(newPointOfInterest, dayID) {
        console.log('addPOI:', '\n', 'name:', newPointOfInterest.name, '\ndesc:', newPointOfInterest.description, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/addpoi/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newPointOfInterest
                    })
                    .then(function(response) {
                            console.log('POI added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add new POI', err);
                            return;
                        }
                    );
            });
    } // End: addPOI

    // update poi
    function updatePOI(index, data, dayID) {
        console.log('updatePOI:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/updatepoi/' + dayID + '/' + index,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: data
                    })
                    .then(function(response) {
                            console.log('Day POI info updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update day POI info', err);
                            return;
                        });
            });
    } // End: updatePOI

    // Begin: delete point of interest
    function deletePOI(poiID, dayID) {
        console.log('Delete POI:', poiID, dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/poi/' + dayID + '/' + poiID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('POI deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete POI', err);
                            return;
                        });
            });
    } // End deletePOI

    // Route add, update, delete

    // add route to day
    function addRoute(newRoute, dayID) {
        console.log('addRoute:', '\n', 'name:', newRoute.name, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/addroute/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newRoute
                    })
                    .then(function(response) {
                            console.log('Route added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add new Route', err);
                            return;
                        }
                    );
            });
    } // End: addRoute

    // update route

    function updateRoute(index, data, dayID) {
        console.log('updateRoute:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/updateroute/' + dayID + '/' + index,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: data
                    })
                    .then(function(response) {
                            console.log('Day Route info updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update day Route info', err);
                            return;
                        });
            });
    } // End: updateRoute

    // Begin: delete route
    function deleteRoute(routeID, dayID) {
        console.log('Delete Route:', routeID, dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/route/' + dayID + '/' + routeID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Route deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete Route', err);
                            return;
                        });
            });
    } // End deleteRoute

    // Meal add, update, delete

    // add meal to day
    function addMeal(newMeal, dayID) {
        console.log('addMeal:', '\n', 'name:', newMeal.name, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/addmeal/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newMeal
                    })
                    .then(function(response) {
                            console.log('Meal added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add new Meal', err);
                            return;
                        }
                    );
            });
    } // End: addMeal

    // update meal
    function updateMeal(index, data, dayID) {
        console.log('updateMeal:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/updatemeal/' + dayID + '/' + index,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: data
                    })
                    .then(function(response) {
                            console.log('Day Meal info updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update day Meal info', err);
                            return;
                        });
            });
    } // End: updateMeal

    // Begin: delete meal
    function deleteMeal(mealID, dayID) {
        console.log('Delete Meal:', mealID, dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/meal/' + dayID + '/' + mealID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Meal deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete Meal', err);
                            return;
                        });
            });
    } // End deleteMeal

    // add recommendation to day
    function addRecommendation(newRecommendation, dayID) {
        console.log('addRecommendation:', '\n', 'name:', newRecommendation.text, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/addrecommendation/' + dayID,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: newRecommendation
                    })
                    .then(function(response) {
                            console.log('Recommendation added');
                            newTrip = {};
                            return;
                        },
                        function(err) {
                            console.log('Unable to add new Recommendation', err);
                            return;
                        }
                    );
            });
    } // End: addRecommendation

    // update recommendation
    function updateRecommendation(index, data, dayID) {
        console.log('updateRecommendation:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'PUT',
                        url: '/day/updaterecommendation/' + dayID + '/' + index,
                        headers: {
                            id_token: currentUser.authIdToken
                        },
                        data: data
                    })
                    .then(function(response) {
                            console.log('Day Recommendation info updated');
                            return;
                        },
                        function(err) {
                            console.log('Unable to update day Recommendation info', err);
                            return;
                        });
            });
    } // End: updateRecommendation

    // Begin: delete recommendation
    function deleteRecommendation(recommendationID, dayID) {
        console.log('Delete Recommendation:', recommendationID, dayID);
        return authFactory.getIdToken()
            .then(function(currentUser) {
                return $http({
                        method: 'DELETE',
                        url: '/day/recommendation/' + dayID + '/' + recommendationID,
                        headers: {
                            id_token: currentUser.authIdToken
                        }
                    })
                    .then(function(response) {
                            console.log('Recommendation deleted');
                            return;
                        },
                        function(err) {
                            console.log('Unable to delete Recommendation', err);
                            return;
                        });
            });
    } // End delete recommendation

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
        updateDayGeneral: function(day) {
            return updateDayGeneral(day);
        },
        deleteDay: function(dayID) {
            return deleteDay(dayID);
        },
        deleteTripDays: function(tripID) {
            return deleteTripDays(tripID);
        },
        addPOI: function(newPointOfInterest, dayID) {
            return addPOI(newPointOfInterest, dayID);
        },
        updatePOI: function(index, data, dayID) {
            return updatePOI(index, data, dayID);
        },
        deletePOI: function(poiID, dayID) {
            return deletePOI(poiID, dayID);
        },
        addRoute: function(newRoute, dayID) {
            return addRoute(newRoute, dayID);
        },
        updateRoute: function(index, data, dayID) {
            return updateRoute(index, data, dayID);
        },
        deleteRoute: function(routeID, dayID) {
            return deleteRoute(routeID, dayID);
        },
        addMeal: function(newMeal, dayID) {
            return addMeal(newMeal, dayID);
        },
        updateMeal: function(index, data, dayID) {
            return updateMeal(index, data, dayID);
        },
        deleteMeal: function(mealID, dayID) {
            return deleteMeal(mealID, dayID);
        },
        addRecommendation: function(newRecommendation, dayID) {
            return addRecommendation(newRecommendation, dayID);
        },
        updateRecommendation: function(index, data, dayID) {
            return updateRecommendation(index, data, dayID);
        },
        deleteRecommendation: function(recommendationID, dayID) {
            return deleteRecommendation(recommendationID, dayID);
        }
    };

    return publicApi;
}]); // END: MyTripFactory updatePOI(index, data, dayID)
