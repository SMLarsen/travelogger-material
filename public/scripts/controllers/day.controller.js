app.controller("DayController", ['TripFactory', '$filter', '$routeParams', 'NgMap', function(TripFactory, $filter, $routeParams, NgMap) {
    console.log('DayController started');
    var self = this;
    var tripFactory = TripFactory;

    self.days = [];
    self.focusDay = {};
    self.focusTrip = {};
    self.currentDayIndex = 0;
    self.leftButtonDisabled = true;
    self.rightButtonDisabled = false;
    self.locationArray = [];

    self.tripID = $routeParams.tripID;
    console.log('Trip Factory:', self.tripID);

    tripFactory.getDays(self.tripID)
        .then(function(response) {
            self.days = response;
            self.focusDay = self.days[0];
            console.log('Days:', response);
            self.days.forEach(buildLocationArray);
            console.log('location array:', self.locationArray);
            tripFactory.getTrip(self.tripID)
                .then(function(response) {
                        self.focusTrip = response;
                    },
                    function(err) {
                        console.log('Error getting trip');
                    });
        });

    function buildLocationArray(item, index) {
        if (item.end_map_location !== undefined) {
            self.locationArray.push(item.end_map_location);
        }
    }

    self.setDay = function(index) {
        self.focusDay = self.days[index];
        self.currentDayIndex = index;
        self.setDisabled(index);
        setVisible();
    };

    // Function to page left
    self.goLeft = function() {
        console.log('Go left from ' + self.currentDayIndex);
        if (self.currentDayIndex > 0) {
            self.currentDayIndex = self.currentDayIndex - 1;
            self.focusDay = self.days[self.currentDayIndex];
            self.setDisabled(self.currentDayIndex);
        }
    }; // End function to page left

    // Function to page right
    self.goRight = function() {
        console.log('Go right from ' + self.currentDayIndex);
        if (self.currentDayIndex < self.days.length - 1) {
            self.currentDayIndex = self.currentDayIndex + 1;
            self.focusDay = self.days[self.currentDayIndex];
            self.setDisabled(self.currentDayIndex);
        }
    }; // End function to page right

    // function to set left right arrow disabled
    self.setDisabled = function(index) {
        if (index === 0) {
            self.leftButtonDisabled = true;
            self.rightButtonDisabled = false;
        } else
        if (index === self.days.length - 1) {
            self.leftButtonDisabled = false;
            self.rightButtonDisabled = true;
        } else {
            self.leftButtonDisabled = false;
            self.rightButtonDisabled = false;
        }
    }; // end setDisabled

}]); // END: DayController
