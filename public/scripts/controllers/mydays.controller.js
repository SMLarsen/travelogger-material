/*jshint esversion: 6 */
app.controller('MyDaysController', ['MyTripFactory', 'NavFactory', '$routeParams', 'NgMap', 'GeoCoder', '$mdDialog', '$scope', function(MyTripFactory, NavFactory, $routeParams, NgMap, GeoCoder, $mdDialog, $scope) {
    console.log('MyDaysController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;
    self.tripID = $routeParams.tripID;

    self.days = [];

    // Set left nav parameters
    navFactory.setNav('My Trip Days', '#/mytrips', true);

    getDays(self.tripID);

    self.show = function() {
        console.log('showing slef.data', self.data);
    };

    // Function to GET days for a trip
    function getDays(tripID) {
        myTripFactory.getDays(tripID)
            .catch((err) => console.log('Error getting days', err));
    } // End getDays

    // Function to View a day
    self.viewDay = function(dayID, tripID) {
        window.location = "#/myday/" + tripID + "/" + dayID;
    }; // End viewDay

    // Function to Delete a day
    self.deleteDay = function(dayID, tripID) {
        myTripFactory.deleteDay(dayID, tripID)
            .catch((err) => console.log('Unable to delete day', err));
    }; // End deleteDay

    self.addDay = function(ev) {
        console.log('addDay');
        self.data.day = {};
        self.data.day.trip_id = self.tripID;
        $mdDialog.show({
            controller: AddDayDialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'addday.template.html',
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

        // Function to add day
        $scope.addDay = function() {
            myTripFactory.addDay()
                .then((response) => {
                    window.location = "#/mydays/" + myTripFactory.data.day.trip_id;
                    $mdDialog.cancel();
                })
                .catch((err) => console.log('Error adding day', err));
        }; // End addDay

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.day.end_map_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

    self.editDay = function(ev, day) {
        console.log('editDay');
        self.data.day = day;
        self.data.day.trip_id = self.tripID;
        $mdDialog.show({
            controller: EditDayDialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'editday.template.html',
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

        // Function to add day
        $scope.updateDay = function() {
            myTripFactory.updateDay()
                .then((response) => {
                    window.location = "#/mydays/" + myTripFactory.data.day.trip_id;
                    $mdDialog.cancel();
                })
                .catch((err) => console.log('Error updating day', err));
        }; // End addDay

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.day.end_map_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

}]); // END: MyDaysController
