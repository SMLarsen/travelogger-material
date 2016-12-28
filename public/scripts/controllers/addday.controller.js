app.controller('AddDayController', ['MyTripFactory', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', '$location', '$routeParams', function(MyTripFactory, $http, AuthFactory, NgMap, GeoCoder, $location, $routeParams) {
    console.log('AddDayController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;
    console.log('addDay currentUser.id', currentUser.id);

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
        self.newDay.user_id = currentUser.id;
        self.newDay.trip_id = self.tripID;
        self.findAddress(self.newDay.end_location)
            .then(function(result) {
              self.newDay.end_map_location = self.newLocation;
                // console.log('addDay post geocode:', self.newDay);
                myTripFactory.addDay(self.newDay)
                    .then(function(response) {
                            self.newDay = {};
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
                self.newDay.end_map_location = result[0];
            });
    }

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
        self.newDay = {};
        $location.path('mydays/:' + self.tripID);
    };

}]); // END: MyTripController
