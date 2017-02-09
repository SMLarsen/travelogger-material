/*jshint esversion: 6 */
app.controller("DayController", ['TripFactory', '$filter', '$routeParams', 'NgMap', function(TripFactory, $filter, $routeParams, NgMap) {
    console.log('DayController started');

    const tripFactory = TripFactory;

    let self = this;
    self.data = tripFactory.data;
    self.tripID = $routeParams.tripID;
    self.focusDay = {};
    self.currentDayIndex = 0;
    self.leftButtonDisabled = true;
    self.rightButtonDisabled = false;
    self.locationArray = [];

    tripFactory.getDays(self.tripID)
        .then(function(response) {
            self.focusDay = self.data.days[0];
            self.data.days.forEach(buildLocationArray);
            tripFactory.getTrip(self.tripID);
        });

    function buildLocationArray(item, index) {
        if (item.end_map_location !== undefined) {
            self.locationArray.push(item.end_map_location);
        }
    }

    self.setDay = function(index) {
        self.focusDay = self.data.days[index];
        self.currentDayIndex = index;
        self.setDisabled(index);
        setVisible();
    };

    // Function to page left
    self.goLeft = function() {
        if (self.currentDayIndex > 0) {
            self.currentDayIndex = self.currentDayIndex - 1;
            self.focusDay = self.data.days[self.currentDayIndex];
            self.setDisabled(self.currentDayIndex);
        }
    }; // End function to page left

    // Function to page right
    self.goRight = function() {
        if (self.currentDayIndex < self.data.days.length - 1) {
            self.currentDayIndex = self.currentDayIndex + 1;
            self.focusDay = self.data.days[self.currentDayIndex];
            self.setDisabled(self.currentDayIndex);
        }
    }; // End function to page right

    // function to set left right arrow disabled
    self.setDisabled = function(index) {
        if (index === 0) {
            self.leftButtonDisabled = true;
            self.rightButtonDisabled = false;
        } else if (index === self.data.days.length - 1) {
            self.leftButtonDisabled = false;
            self.rightButtonDisabled = true;
        } else {
            self.leftButtonDisabled = false;
            self.rightButtonDisabled = false;
        }
    }; // end setDisabled

}]); // END: DayController
