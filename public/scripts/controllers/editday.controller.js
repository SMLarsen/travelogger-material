app.controller('EditDayController', ['MyTripFactory', '$location', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, $location, $http, AuthFactory, NgMap, GeoCoder, $routeParams) {
    console.log('EditDayController started');
    var self = this;

    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;
    var dayID = $routeParams.dayID;

    self.day = {
        interesting_locations: [],
        points: [],
        meals: [],
        recommendations: []
    };
    self.pointOfInterest = {};
    self.newpoint = {};
    self.meal = {};
    self.recommendation = {};

    self.transportModes = ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'];
    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.end_date = new Date(item.end_date);
    } // End formatDates

    getDay(self.dayID);

    // Function to GET a day
    function getDay(dayID) {
        myTripFactory.getDay(dayID)
            .then(function(response) {
                    self.day = response;
                    self.tripID = self.day.trip_id;
                    console.log('Day returned', self.days);
                },
                function(err) {
                    console.log('Error getting day', err);
                });
    } // End getDay

    // // Function to add a day
    self.addDay = function() {
        self.day.user_id = currentUser.id;
        self.day.trip_id = self.tripID;
        self.findAddress(self.day.end_location)
            .then(function(result) {
              self.day.end_map_location = self.newLocation;
                // console.log('addDay post geocode:', self.day);
                myTripFactory.addDay(self.day)
                    .then(function(response) {
                            self.day = {};
                            self.days = response;
                            console.log('Day added');
                        },
                        function(err) {
                            console.log('Error adding day', err);
                        });
            });
    }; // End addDay

    function locationGeocode(address) {
        console.log('address to geocode:', address);
        GeoCoder.geocode({
                address: address
            })
            .then(function(result) {
                console.log('Address geocode result:', result[0]);
                self.day.end_map_location = result[0];
            });
    }

    // Add point row to new Day
    self.addpointRow = function() {
        self.day.points.push(angular.copy(self.newpoint));
        self.newpoint = {};
    }; // End addpointRow

    // Add recommendation row to new Day
    self.addRecommendationRow = function() {
        self.day.recommendations.push(angular.copy(self.recommendation));
        self.recommendation = {};
    }; // End addMeal

    // Add meal row to new Day
    self.addMealRow = function() {
        self.day.meals.push(angular.copy(self.meal));
        self.meal = {};
    }; // End addMeal

    // Add Recommendation row to new Day
    self.addRecommendationRow = function() {
        self.day.recommendations.push(angular.copy(self.recommendation));
        self.recommendation = {};
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
        self.day = {};
        $location.path('mydays/:' + self.tripID);
    };

}]); // END: MyTripController
