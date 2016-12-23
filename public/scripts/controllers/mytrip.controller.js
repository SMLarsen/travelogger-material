app.controller('MyTripController', ['MyTripFactory', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, $http, AuthFactory, NgMap, GeoCoder) {
    console.log('MyTripController started');
    var self = this;

    var myTripFactory = MyTripFactory;

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

    var openState = {
        openstate: false
    };
    self.addTripStatus = false;
    self.addDayStatus = false;
    self.tripStatus = [];
    self.dayStatus = [];

    self.statusInner = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    self.oneAtATime = true;

    self.tripIndex = 0;
    self.dayIndex = 0;

    var currentUser = authFactory.currentUser;

    myTripFactory.getTrips()
        .then(function(response) {
                self.trips = response;
                console.log('Trips returned', self.trips);
                buildTripStatusArray();
            },
            function(err) {
                console.log('Error getting trips', err);
            });

    // function to geocode destination
    self.pinDestinationLocation = function() {
        self.newTrip.destination_location = locationGeocode(self.newTrip.destination);
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        self.newTrip.begin_location = locationGeocode(self.newTrip.begin_location);
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        self.newTrip.end_location = locationGeocode(self.newTrip.end_location);
    }; // end pinEndLocation

    function locationGeocode(address) {
        GeoCoder.geocode({
            address: address
        }).then(function(result) {
            console.log('Address geocode result:', result[0]);
            return result[0];
        });
    }

    // Function to set up collapse/expand status for trip panels
    function buildTripStatusArray() {
        self.tripStatus = [];
        for (var i = 0; i < self.trips.length; i++) {
            self.tripStatus.push(openState);
        }
    }
    // End buildTripStatusArray

    // Function to add a trip
    self.addTrip = function() {
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

    // // Function to update a trip
    self.updateTrip = function(trip) {
        console.log('updateTrip:', trip);
        myTripFactory.updateTrip(trip)
            .then(function(response) {
                    myTripFactory.getTrips()
                        .then(function(response) {
                                self.trips = response;
                                console.log('Trip updated', self.trips);
                            },
                            function(err) {
                                console.log('Error updating trips', err);
                            });

                },
                function(err) {
                    console.log('Unable to update trip', err);
                }
            );
    }; // End updateTrip

    self.updateTripStatus = function(index) {
        console.log('updateTripStatus', index);
        self.tripStatus[index].openState = false;
    };

    // Function to delete a trip
    self.deleteTrip = function(tripID) {
        myTripFactory.deleteTrip(tripID)
            .then(function(response) {
                    myTripFactory.deleteTripDays(tripID)
                        .then(function(response) {
                                myTripFactory.getTrips()
                                    .then(function(response) {
                                            self.trips = response;
                                            console.log('Trip deleted', self.trips);
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

    // // Function to add a day
    self.addDay = function(tripID) {
        self.newDay.user_id = currentUser.id;
        self.newDay.trip_id = tripID;
        console.log('addDay:', self.newDay);
        myTripFactory.addDay(self.newDay)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.newDay = {};
                                self.days = response;
                                console.log('Day added', self.days);
                            },
                            function(err) {
                                console.log('Error getting days', err);
                            });

                },
                function(err) {
                    console.log('Unable to add day', err);
                }
            );
    }; // End addDay

    // Function to GET days
    self.getDays = function(tripID) {
        myTripFactory.getDays(tripID)
            .then(function(response) {
                    self.days = response;
                    console.log('Days returned', self.days);
                    buildDayStatusArray();
                },
                function(err) {
                    console.log('Error getting days', err);
                });
    }; // End getDays

    // Function to set up collapse/expand status for trip panels
    function buildDayStatusArray() {
        self.dayStatus = [];
        for (var i = 0; i < self.days.length; i++) {
            self.dayStatus.push(openState);
        }
    }
    // End buildTripStatusArray

    // Function to Update a day's general data
    self.updateDayGeneral = function(day, dayID, tripID) {
        day._id = dayID;
        console.log('update day general:', day, dayID, tripID);
        myTripFactory.updateDayGeneral(day)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('Day updated', self.trips);
                            },
                            function(err) {
                                console.log('Error updating days', err);
                            });
                },
                function(err) {
                    console.log('Unable to update day', err);
                }
            );
    }; // End updateDayGeneral

    // Function to Delete a day
    self.deleteDay = function(dayID, tripID) {
        console.log('delete day:', dayID);
        myTripFactory.deleteDay(dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('Day deleted', self.days);
                            },
                            function(err) {
                                console.log('Error getting days after delete', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete day', err);
                });
    }; // End deleteDay

    // Add route row to new Day
    self.addRouteRow = function() {
        self.newDay.routes.push(angular.copy(self.route));
        self.route = {};
    }; // End addRouteRow

    // Add meal row to new Day
    self.addMealRow = function() {
        self.newDay.meals.push(angular.copy(self.meal));
        self.meal = {};
    }; // End addMeal

    // Add Recommendation row to new Day
    self.addRecommendationRow = function() {
        self.newDay.recommendations.push(angular.copy(self.recommendation));
        self.recommendation = {};
    }; // End addRecommendation

    // Point of interest add, update, delete

    // add poi to day
    self.addPOI = function(dayID, tripID) {
        console.log('addPOI:', '\n', 'name:', self.newPointOfInterest.name, '\ndesc:', self.newPointOfInterest.description, '\ndayID:', dayID, '\ntripID:', tripID);
        myTripFactory.addPOI(self.newPointOfInterest, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.newDay = {};
                                self.days = response;
                                console.log('POI added', self.days);
                            },
                            function(err) {
                                console.log('Error adding POI', err);
                            });

                },
                function(err) {
                    console.log('Unable to add POI', err);
                }
            );
    }; // End: addPOI

    // update poi
    self.updatePOI = function(index, data, dayID, tripID) {
        console.log('updatePOI:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
        myTripFactory.updatePOI(index, data, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('POI updated');
                            },
                            function(err) {
                                console.log('Error updating POI', err);
                            });
                },
                function(err) {
                    console.log('Unable to update POI', err);
                }
            );
    }; // End: updatePOI

    // Begin: delete point of interest
    self.deletePOI = function(poiID, dayID, tripID) {
        console.log('Delete POI:', poiID, dayID, tripID);
        myTripFactory.deletePOI(poiID, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('POI deleted');
                            },
                            function(err) {
                                console.log('Error getting days after POI delete', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete POI', err);
                });
    }; // End deletePOI

    // Route add, update, delete

    // add route to day
    self.addRoute = function(dayID, tripID) {
        console.log('addRoute:', '\n', 'name:', self.newRoute.name, '\ndayID:', dayID, '\ntripID:', tripID);
        myTripFactory.addRoute(self.newRoute, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.newDay = {};
                                self.days = response;
                                console.log('Route added', self.days);
                            },
                            function(err) {
                                console.log('Error adding Route', err);
                            });
                },
                function(err) {
                    console.log('Unable to add Route', err);
                }
            );
    }; // End: addRoute

    // update route
    self.updateRoute = function(index, data, dayID, tripID) {
        console.log('updateRoute:', '\nindex:', index, '\ndata:', data, '\ndayID:', dayID, '\ntripID:', tripID);
        myTripFactory.updateRoute(index, data, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('Route updated');
                            },
                            function(err) {
                                console.log('Error updating Route', err);
                            });
                },
                function(err) {
                    console.log('Unable to update Route', err);
                }
            );
    }; // End: updateRoute

    // Begin: delete route
    self.deleteRoute = function(routeID, dayID, tripID) {
        console.log('Delete Route:', routeID, dayID, tripID);
        myTripFactory.deleteRoute(routeID, dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                self.days = response;
                                console.log('Route deleted');
                            },
                            function(err) {
                                console.log('Error getting days after Route delete', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete Route', err);
                });
    }; // End deleteRoute

    // Meal add, update, delete

    // add meal to day
    self.addMeal = function(dayID, tripID) {
        console.log('addMeal:', '\n', 'name:', self.newMeal.name, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'PUT',
                url: '/day/addmeal/' + dayID,
                headers: {
                    id_token: currentUser.authIdToken
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
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'PUT',
                url: '/day/updatemeal/' + dayID + '/' + index,
                headers: {
                    id_token: currentUser.authIdToken
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
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'DELETE',
                url: '/day/meal/' + dayID + '/' + mealID,
                headers: {
                    id_token: currentUser.authIdToken
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
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'PUT',
                url: '/day/addrecommendation/' + dayID,
                headers: {
                    id_token: currentUser.authIdToken
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
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'PUT',
                url: '/day/updaterecommendation/' + dayID + '/' + index,
                headers: {
                    id_token: currentUser.authIdToken
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
        authFactory.getIdToken().then(function(currentUser) {
            $http({
                method: 'DELETE',
                url: '/day/recommendation/' + dayID + '/' + recommendationID,
                headers: {
                    id_token: currentUser.authIdToken
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

}]); // END: MyTripController
