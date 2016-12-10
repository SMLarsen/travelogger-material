app.controller("MyTripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripController started');
    var self = this;
    self.trips = [];
    self.days = [];
    var authFactory = AuthFactory;
    self.newTrip = {};
    self.newDay = {
        interesting_locations: [],
        routes: [],
        meals: [],
        recommendations: []
    };
    self.pointOfInterest = {};
    self.route = {};
    self.meal = {};
    self.recommendation = {};

    self.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

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
        console.log('addTrip', self.newTrip);
        authFactory.getIdToken().then(function(loginUser) {
            self.newTrip.user_id = loginUser.id;
            console.log('With id:', self.newTrip);
            $http({
                method: 'POST',
                url: '/trip',
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newTrip
            }).then(function(response) {
                    console.log('Trip added');
                    // self.status.isFirstOpen = false;
                    getTrips();
                },
                function(err) {
                    console.log('Unable to add trip', err);
                });
        });
    }; // End addTrip

    // Function to add a day
    self.addDay = function(tripID) {
        self.newDay.trip_id = tripID;
        console.log('addDay', self.newDay);
        authFactory.getIdToken().then(function(loginUser) {
            self.newDay.user_id = loginUser.id;
            console.log('loginUser:', loginUser.id);
            $http({
                method: 'POST',
                url: '/day',
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newDay
            }).then(function(response) {
                    console.log('Day added');
                    // self.isCollapsed = true;
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

    // Add point of interest to new Day
    self.addPOI = function() {
        self.newDay.interesting_locations.push(angular.copy(self.pointOfInterest));
    }; // End addPOI

    // Add route to new Day
    self.addRoute = function() {
        self.newDay.routes.push(angular.copy(self.route));
    }; // End addPOI

    // Add meal to new Day
    self.addMeal = function() {
        self.newDay.meals.push(angular.copy(self.meal));
    }; // End addPOI

    // Add Recommendation to new Day
    self.addRecommendation = function() {
        self.newDay.recommendations.push(angular.copy(self.recommendation));
    }; // End addPOI

}]); // END: TripController
