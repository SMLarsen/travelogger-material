/*jshint esversion: 6 */
app.controller('EditDayController', ['MyTripFactory', '$scope', 'NgMap', 'GeoCoder', '$routeParams', '$mdDialog', function(MyTripFactory, $scope, NgMap, GeoCoder, $routeParams, $mdDialog) {
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
            array: ['Car', 'Bus', 'Train', 'Air', 'Boat', 'Foot'],
            title: 'Transport',
            icon: 'cars.svg'
        },
        lodgingTypes: {
            array: ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'],
            title: 'Lodging',
            icon: 'hotel.svg'
        },
        mealTypes: {
            array: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'],
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
            $scope.$apply();
        })
        .catch((err) => console.log('Error getting day', err));

    // // Function to update a day
    self.updateDay = function() {
        self.data.day.trip_id = self.tripID;
        myTripFactory.updateDay(self.data.day)
            .then((response) => window.location = "#/mydays/" + self.tripID)
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

    self.addDetail = function(ev, detailType) {
        self.newDetail = {};
        self.title = DETAILTYPES[detailType + 'Types'].title;
        self.newDetail.icon = ICONPATH;
        self.newDetail.icon += DETAILTYPES[detailType + 'Types'].icon;
        self.selectArray = DETAILTYPES[detailType + 'Types'].array;
        console.log('newDetail:', self.newDetail);
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
            self.data.day.details.push(self.newDetail);
            $mdDialog.cancel();
        }; // End addDayDetail

        // Find location
        $scope.destinationChanged = function() {
            let place = this.getPlace();
            console.log(place);
            self.newDetail.name = place.name;
            self.newDetail.url = place.website;
            self.newDetail.location = place.formatted_address;
            self.newDetail.location_map = {
                pos: [place.geometry.location.lat(), place.geometry.location.lng()]
            };
        };
    }

}]); // END: MyTripController
