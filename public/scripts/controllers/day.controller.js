app.controller("DayController", ['$scope', '$http', '$filter', '$routeParams', '$rootScope', 'geolocation', 'gservice', function($scope, $http, $filter, $routeParams, $rootScope, geolocation, gservice) {
    console.log('DayController started');
    var self = this;

    self.days = [];
    self.focusDay = {};
    self.focusTrip = {};
    self.currentDayIndex = 0;
    self.leftButtonDisabled = true;
    self.rightButtonDisabled = false;

    self.tripID = $routeParams.tripID;

//===================

// Initializes Variables
// ----------------------------------------------------------------------------
self.formData = {};
var coords = {};
var lat = 0;
var long = 0;

// Set initial coordinates to the center of the US
self.formData.latitude = 39.500;
self.formData.longitude = -98.350;

// Functions
// ----------------------------------------------------------------------------

// Get User's actual coordinates based on HTML5 at window load
geolocation.getLocation().then(function(data) {

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
    };

    // Display coordinates in location textboxes rounded to three decimal points
    self.formData.longitude = parseFloat(coords.long).toFixed(3);
    self.formData.latitude = parseFloat(coords.lat).toFixed(3);

    // Display message confirming that the coordinates verified.
    self.formData.htmlverified = "Yep (Thanks for giving us real data!)";

    gservice.refresh(self.formData.latitude, self.formData.longitude);

});


// Get coordinates based on mouse click. When a click event is detected....
$rootScope.$on("clicked", function() {

    // Run the gservice functions associated with identifying coordinates
    $scope.$apply(function() {
        self.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        self.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        self.formData.htmlverified = "Nope (Thanks for spamming my map...)";
    });
});

// Creates a new user based on the form fields
self.createUser = function() {

    // Grabs all of the text box fields
    var userData = {
        username: self.formData.username,
        gender: self.formData.gender,
        age: self.formData.age,
        favlang: self.formData.favlang,
        location: [self.formData.longitude, self.formData.latitude],
        htmlverified: self.formData.htmlverified
    };


            // Refresh the map with new data
            gservice.refresh(self.formData.latitude, self.formData.longitude);
            self.formData.latitude = 39.500;
            self.formData.longitude = -98.350;



};
//===================

    getDays(self.tripID);

    // Function to GET days
    function getDays(tripID) {
        console.log('getting days for:', tripID);
        $http.get('/guest/day/' + tripID)
            .then(function(response) {
                    self.days = response.data;
                    console.log('response.data', self.days);
                    self.focusDay = self.days[0];
                    getTrip(tripID);
                },
                function(err) {
                    console.log('Unable to retrieve days', err);
                });
    } // End getDays

    // Function to GET trip
    function getTrip(tripID) {
        console.log('getting trip for:', tripID);
        $http.get('/guest/trip/' + tripID)
            .then(function(response) {
                    self.focusTrip = response.data[0];
                    console.log('Trip returned:', self.focusTrip);
                },
                function(err) {
                    console.log('Unable to retrieve days', err);
                });
    } // End getTrip

    self.setDay = function(index) {
        self.focusDay = self.days[index];
        self.currentDayIndex = index;
    };

    // Function to page left
    self.goLeft = function() {
        // console.log('Go left from ' + self.currentDayIndex);
        if (self.currentDayIndex > 0) {
            self.currentDayIndex = self.currentDayIndex - 1;
            self.focusDay = self.days[self.currentDayIndex];
        }
        if (self.currentDayIndex === 0) {
            self.leftButtonDisabled = true;
            self.rightButtonDisabled = false;
        }
    }; // End function to page left

    // Function to page right
    self.goRight = function() {
        // console.log('Go right from ' + self.currentDayIndex);
        if (self.currentDayIndex < self.days.length - 1) {
            self.currentDayIndex = self.currentDayIndex + 1;
            self.focusDay = self.days[self.currentDayIndex];
        }
        if (self.currentDayIndex === self.days.length - 1) {
          self.leftButtonDisabled = false;
            self.rightButtonDisabled = true;
        }
    }; // End function to page right

}]); // END: DayController
