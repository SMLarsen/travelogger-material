app.controller("DayController", ['$http', '$filter', '$routeParams', function($http, $filter, $routeParams) {
    console.log('DayController started');
    var self = this;

    self.days = [];
    self.focusDay = {};
    self.focusTrip = {};
    self.currentDayIndex = 0;
    self.leftButtonDisabled = true;
    self.rightButtonDisabled = false;

    self.tripID = $routeParams.tripID;

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
