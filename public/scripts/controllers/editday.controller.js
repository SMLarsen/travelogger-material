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
        .then((response) => {
            self.tripID = self.data.day.trip_id;
            self.data.day.date = new Date(self.data.day.date);
            $scope.$apply();
        })
        .catch((err) => console.log('Error getting day', err));

    // // Function to update a day
    self.updateDay = function() {
        self.data.day.trip_id = self.tripID;
        self.findAddress(self.data.day.end_location)
            .then((result) => {
                self.data.day.end_map_location = self.newLocation;
                myTripFactory.updateDay(self.data.day)
                    .then(function(response) {
                        console.log('Day updated');
                        self.cancel();
                    })
                    .catch((err) => console.log('Error updating day', err));
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
        }).then((result) => {
            var location = result[0].geometry.location;
            self.lat = location.lat();
            self.lng = location.lng();
            self.newLocation = {
                pos: [self.lat, self.lng]
            };
        });
    };

    self.cancel = function() {
        self.data.day = {};
        window.location = '/#/mydays/' + self.tripID;
    };

}]); // END: MyTripController
