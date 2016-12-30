app.controller('EditDayController', ['MyTripFactory', '$location', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, $location, $http, AuthFactory, NgMap, GeoCoder, $routeParams) {
    console.log('EditDayController started');
    var self = this;

    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;
    var dayID = $routeParams.dayID;

    self.day = {};
    self.newRoute = {};
    self.newPOI = {};
    self.newMeal = {};
    self.newRecommendation = {};

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    myTripFactory.getDay(dayID)
        .then(function(response) {
                self.day = response;
                self.tripID = self.day.trip_id;
                self.day.date = new Date(self.day.date);
                console.log('Day returned:', self.day);
            },
            function(err) {
                console.log('Error getting day', err);
            });

    // // Function to update a day
    self.updateDay = function() {
        self.day.user_id = currentUser.id;
        self.day.trip_id = self.tripID;
        self.findAddress(self.day.end_location)
            .then(function(result) {
                self.day.end_map_location = self.newLocation;
                console.log('updateDay post geocode:', self.day);
                myTripFactory.updateDay(self.day)
                    .then(function(response) {
                            self.day = {};
                            console.log('Day updated');
                            self.cancel();
                        },
                        function(err) {
                            console.log('Error updating day', err);
                        });
            });
    }; // End updateDay

    // Add point row to Day
    self.addPOIRow = function() {
        self.day.interesting_locations.push(angular.copy(self.newPOI));
        self.newPOI = {};
    }; // End addpointRow

    // Add recommendation row to Day
    self.addRecommendationRow = function() {
        self.day.recommendations.push(angular.copy(self.newRecommendation));
        self.newRecommendation = {};
    }; // End addMeal

    // Add meal row to Day
    self.addMealRow = function() {
        self.day.meals.push(angular.copy(self.newMeal));
        self.newMeal = {};
    }; // End addMeal

    // Add Route row to Day
    self.addRouteRow = function() {
        self.day.recommendations.push(angular.copy(self.newRoute));
        self.newRoute = {};
    }; // End addRecommendation

    self.findAddress = function(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            var location = result[0].geometry.location;
            self.lat = location.lat();
            self.lng = location.lng();
            self.newLocation = {
                pos: [self.lat, self.lng]
            };
        });
    };

    self.cancel = function() {
        console.log('Cancel tripID:', self.tripID);
        self.day = {};
        $location.path('mydays/' + self.tripID);
    };

}]); // END: MyTripController
