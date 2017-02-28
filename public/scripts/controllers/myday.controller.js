/*jshint esversion: 6 */
app.controller('MyDayController', ['MyTripFactory', 'NavFactory', '$routeParams', 'NgMap', 'GeoCoder', '$mdDialog', '$scope', function(MyTripFactory, NavFactory, $routeParams, NgMap, GeoCoder, $mdDialog, $scope) {
    console.log('MyDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;
    self.tripID = $routeParams.tripID;

    self.days = [];

    // Set left nav parameters
    navFactory.setNav('Days', '#/mytrips', true);

    getDays(self.tripID);

    self.show = function() {
      console.log('showing slef.data', self.data);
    };

    // Function to GET days for a trip
    function getDays(tripID) {
        myTripFactory.getDays(tripID)
            .catch((err) => console.log('Error getting days', err));
    } // End getDays

    // Function to Delete a day
    self.deleteDay = function(dayID, tripID) {
        myTripFactory.deleteDay(dayID)
            .then((response) => myTripFactory.getDays(tripID))
            .catch((err) => console.log('Unable to delete day', err));
    }; // End deleteDay

    // Function to go to add day
    self.goToDay = function(type, day) {
        navFactory.data.tripID = $routeParams.tripID;
        if (type === 'Add') {
            self.data.day = {};
            navFactory.data.dayID = '';
        } else {
            self.data.day = day;
            navFactory.data.dayID = self.data.day._id;
        }
        window.location = '/#/addday';
    };


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
                    navFactory.data.dayID = myTripFactory.data.day._id;
                    myTripFactory.getDays(myTripFactory.data.day.trip_id)
                        .then((response) => $mdDialog.cancel())
                        .catch((err) => console.log('Error adding day', err));
                });
        }; // End addDay

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.day.end_map_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

}]); // END: MyDayController
