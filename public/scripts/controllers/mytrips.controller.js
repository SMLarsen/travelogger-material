/*jshint esversion: 6 */
app.controller('MyTripsController', ['MyTripFactory', 'AuthFactory', 'NavFactory', 'PhotoFactory', '$mdDialog', '$scope', 'NgMap', 'GeoCoder', function(MyTripFactory, AuthFactory, NavFactory, PhotoFactory,$mdDialog, $scope, NgMap, GeoCoder) {
    console.log('MyTripsController started');

    const authFactory = AuthFactory;
    const currentUser = authFactory.currentUser;
    const myTripFactory = MyTripFactory;
    const photoFactory = PhotoFactory;
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
    self.viewTrip = function(trip) {
        self.data.trip = trip;
        window.location = "#/mydays/" + trip._id;
    }; // End formatDates

    // Function to delete a trip
    self.deleteTrip = function(tripID) {
        myTripFactory.deleteTrip(tripID)
            .catch((err) => console.log('Unable to delete trip', err));
    }; // End deleteTrip

    self.status = '  ';
    self.customFullscreen = false;


    // Function to get photos for a trip
    self.viewAlbum = function(tripID) {
        photoFactory.getTripAlbum(tripID)
            .then(function(err) {
                console.log('Unable to retrieve photos for trip', err);
            });
    }; // End: tripFactory.viewAlbum


    self.editTrip = function(ev, trip) {
        self.data.trip = trip;
        $mdDialog.show({
            controller: EditDayDialogController,
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

    function EditDayDialogController($scope, $mdDialog) {
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

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.trip.destination_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

    self.addTrip = function(ev) {
        self.data.trip = {};
        $mdDialog.show({
            controller: AddDayDialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'addtrip.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen,
            openFrom: angular.element(document.querySelector('#left')),
            closeTo: angular.element(document.querySelector('#right'))
        });
    };

    function AddDayDialogController($scope, $mdDialog) {
        $scope.data = MyTripFactory.data;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        // Function to update a trip
        $scope.addTrip = function() {
            myTripFactory.addTrip()
                .then((response) => $mdDialog.cancel())
                .catch((err) => console.log('Unable to add trip', err));
        }; // End updateTrip

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.trip.destination_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

}]); // END: MyTripController
