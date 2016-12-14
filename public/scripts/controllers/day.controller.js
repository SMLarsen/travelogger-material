app.controller("DayController", ['$http', '$filter', '$routeParams', function($http, $filter, $routeParams) {
    console.log('DayController started');
    var self = this;

    self.days = [];
    self.focusDay = {};
    self.focusTrip = {};

    self.tripID = $routeParams.tripID;
    console.log(self.tripID);

    getDays(self.tripID);

    // Function to GET days
    function getDays(tripID) {
        console.log('getting days for:', tripID);
        $http.get('/guest/day/' + tripID)
            .then(function(response) {
                    self.days = response.data;
                    console.log('response.data', self.days);
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
    };

}]); // END: DayController
