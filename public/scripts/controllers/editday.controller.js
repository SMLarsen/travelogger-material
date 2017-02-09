/*jshint esversion: 6 */
app.controller('EditDayController', ['MyTripFactory', '$scope', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, $scope, NgMap, GeoCoder, $routeParams) {
    console.log('EditDayController started');

    const myTripFactory = MyTripFactory;

    let self = this;
    self.data = myTripFactory.data;
    let dayID = $routeParams.dayID;

    self.data.day = {};
    self.newRoute = {};
    self.newPOI = {};
    self.newMeal = {};
    self.newRecommendation = {};

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    myTripFactory.getDay(dayID)
        .then(function(response) {
                self.tripID = self.data.day.trip_id;
                self.data.day.date = new Date(self.data.day.date);
                // console.log('Day returned:', self.data.day);
                $scope.$apply();
            },
            function(err) {
                console.log('Error getting day', err);
            });

    // // Function to update a day
    self.updateDay = function() {
        // self.data.day.user_id = currentUser.id;
        self.data.day.trip_id = self.tripID;
        // console.log('EditDayController day:', self.data.day);
        self.findAddress(self.data.day.end_location)
            .then(function(result) {
                self.data.day.end_map_location = self.newLocation;
                // console.log('updateDay post geocode:', self.data.day);
                myTripFactory.updateDay(self.data.day)
                    .then(function(response) {
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
        self.data.day.interesting_locations.push(angular.copy(self.newPOI));
        self.newPOI = {};
    }; // End addpointRow

    // Add recommendation row to Day
    self.addRecommendationRow = function() {
        self.data.day.recommendations.push(angular.copy(self.newRecommendation));
        self.newRecommendation = {};
    }; // End addMeal

    // Add meal row to Day
    self.addMealRow = function() {
        self.data.day.meals.push(angular.copy(self.newMeal));
        self.newMeal = {};
    }; // End addMeal

    // Add Route row to Day
    self.addRouteRow = function() {
        self.data.day.routes.push(angular.copy(self.newRoute));
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
        self.data.day = {};
        window.location = '/#/mydays/' + self.tripID;
    };

}]); // END: MyTripController
