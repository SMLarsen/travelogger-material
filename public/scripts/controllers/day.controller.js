app.controller("DayController", ['$http', '$filter', '$routeParams', function($http, $filter, $routeParams) {
    console.log('DayController started');
    var self = this;

    self.days = [];

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
            },
            function(err) {
                console.log('Unable to retrieve days', err);
            });
    } // End getDays

}]); // END: DayController
