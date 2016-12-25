app.controller('MyDayController', ['MyTripFactory', '$http', 'AuthFactory', '$routeParams', 'NgMap', 'GeoCoder', function(MyTripFactory, $http, AuthFactory, $routeParams, NgMap, GeoCoder) {
    console.log('MyDayController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;

    self.tripID = $routeParams.tripID;

    self.days = [];

    var currentUser = authFactory.currentUser;

    getDays(self.tripID);

    // Function to GET days
    function getDays(tripID) {
        myTripFactory.getDays(tripID)
            .then(function(response) {
                    self.days = response;
                    console.log('Days returned', self.days);
                },
                function(err) {
                    console.log('Error getting days', err);
                });
    } // End getDays

}]); // END: MyDayController
