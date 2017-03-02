/*jshint esversion: 6 */
app.controller('EditDayController', ['MyTripFactory', '$scope', 'GeoCoder', '$routeParams', '$mdDialog', function(MyTripFactory, $scope, GeoCoder, $routeParams, $mdDialog) {
    console.log('EditDayController started');

    const myTripFactory = MyTripFactory;

    let self = this;
    self.data = myTripFactory.data;
    let dayID = $routeParams.dayID;

    self.data.day = {};
    self.newDetail = {};
    self.selectArray = [];

    const ICONPATH = './assets/icons/';
    const DETAILTYPES = {
        detailTypes: {
            array: ['Lodging', 'Meal', 'Transport', 'Point of Interest']
        },
        transportTypes: {
            array: ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot', 'Other'],
            title: 'Transport',
            icon: 'cars.svg'
        },
        lodgingTypes: {
            array: ['Private Home', 'Airbnb', 'Hotel', 'Motel', 'Camping', 'Other'],
            title: 'Lodging',
            icon: 'hotel.svg'
        },
        mealTypes: {
            array: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment', 'Other'],
            title: 'Food and Drink',
            icon: 'food-fork-drink.svg'
        },
        poiTypes: {
            array: ['Museum', 'Tour', 'Park', 'Historical Site', 'Building', 'Place'],
            title: 'Point of Interest',
            icon: 'map-marker.svg'
        }
    };

    myTripFactory.getDay(dayID)
        .then((response) => {
            self.tripID = self.data.day.trip_id;
            self.data.day.date = new Date(self.data.day.date);
        })
        .catch((err) => console.log('Error getting day', err));

    // // Function to update a day
    self.updateDay = function() {
        self.data.day.trip_id = self.tripID;
        myTripFactory.updateDay(self.data.day)
            // .then((response) => window.location = "#/mydays/" + self.tripID)
            .catch((err) => console.log('Error updating day', err));
    }; // End updateDay

    // Find location
    self.destinationChanged = function() {
        let place = this.getPlace();
        myTripFactory.data.day.end_map_location = {
            pos: [place.geometry.location.lat(), place.geometry.location.lng()]
        };
    };

    self.cancel = function() {
        self.data.day = {};
        window.location = '/#/mydays/' + self.tripID;
    };

    self.editDetail = function(index) {
        console.log('editDetail:', index);
    };

    self.deleteDetail = function(index) {
        let dayID = self.data.day._id;
        let detailID = self.data.day.details[index]._id;
        myTripFactory.deleteDetail(self.data.day.trip_id, dayID, detailID)
            .catch((err) => console.log("Error deleting day detail", err));
    };

    self.updateDetail = function(index) {
        let dayID = self.data.day._id;
        let detailID = self.data.day.details[index]._id;
        myTripFactory.updateDetail(self.data.day.trip_id, dayID, detailID)
            .catch((err) => console.log("Error updating day detail", err));
    };

    self.addDetail = function(ev, detailType) {
        self.newDetail = {};
        self.title = DETAILTYPES[detailType + 'Types'].title;
        self.newDetail.detail_type = detailType;
        self.newDetail.icon = ICONPATH;
        self.newDetail.icon += DETAILTYPES[detailType + 'Types'].icon;
        self.selectArray = DETAILTYPES[detailType + 'Types'].array;
        $mdDialog.show({
            controller: AddDayDetailDialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'daydetail.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen,
            openFrom: angular.element(document.querySelector('#left')),
            closeTo: angular.element(document.querySelector('#right'))
        });
    };

    function AddDayDetailDialogController($scope, $mdDialog) {
        $scope.data = MyTripFactory.data;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        // Function to add day detail
        $scope.addDayDetail = function() {
            console.log('addDayDetail', self.data.day.trip_id, self.data.day._id, self.newDetail);
            myTripFactory.addDetail(self.data.day.trip_id, self.data.day._id, self.newDetail)
                .then((response) => $mdDialog.cancel())
                .catch((err) => console.log("Error adding day detail", err));
        }; // End addDayDetail

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            self.newDetail.name = place.name;
            self.newDetail.url = place.website;
            self.newDetail.location = place.formatted_address;
            self.newDetail.location_map = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

    self.viewDetail = function(ev, index) {
        self.focusDetail = self.data.day.details[index];
        self.title = DETAILTYPES[self.focusDetail.detail_type + 'Types'].title;
        self.selectArray = DETAILTYPES[self.focusDetail.detail_type + 'Types'].array;
        $mdDialog.show({
            controller: ViewDayDetailDialogController,
            scope: $scope,
            preserveScope: true,
            templateUrl: 'viewdaydetail.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen,
            openFrom: angular.element(document.querySelector('#left')),
            closeTo: angular.element(document.querySelector('#right'))
        });
    };

    function ViewDayDetailDialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        // Function to add day detail
        $scope.updateDayDetail = function() {
            console.log('updateDayDetail', self.data.day.trip_id, self.data.day._id, self.focusDetail);
            myTripFactory.updateDetail(self.data.day.trip_id, self.data.day._id, self.focusDetail)
                .then((response) => $mdDialog.cancel())
                .catch((err) => console.log("Error updating day detail", err));
        }; // End addDayDetail

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            self.focusDetail.name = place.name;
            self.focusDetail.url = place.website;
            self.focusDetail.location = place.formatted_address;
            self.focusDetail.location_map = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };

        $scope.deleteDetail = function(detailID) {
            let dayID = self.data.day._id;
            myTripFactory.deleteDetail(self.data.day.trip_id, dayID, detailID)
                .then((response) => $mdDialog.cancel())
                .catch((err) => console.log("Error deleting day detail", err));
        };
    }

}]); // END: MyTripController
