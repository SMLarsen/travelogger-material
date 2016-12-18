app.factory("MyTripFactory", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripFactory started');

    var authFactory = AuthFactory;
    var loginUser = '';

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
        return authFactory.getIdToken().then(function(loginUser) {
            loginUser = loginUser;
            return $http({
                    method: 'GET',
                    url: '/trip/' + loginUser.id,
                    headers: {
                        id_token: loginUser.authIdToken
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
    } // End getTrips

    // Function to add a trips
    function addTrip(newTrip) {
        console.log('addTrip:', newTrip);
        return authFactory.getIdToken()
            .then(function(loginUser) {
                return $http({
                        method: 'POST',
                        url: '/trip',
                        headers: {
                            id_token: loginUser.authIdToken
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
            .then(function(loginUser) {
                return $http({
                        method: 'PUT',
                        url: '/trip/' + trip._id,
                        headers: {
                            id_token: loginUser.authIdToken
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
    //
    // // Function to delete a trip
    // deleteTrip = function(tripID) {
    //     console.log('delete trip:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/trip/' + tripID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Trip deleted');
    //                 deleteTripDays(tripID);
    //                 getTrips();
    //
    //             },
    //             function(err) {
    //                 console.log('Unable to delete trip', err);
    //             });
    //     });
    // }; // End deleteTrip
    //
    // // Function to add a day
    // addDay = function(tripID) {
    //     newDay.trip_id = tripID;
    //     console.log('addDay:', newDay);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         newDay.user_id = loginUser.id;
    //         // console.log('With id:', newDay);
    //         $http({
    //             method: 'POST',
    //             url: '/day',
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: newDay
    //         }).then(function(response) {
    //                 console.log('Day added');
    //                 newDay = {};
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to add day', err);
    //             });
    //     });
    // }; // End addDay
    //
    // // Function to GET days
    // getDays = function(tripID) {
    //     console.log('getting days for:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'GET',
    //             url: '/day/' + tripID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 days = response.data;
    //                 console.log('response.data', days);
    //             },
    //             function(err) {
    //                 console.log('Unable to retrieve days', err);
    //             });
    //     });
    // }; // End getDays
    //
    // // Function to Update a day's general data
    // updateDayGeneral = function(day, dayID, tripID) {
    //     day._id = dayID;
    //     console.log('update day general:', day, dayID, tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/general/' + day._id,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: day
    //         }).then(function(response) {
    //                 console.log('Day general data updated');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to update day general info', err);
    //             });
    //     });
    // }; // End updateDay
    //
    // // Function to Delete a day
    // deleteDay = function(dayID, tripID) {
    //     console.log('delete day:', dayID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/day/one/' + dayID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Day deleted');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to delete day', err);
    //             });
    //     });
    // }; // End deleteDay
    //
    // // Function to Delete all days for a trip
    // deleteTripDays = function(tripID) {
    //     console.log('delete days for trip:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/day/trip/' + tripID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Days deleted for trip');
    //             },
    //             function(err) {
    //                 console.log('Unable to delete days for trip', err);
    //             });
    //     });
    // }; // End deleteTripDays
    //
    // // add poi to day
    // addPOI = function(dayID, tripID) {
    //     console.log('addPOI:', '\n', 'name:', newPointOfInterest.name, '\ndesc:', newPointOfInterest.description, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/addpoi/' + dayID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: newPointOfInterest
    //         }).then(function(response) {
    //                 console.log('POI added');
    //                 newPointOfInterest = {};
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to add POI', err);
    //             });
    //     });
    // }; // End: addPOI
    //
    // // update poi
    // updatePOI = function(index, data, dayID, tripID) {
    //     console.log('updatePOI:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/updatepoi/' + dayID + '/' + index,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: data
    //         }).then(function(response) {
    //                 console.log('POI updated');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to update POI', err);
    //             });
    //     });
    // }; // End: updatePOI
    //
    // // Begin: delete point of interest
    // deletePOI = function(poiID, dayID, tripID) {
    //     console.log(poiID, dayID, tripID);
    //     // days[parentIndex].interesting_locations.splice(index, 1);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/day/poi/' + dayID + '/' + poiID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Day poi deleted');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to delete day poi', err);
    //             });
    //     });
    // }; // End deletePOI
    //
    // // Route add, update, delete
    //
    // // add route to day
    // addRoute = function(dayID, tripID) {
    //     console.log('addRoute:', '\n', 'name:', newRoute.name, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/addroute/' + dayID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: newRoute
    //         }).then(function(response) {
    //                 console.log('POI added');
    //                 newRoute = {};
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to add POI', err);
    //             });
    //     });
    // }; // End: addRoute
    //
    // // update route
    // updateRoute = function(index, data, dayID, tripID) {
    //     console.log('updateRoute:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/updateroute/' + dayID + '/' + index,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: data
    //         }).then(function(response) {
    //                 console.log('Route updated');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to update Route', err);
    //             });
    //     });
    // }; // End: updateRoute
    //
    // // Begin: delete route
    // deleteRoute = function(routeID, dayID, tripID) {
    //     console.log(routeID, dayID, tripID);
    //     // days[parentIndex].interesting_locations.splice(index, 1);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/day/route/' + dayID + '/' + routeID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Day route deleted');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to delete day route', err);
    //             });
    //     });
    // }; // End deleteRoute
    //
    // // Route add, update, delete
    //
    // // add meal to day
    // addMeal = function(dayID, tripID) {
    //     console.log('addMeal:', '\n', 'name:', newMeal.name, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/addmeal/' + dayID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: newMeal
    //         }).then(function(response) {
    //                 console.log('POI added');
    //                 newMeal = {};
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to add POI', err);
    //             });
    //     });
    // }; // End: addMeal
    //
    // // update meal
    // updateMeal = function(index, data, dayID, tripID) {
    //     console.log('updateMeal:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'PUT',
    //             url: '/day/updatemeal/' + dayID + '/' + index,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             },
    //             data: data
    //         }).then(function(response) {
    //                 console.log('Meal updated');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to update Meal', err);
    //             });
    //     });
    // }; // End: updateMeal
    //
    // // Begin: delete meal
    // deleteMeal = function(mealID, dayID, tripID) {
    //     console.log(mealID, dayID, tripID);
    //     // days[parentIndex].interesting_locations.splice(index, 1);
    //     authFactory.getIdToken().then(function(loginUser) {
    //         $http({
    //             method: 'DELETE',
    //             url: '/day/meal/' + dayID + '/' + mealID,
    //             headers: {
    //                 id_token: loginUser.authIdToken
    //             }
    //         }).then(function(response) {
    //                 console.log('Day meal deleted');
    //                 getDays(tripID);
    //             },
    //             function(err) {
    //                 console.log('Unable to delete day meal', err);
    //             });
    //     });
    // }; // End deleteMeal
    //
    //     // add recommendation to day
    //     addRecommendation = function(dayID, tripID) {
    //         console.log('addRecommendation:', '\n', 'text:', newRecommendation.text, '\ndayID:', dayID, '\ntripID:', tripID);
    //         authFactory.getIdToken().then(function(loginUser) {
    //             $http({
    //                 method: 'PUT',
    //                 url: '/day/addrecommendation/' + dayID,
    //                 headers: {
    //                     id_token: loginUser.authIdToken
    //                 },
    //                 data: newRecommendation
    //             }).then(function(response) {
    //                     console.log('Recommendation added');
    //                     newRecommendation = {};
    //                     getDays(tripID);
    //                 },
    //                 function(err) {
    //                     console.log('Unable to add Recommendation', err);
    //                 });
    //         });
    //     }; // End: addRecommendation
    //
    //     // update recommendation
    //     updateRecommendation = function(index, data, dayID, tripID) {
    //         console.log('updateRecommendation:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
    //         authFactory.getIdToken().then(function(loginUser) {
    //             $http({
    //                 method: 'PUT',
    //                 url: '/day/updaterecommendation/' + dayID + '/' + index,
    //                 headers: {
    //                     id_token: loginUser.authIdToken
    //                 },
    //                 data: data
    //             }).then(function(response) {
    //                     console.log('Recommendation updated');
    //                     getDays(tripID);
    //                 },
    //                 function(err) {
    //                     console.log('Unable to update Recommendation', err);
    //                 });
    //         });
    //     }; // End: updateRecommendation
    //
    //     // Begin: delete recommendation
    //     deleteRecommendation = function(recommendationID, dayID, tripID) {
    //         console.log(recommendationID, dayID, tripID);
    //         // days[parentIndex].interesting_locations.splice(index, 1);
    //         authFactory.getIdToken().then(function(loginUser) {
    //             $http({
    //                 method: 'DELETE',
    //                 url: '/day/recommendation/' + dayID + '/' + recommendationID,
    //                 headers: {
    //                     id_token: loginUser.authIdToken
    //                 }
    //             }).then(function(response) {
    //                     console.log('Recommendation deleted');
    //                     getDays(tripID);
    //                 },
    //                 function(err) {
    //                     console.log('Unable to delete recommendation', err);
    //                 });
    //         });
    //     }; // End delete recommendation
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // // Function to GET trips
    // function getTrips() {
    //     return $http.get('/guest/trips')
    //         .then(function(response) {
    //                 trips = response.data;
    //                 console.log('All trips:', trips);
    //                 return trips;
    //             },
    //             function(err) {
    //                 console.log('Unable to retrieve all trips', err);
    //                 return;
    //             });
    // } // End getTrips
    //
    // // Function to GET a single trip
    // function getTrip(tripID) {
    //     console.log('Getting trip for:', tripID);
    //     return $http.get('/guest/trip/' + tripID)
    //         .then(function(response) {
    //                 trip = response.data[0];
    //                 console.log('Trip returned:', trip);
    //                 return trip;
    //             },
    //             function(err) {
    //                 console.log('Unable to retrieve trip', err);
    //                 return;
    //             });
    // } // End getTrip
    //
    // // Function to GET days
    // getDays = function(tripID) {
    //     console.log('Getting days for:', tripID);
    //     return $http.get('/guest/day/' + tripID)
    //         .then(function(response) {
    //                 days = response.data;
    //                 console.log('All days:', days);
    //                 return days;
    //             },
    //             function(err) {
    //                 console.log('Unable to retrieve days', err);
    //                 return;
    //             });
    // }; // End getDays

    var publicApi = {
        getTrips: function() {
            return getTrips();
        },
        addTrip: function(newTrip) {
            return addTrip(newTrip);
        },
        updateTrip: function(trip) {
            return addTrip(trip);
            // },
            // getDays: function(tripID) {
            //     return getDays(tripID);
        }
    };

    return publicApi;
}]); // END: MyTripFactory
