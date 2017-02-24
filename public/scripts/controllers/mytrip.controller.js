/*jshint esversion: 6 */
app.controller('MyTripController', ['MyTripFactory', 'AuthFactory', 'NavFactory', '$mdDialog', '$scope', function(MyTripFactory, AuthFactory, NavFactory, $mdDialog, $scope) {
    console.log('MyTripController started');

    const authFactory = AuthFactory;
    const currentUser = authFactory.currentUser;
    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = MyTripFactory.data;

    // Set left nav parameters
    navFactory.setNav('My Trips', '#/home', true);

    // Get all trips for the user
    myTripFactory.getTrips()
        .then((response) => self.data.trips.forEach(formatDates))
        .catch((err) => console.log('Error getting trips', err));

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // Function to go to view trip view
    self.addTrip = function() {
        self.data.trip = {};
        window.location = "#/addtrip";
    }; // End formatDates

    // Function to go to view trip view
    self.viewTrip = function(tripID) {
        window.location = "#/mydays/" + tripID;
    }; // End formatDates

    // Function to go to edit trip view
    self.editTrip = function(tripID) {
        window.location = "#/edittrip/" + tripID;
    }; // End formatDates

    // Function to delete a trip
    self.deleteTrip = function(tripID) {
        myTripFactory.deleteTrip(tripID)
            .then((response) => myTripFactory.deleteTripDays(tripID))
            .then((response) => myTripFactory.getTrips())
            .then((response) => console.log('Trip deleted'))
            .catch((err) => console.log('Unable to delete trip', err));
    }; // End deleteTrip

    self.status = '  ';
    self.customFullscreen = false;

    self.showAdvanced = function(ev, trip) {
        self.data.trip = trip;
        $mdDialog.show({
            controller: DialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'edittrip.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen,
            openFrom: angular.element(document.querySelector('#left')),
            closeTo: angular.element(document.querySelector('#right'))
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.data = MyTripFactory.data;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        // Function to update a trip
        $scope.updateTrip = function() {
            myTripFactory.updateTrip()
                .then(() => $mdDialog.cancel())
                .catch((err) => console.log('Unable to update trip', err));
        }; // End updateTrip

    }

}]); // END: MyTripController
