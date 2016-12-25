app.controller('AddDayController', ['MyTripFactory', '$http', 'AuthFactory', 'NgMap', 'GeoCoder', '$location', '$routeParams', function(MyTripFactory, $http, AuthFactory, NgMap, GeoCoder, $location, $routeParams) {
    console.log('AddDayController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var currentUser = authFactory.currentUser;

    self.tripID = $routeParams.tripID;

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

    // function to geocode destination
    self.pinDestinationLocation = function() {
        locationGeocode(self.newTrip.destination)
            .then(function(result) {
                self.newTrip.destination_location = result;
                self.positions.push(result.geometry.location);
                console.log('positions:', self.positions);
            });
    }; // end pinDestinationLocation

    // function to geocode destination
    self.pinBeginLocation = function() {
        locationGeocode(self.newTrip.begin_location).then(function(result) {
            self.newTrip.begin_map_location = result;
        });
    }; // end pinBeginLocation

    // function to geocode destination
    self.pinEndLocation = function() {
        locationGeocode(self.newTrip.end_location).then(function(result) {
            self.newTrip.end_map_location = result;
        });
    }; // end pinEndLocation

    function locationGeocode(address) {
        return GeoCoder.geocode({
            address: address
        }).then(function(result) {
            console.log('Address geocode result:', result[0]);
            return result[0];
        });
    }

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // // Function to add a day
    self.addDay = function(tripID) {
        self.newDay.user_id = currentUser.id;
        self.newDay.trip_id = tripID;
        console.log('addDay:', self.newDay);
        myTripFactory.addDay(self.newDay)
            .then(function(response) {
                    self.newDay = {};
                    self.days = response;
                    console.log('Day added', self.days);
                },
                function(err) {
                    console.log('Error adding day', err);
                });
    }; // End addDay

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

    self.cancel = function() {
        self.newDay = {};
        $location.path('mydays/:' + self.tripID);
    };

}]); // END: MyTripController
