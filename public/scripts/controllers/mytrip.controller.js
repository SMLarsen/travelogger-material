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

    // Function to Update a day's points of interest
    self.updateDayPOI = function(index, dayID, tripID) {
        changedPOI = self.days[index].interesting_locations;
        console.log('update day POI:', changedPOI);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/poi/' + dayID,
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: changedPOI
            }).then(function(response) {
                    console.log('Day POI data updated');
                    self.getDays(tripID);
                },
                function(err) {
                    console.log('Unable to update day POI info', err);
                });
        });
    }; // End updateDayPOI

    // Function to Delete a day
    self.deleteDay = function(dayID) {
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

    // Add point of interest to new Day
    // self.addPOI = function() {
    //     self.newDay.interesting_locations.push(angular.copy(self.pointOfInterest));
    //     self.pointOfInterest = {};
    // }; // End addPOI

    // Add route to new Day
    self.addRoute = function() {
        self.newDay.routes.push(angular.copy(self.route));
        self.route = {};
    }; // End addRoute

    // Add meal to new Day
    self.addMeal = function() {
        self.newDay.meals.push(angular.copy(self.meal));
        self.meal = {};
    }; // End addMeal

    // Add Recommendation to new Day
    self.addRecommendation = function() {
        self.newDay.recommendations.push(angular.copy(self.recommendation));
        self.recommendation = {};
    }; // End addRecommendation

    // mark user as deleted
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
    };

    // add user
    self.addPOI = function(dayID, tripID) {
        console.log('addPOI:', '\n', 'name:', self.newPointOfInterest.name, '\ndesc:', self.newPointOfInterest.description, '\ndayID:', dayID, '\ntripID:', tripID);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'PUT',
                url: '/day/poi/' + dayID,
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
    };

    // save POI edits
    self.savePOI = function(index) {}; // End savePOI

}]); // END: TripController
