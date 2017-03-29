/*jshint esversion: 6 */
app.controller('MyDayController', ['MyTripFactory', 'NavFactory', '$scope', 'GeoCoder', '$routeParams', '$mdDialog', '$window', 'PhotoFactory', function(MyTripFactory, NavFactory, $scope, GeoCoder, $routeParams, $mdDialog, $window, PhotoFactory) {
    console.log('MyDayController started');

    const myTripFactory = MyTripFactory;
    const photoFactory = PhotoFactory;
    const navFactory = NavFactory;

    let self = this;
    self.tripData = myTripFactory.data;
    self.tripData.day = {};
    self.newDetail = {};

    self.photoData = photoFactory.data;
    const newPhotoDefault = {
        dayCoverPhoto: false,
        tripCoverPhoto: false,
        detail: {}
    };
    self.photoData.newPhoto = newPhotoDefault;
    self.photoFile = "empty";
    self.photoToUpload;
    self.addMessage = "Pick a photo to upload";
    self.statusOn = false;

    let dayID = $routeParams.dayID;
    let tripID = $routeParams.tripID;

    self.selectArray = [];

    const ICONPATH = './assets/icons/';
    const DETAILTYPES = {
        detailTypes: {
            array: ['Lodging', 'Meal', 'Transport', 'Point of Interest', 'Photo']
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
        },
        photoTypes: {
            title: 'Photos',
            icon: 'ic_photo_camera_white_24px.svg'
        }
    };

    // Set left nav parameters
    navFactory.setNav('My Day', '#/mydays/' + tripID, true);

    myTripFactory.getDay(dayID)
        .then((response) => {
            self.tripID = self.tripData.day.trip_id;
            self.tripData.day.date = new Date(self.tripData.day.date);
        })
        .catch((err) => console.log('Error getting day', err));

    // // Function to update a day
    self.updateDay = function() {
        self.tripData.day.trip_id = self.tripID;
        myTripFactory.updateDay(self.tripData.day)
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
        self.tripData.day = {};
        window.location = '/#/mydays/' + self.tripID;
    };

    self.deleteDetail = function(detailID) {
        let dayID = self.tripData.day._id;
        myTripFactory.deleteDetail(self.tripData.day.trip_id, dayID, detailID)
            .catch((err) => console.log("Error deleting day detail", err));
    };

    self.updateDetail = function() {
        let dayID = self.tripData.day._id;
        myTripFactory.updateDetail(self.tripData.day.trip_id, self.tripData.day._id, self.focusDetail)
            .catch((err) => console.log("Error updating day detail", err));
    };

    self.addDetail = function(ev, detailType) {
        self.search = '';
        self.newDetail = {};
        self.title = DETAILTYPES[detailType + 'Types'].title;
        self.newDetail.detail_type = detailType;
        self.newDetail.icon = ICONPATH;
        self.newDetail.icon += DETAILTYPES[detailType + 'Types'].icon;
        self.selectArray = DETAILTYPES[detailType + 'Types'].array;
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            contentElement: '#addDayDetail',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen,
            openFrom: angular.element(document.querySelector('#left')),
            closeTo: angular.element(document.querySelector('#right'))
        });
    };

    self.cancel = function() {
        $mdDialog.cancel();
    };
    // Function to add day detail
    self.addDayDetail = function() {
        myTripFactory.addDetail(self.tripData.day.trip_id, self.tripData.day._id, self.newDetail)
            .then((response) => $mdDialog.cancel())
            .catch((err) => console.log("Error adding day detail", err));
    }; // End addDayDetail

    // Find location
    self.destinationChanged = function() {
        let place = this.getPlace();
        self.newDetail.name = place.name;
        self.newDetail.url = place.website;
        self.newDetail.location = place.formatted_address;
        self.newDetail.location_map = {
            pos: [place.geometry.location.lat(), place.geometry.location.lng()]
        };
    };

    self.hide = function() {
        $mdDialog.hide();
    };

    self.viewDetail = function(ev, index) {
        if (self.tripData.day.details[index].detail_type === 'photo') {
            zoomPhoto(ev, self.tripData.day.details[index]);
        } else {
            self.focusDetail = self.tripData.day.details[index];
            self.title = DETAILTYPES[self.focusDetail.detail_type + 'Types'].title;
            self.selectArray = DETAILTYPES[self.focusDetail.detail_type + 'Types'].array;
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                contentElement: '#viewDayDetail',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: self.customFullscreen,
                openFrom: angular.element(document.querySelector('#left')),
                closeTo: angular.element(document.querySelector('#right'))
            });
        }
    };

    // Find location
    self.currentDestinationChanged = function() {
        let place = this.getPlace();
        self.focusDetail.name = place.name;
        self.focusDetail.url = place.website;
        self.focusDetail.location = place.formatted_address;
        self.focusDetail.location_map = {
            pos: [place.geometry.location.lat(), place.geometry.location.lng()]
        };
    };

    self.deleteDetail = function(detailID) {
        let dayID = self.tripData.day._id;
        myTripFactory.deleteDetail(self.tripData.day.trip_id, dayID, detailID)
            .then((response) => $mdDialog.cancel())
            .catch((err) => console.log("Error deleting day detail", err));
    };

    self.addPhoto = function(ev, detailType) {
        self.title = DETAILTYPES[detailType + 'Types'].title;
        self.photoData.newPhoto.detail_type = detailType;
        self.photoData.newPhoto.icon = ICONPATH;
        self.photoData.newPhoto.icon += DETAILTYPES[detailType + 'Types'].icon;
        self.photoData.newPhoto.day_id = self.tripData.day._id;
        self.photoData.newPhoto.trip_id = self.tripData.day.trip_id;
        self.photoData.newPhoto.trip = self.tripData.trip;
        self.photoData.newPhoto.day = self.tripData.day;
        console.log('photoData:', self.photoData.newPhoto);
        console.log('detailType', detailType);
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            contentElement: '#addPhotoDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };


    self.uploadPhoto = function() {
        console.log('newPhoto:', self.photoData.newPhoto);
        console.log('photo:', self.photoToUpload);
        var files = document.getElementById('input-file-id').files;
        if (!files.length) {
            self.addMessage = "Please choose a file to upload first.";
        } else {
            self.statusOn = true;
            let fd = new FormData();
            fd.append('file', files[0]);
            photoFactory.uploadPhoto(fd)
                .then((response) => {
                    self.statusOn = false;
                    alert('Successfully uploaded photo.');
                    // viewAlbum(self.albumID, self.albumS3ID);
                    self.photoData.newPhoto = newPhotoDefault;
                    self.photoToUpload = undefined;
                    $mdDialog.cancel();
                })
                .catch((err) => alert('There was an error uploading your photos ' + err.message));
        }
    };

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#upload-preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#input-file-id").change(function() {
        readURL(this);
    });

    let zoomPhoto = function(ev, photo) {
        self.photoToZoom = photo;
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            contentElement: '#zoomPhotoDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
        });
    };

    self.deletePhoto = function() {
        photoFactory.deletePhoto(self.photoToZoom._id, self.tripData.day._id, self.photoToZoom.url)
            .then((data) => {
                alert('Successfully deleted photo.');
                myTripFactory.getDay(self.tripData.day._id);
                $mdDialog.cancel();
            })
            .catch((err) => alert('There was an error deleting your photo: ', err.message));
    };

}]); // END: MyTripController
