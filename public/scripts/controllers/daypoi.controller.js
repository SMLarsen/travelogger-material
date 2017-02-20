/*jshint esversion: 6 */
app.controller('DayPOIController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, NavFactory, NgMap, GeoCoder, $routeParams) {
    console.log('DayPOIController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.tripID = $routeParams.tripID;

    self.newDay = {
        interesting_locations: [],
        routes: [],
        meals: [],
        recommendations: []
    };
    self.newPointOfInterest = {};
    self.newRoute = {};
    self.newMeal = {};
    self.newRecommendation = {};
    self.destinationMapLocation = {};
    self.beginMapLocation = {};
    self.endMapLocation = {};

    // Set left nav parameters
    navFactory.setNav('Add Point of Interest', '#/addday/' + self.tripID, true);

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    self.tripIndex = 0;
    self.dayIndex = 0;

    self.data = [];
    self.positions = [];
    self.showData = function() {
        alert(this.data.foo);
    };

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // // Function to add a day
    self.addDay = function() {
        self.newDay.trip_id = self.tripID;
        console.log('addDay:', self.newDay);
        self.findAddress(self.newDay.end_location)
            .then(function(result) {
                self.newDay.end_map_location = self.newLocation;
                console.log('addDay post geocode:', self.newDay);
                myTripFactory.addDay(self.newDay)
                    .then(function(response) {
                            self.newDay = {};
                            self.days = response;
                            console.log('Day added');
                            self.cancel();
                        },
                        function(err) {
                            console.log('Error adding day', err);
                        });
            });
    }; // End addDay

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

    // Add POI row to new Day
    self.addPOIRow = function() {
        self.newDay.routes.push(angular.copy(self.newPOI));
        self.newPOI = {};
    }; // End addPOIRow

    // Add route row to new Day
    self.addRouteRow = function() {
        self.newDay.routes.push(angular.copy(self.newRoute));
        self.newRoute = {};
    }; // End addRouteRow

    // Add recommendation row to new Day
    self.addRecommendationRow = function() {
        self.newDay.recommendations.push(angular.copy(self.newRecommendation));
        self.newRecommendation = {};
    }; // End addMeal

    // Add meal row to new Day
    self.addMealRow = function() {
        self.newDay.meals.push(angular.copy(self.newMeal));
        self.newMeal = {};
    }; // End addMeal

    // Add Recommendation row to new Day
    self.addRecommendationRow = function() {
        self.newDay.recommendations.push(angular.copy(self.newRecommendation));
        self.newRecommendation = {};
    }; // End addRecommendation

    self.cancel = function() {
        self.newDay = {};
        window.location = '/#/mydays/' + self.tripID;
    };

}]); // END: MyTripController
