app.controller("MapController", ['TripFactory', '$http', '$filter', '$routeParams', 'NgMap', function(TripFactory, $http, $filter, $routeParams, NgMap) {
    console.log('MapController started');
    var self = this;
    var tripFactory = TripFactory;

    self.days = [];
    self.focusDay = {};
    self.focusTrip = {};
    self.currentDayIndex = 0;
    self.leftButtonDisabled = true;
    self.rightButtonDisabled = false;

    self.tripID = $routeParams.tripID;
    console.log('Trip Factory:', self.tripID);

    tripFactory.getDays(self.tripID)
        .then(function(response) {
            self.days = response;
            self.focusDay = self.days[0];
            console.log('Days:', response);
            tripFactory.getTrip(self.tripID)
                .then(function(response) {
                        self.focusTrip = response;
                        console.log('Inner getTrip');
                    },
                    function(err) {
                        console.log('Error getting trip');
                    });
        });

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
