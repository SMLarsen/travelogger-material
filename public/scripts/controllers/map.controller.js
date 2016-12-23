app.controller("MapController", ['$http', '$filter', '$routeParams', 'NgMap', 'GeoCoder', function($http, $filter, $routeParams, NgMap, GeoCoder) {
    console.log('MapController started');
    var self = this;

    self.newAddress = '';
    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];
    self.startLocation = '';
    self.endLocation = '';

    function buildLocationArray() {
        var newLocation = {
            pos: [self.lat, self.lng],
            name: self.newAddress
        };
        self.locationArray.push(newLocation);
        console.log(self.locationArray);
        self.startLocation = self.locationArray[0];
        self.endLocation = self.locationArray[self.locationArray.length - 1];
        console.log('start:', self.startLocation);
        console.log('stop:', self.endLocation);
    }

    self.findAddress = function() {

        GeoCoder.geocode({
            address: self.newAddress
        }).then(function(result) {
            self.location = result[0].geometry.location;
            self.lat = self.location.lat();
            self.lng = self.location.lng();
            console.log("Latitude: " + self.lat);
            console.log("Longitude: " + self.lng);
            buildLocationArray();
        });
    };

}]); // END: DayController
