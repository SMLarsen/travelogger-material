/*jshint esversion: 6 */
app.controller('AddDayController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, NgMap, GeoCoder) {
    console.log('AddDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];

    console.log('add day tripID', navFactory.data.tripID);
    console.log('add day dayID', navFactory.data.dayID);

    // Enable day topic buttons once day is created
    self.isNewDay = false;
    if (navFactory.data.dayID === '') {
        self.isNewDay = true;
    }

    // Set left nav parameters
    if (self.isNewDay) {
      navFactory.setNav('Add Day', '#/mydays/' + navFactory.data.tripID, true);
    } else {
      navFactory.setNav('Edit Day', '#/mydays/' + navFactory.data.tripID, true);
    }

    // Geocode general destination
    self.genDestinationChanged = function() {
        self.place = this.getPlace();
        self.location = self.place.geometry.location;
        self.data.day.destination_location = {
            pos: [self.location.lat(), self.location.lng()]
        };
    };

    // Find location
    destinationChanged = function() {
        self.place = this.getPlace();
        self.map.setCenter(self.place.geometry.location);
        self.location = self.place.geometry.location;
    };

    // // Function to add a day
    self.addDay = function() {
        console.log('addDay', self.data.day);
        if (self.isNewDay) {
            self.data.day.trip_id = navFactory.data.tripID;
            // console.log('addDay:', self.data.day);
            myTripFactory.addDay()
                .then((response) => {
                    navFactory.data.dayID = myTripFactory.data.day._id;
                    self.isNewDay = false;
                })
                .catch((err) => console.log('Error adding day', err));
        } else {
            self.data.day.trip_id = navFactory.data.tripID;
            myTripFactory.updateDay()
                .then((response) => {
                    navFactory.data.dayID = myTripFactory.data.day._id;
                    window.location = '#/addday';
                })
                .catch((err) => console.log('Error updating day', err));
        }
    }; // End addDay

    self.addDay = function(ev) {
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
        $scope.addDay = function() {
          myTripFactory.addDay()
              .then((response) => {
                  navFactory.data.dayID = myTripFactory.data.day._id;
                  self.isNewDay = false;
              })
              .catch((err) => console.log('Error adding day', err));
        }; // End addDay

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            myTripFactory.data.day.destination_location = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }


}]); // END: MyTripController
