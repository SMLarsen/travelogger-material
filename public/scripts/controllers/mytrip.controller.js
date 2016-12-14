app.controller("MyTripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripController started');
    var self = this;
    self.trips = [];
    self.days = [];
    self.pois = [];
    self.routes = [];
    self.meals = [];
    self.recommendations = [];

    var authFactory = AuthFactory;
    self.newTrip = {};
    self.newDay = {
        interesting_locations: [],
        routes: [],
        meals: [],
        recommendations: []
    };
    self.newPointOfInterest = {
        name: '',
        description: ''
    };

    self.newRoute = {};
    self.newMeal = {};
    self.newRecommendation = {};

    self.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    self.statusInner = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    // self.isCollapsed = true;

    self.oneAtATime = true;

    getTrips();

    // Function to GET trips
    function getTrips() {
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'GET',
                url: '/trip/' + loginUser.id,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    self.trips = response.data;
                    console.log('response.data', response.data);
                },
                function(err) {
                    console.log('Unable to retrieve trips', err);
                });
        });
    } // End getTrips

    // Function to add a trips
    self.addTrip = function() {
        console.log('addTrip:', self.newTrip);
        authFactory.getIdToken().then(function(loginUser) {
            self.newTrip.user_id = loginUser.id;
            // console.log('With id:', self.newTrip);
            $http({
                method: 'POST',
                url: '/trip',
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newTrip
            }).then(function(response) {
                    console.log('Trip added');
                    self.newTrip = {};
                    getTrips();
                },
                function(err) {
                    console.log('Unable to add trip', err);
                });
        });
    }; // End addTrip

    // Function to update a trip
    self.updateTrip = function(trip) {
        console.log('updateTrip', trip);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/trip/' + trip._id,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: trip
            }).then(function(response) {
                    console.log('Trip updated');
                    getTrips();
                },
                function(err) {
                    console.log('Unable to update trip', err);
                });
        });
    }; // End updateTrip

    // Function to delete a trip
    self.deleteTrip = function(tripID) {
        console.log('delete trip:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/trip/' + tripID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Trip deleted');
                    deleteTripDays(tripID);
                    getTrips();

                },
                function(err) {
                    console.log('Unable to delete trip', err);
                });
        });
    }; // End deleteTrip

    // Function to add a day
    self.addDay = function(tripID) {
        self.newDay.trip_id = tripID;
        console.log('addDay:', self.newDay);
        authFactory.getIdToken().then(function(loginUser) {
            self.newDay.user_id = loginUser.id;
            // console.log('With id:', self.newDay);
            $http({
                method: 'POST',
                url: '/day',
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newDay
            }).then(function(response) {
                    console.log('Day added');
                    self.newDay = {};
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to add day', err);
                });
        });
    }; // End addDay

    // Function to GET days
    self.getDays = function(tripID) {
        console.log('getting days for:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'GET',
                url: '/day/' + tripID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    self.days = response.data;
                    console.log('response.data', self.days);
                },
                function(err) {
                    console.log('Unable to retrieve days', err);
                });
        });
    }; // End getDays

    // Function to Update a day's general data
    self.updateDayGeneral = function(day, dayID, tripID) {
        day._id = dayID;
        console.log('update day general:', day, dayID, tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/general/' + day._id,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: day
            }).then(function(response) {
                    console.log('Day general data updated');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to update day general info', err);
                });
        });
    }; // End updateDay

    // Function to Delete a day
    self.deleteDay = function(dayID, tripID) {
        console.log('delete day:', dayID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/day/one/' + dayID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Day deleted');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to delete day', err);
                });
        });
    }; // End deleteDay

    // Function to Delete all days for a trip
    deleteTripDays = function(tripID) {
        console.log('delete days for trip:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/day/trip/' + tripID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Days deleted for trip');
                },
                function(err) {
                    console.log('Unable to delete days for trip', err);
                });
        });
    }; // End deleteTripDays

    // // Add route to new Day
    // self.addRoute = function() {
    //     self.newDay.routes.push(angular.copy(self.route));
    //     self.route = {};
    // }; // End addRoute
    //
    // // Add meal to new Day
    // self.addMeal = function() {
    //     self.newDay.meals.push(angular.copy(self.meal));
    //     self.meal = {};
    // }; // End addMeal
    //
    // // Add Recommendation to new Day
    // self.addRecommendation = function() {
    //     self.newDay.recommendations.push(angular.copy(self.recommendation));
    //     self.recommendation = {};
    // }; // End addRecommendation

    // Point of interest add, update, delete

    // add poi to day
    self.addPOI = function(dayID, tripID) {
        console.log('addPOI:', '\n', 'name:', self.newPointOfInterest.name, '\ndesc:', self.newPointOfInterest.description, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/addpoi/' + dayID,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newPointOfInterest
            }).then(function(response) {
                    console.log('POI added');
                    self.newPointOfInterest = {};
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to add POI', err);
                });
        });
    }; // End: addPOI

    // update poi
    self.updatePOI = function(index, data, dayID, tripID) {
        console.log('updatePOI:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/updatepoi/' + dayID + '/' + index,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: data
            }).then(function(response) {
                    console.log('POI updated');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to update POI', err);
                });
        });
    }; // End: updatePOI

    // Begin: delete point of interest
    self.deletePOI = function(poiID, dayID, tripID) {
        console.log(poiID, dayID, tripID);
        // self.days[parentIndex].interesting_locations.splice(index, 1);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/day/poi/' + dayID + '/' + poiID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Day poi deleted');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to delete day poi', err);
                });
        });
    }; // End deletePOI

    // Route add, update, delete

    // add route to day
    self.addRoute = function(dayID, tripID) {
        console.log('addRoute:', '\n', 'name:', self.newRoute.name, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/addroute/' + dayID,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newRoute
            }).then(function(response) {
                    console.log('POI added');
                    self.newRoute = {};
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to add POI', err);
                });
        });
    }; // End: addRoute

    // update route
    self.updateRoute = function(index, data, dayID, tripID) {
        console.log('updateRoute:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/updateroute/' + dayID + '/' + index,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: data
            }).then(function(response) {
                    console.log('Route updated');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to update Route', err);
                });
        });
    }; // End: updateRoute

    // Begin: delete route
    self.deleteRoute = function(routeID, dayID, tripID) {
        console.log(routeID, dayID, tripID);
        // self.days[parentIndex].interesting_locations.splice(index, 1);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/day/route/' + dayID + '/' + routeID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Day route deleted');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to delete day route', err);
                });
        });
    }; // End deleteRoute

    // Route add, update, delete

    // add meal to day
    self.addMeal = function(dayID, tripID) {
        console.log('addMeal:', '\n', 'name:', self.newMeal.name, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/addmeal/' + dayID,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newMeal
            }).then(function(response) {
                    console.log('POI added');
                    self.newMeal = {};
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to add POI', err);
                });
        });
    }; // End: addMeal

    // update meal
    self.updateMeal = function(index, data, dayID, tripID) {
        console.log('updateMeal:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/updatemeal/' + dayID + '/' + index,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: data
            }).then(function(response) {
                    console.log('Meal updated');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to update Meal', err);
                });
        });
    }; // End: updateMeal

    // Begin: delete meal
    self.deleteMeal = function(mealID, dayID, tripID) {
        console.log(mealID, dayID, tripID);
        // self.days[parentIndex].interesting_locations.splice(index, 1);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'DELETE',
                url: '/day/meal/' + dayID + '/' + mealID,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    console.log('Day meal deleted');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to delete day meal', err);
                });
        });
    }; // End deleteMeal

        // add recommendation to day
        self.addRecommendation = function(dayID, tripID) {
            console.log('addRecommendation:', '\n', 'text:', self.newRecommendation.text, '\ndayID:', dayID, '\ntripID:', tripID);
            authFactory.getIdToken().then(function(loginUser) {
                $http({
                    method: 'PUT',
                    url: '/day/addrecommendation/' + dayID,
                    headers: {
                        id_token: loginUser.authIdToken
                    },
                    data: self.newRecommendation
                }).then(function(response) {
                        console.log('Recommendation added');
                        self.newRecommendation = {};
                        self.getDays(tripID);
                    },
                    function(err) {
                        console.log('Unable to add Recommendation', err);
                    });
            });
        }; // End: addRecommendation

        // update recommendation
        self.updateRecommendation = function(index, data, dayID, tripID) {
            console.log('updateRecommendation:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
            authFactory.getIdToken().then(function(loginUser) {
                $http({
                    method: 'PUT',
                    url: '/day/updaterecommendation/' + dayID + '/' + index,
                    headers: {
                        id_token: loginUser.authIdToken
                    },
                    data: data
                }).then(function(response) {
                        console.log('Recommendation updated');
                        self.getDays(tripID);
                    },
                    function(err) {
                        console.log('Unable to update Recommendation', err);
                    });
            });
        }; // End: updateRecommendation

        // Begin: delete recommendation
        self.deleteRecommendation = function(recommendationID, dayID, tripID) {
            console.log(recommendationID, dayID, tripID);
            // self.days[parentIndex].interesting_locations.splice(index, 1);
            authFactory.getIdToken().then(function(loginUser) {
                $http({
                    method: 'DELETE',
                    url: '/day/recommendation/' + dayID + '/' + recommendationID,
                    headers: {
                        id_token: loginUser.authIdToken
                    }
                }).then(function(response) {
                        console.log('Recommendation deleted');
                        self.getDays(tripID);
                    },
                    function(err) {
                        console.log('Unable to delete recommendation', err);
                    });
            });
        }; // End delete recommendation

}]); // END: TripController
