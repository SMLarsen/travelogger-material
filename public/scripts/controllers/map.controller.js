app.controller("MapController", ['MapFactory', '$http', '$filter', '$routeParams', 'NgMap', function(MapFactory, $http, $filter, $routeParams, NgMap) {
    console.log('MapController started');
    var self = this;
    var mapFactory = MapFactory;

    self.newAddress = '';
    self.location = {};
    self.lat = '';
    self.lng = '';

    self.findAddress = function() {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": self.newAddress }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                self.location = results[0].geometry.location;
                self.lat      = self.location.lat();
                self.lng      = self.location.lng();
              console.log("Latitude: " + self.lat);
              console.log("Longitude: " + self.lng);
            }
        });
      };

}]); // END: DayController
