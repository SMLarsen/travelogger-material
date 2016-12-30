app.controller("PicController", ['MyTripFactory', '$http', '$filter', '$routeParams', 'NgMap', 'GeoCoder', function(MyTripFactory, $http, $filter, $routeParams, NgMap, GeoCoder) {
    console.log('PicController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    self.newAddress = '';
    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];

    // Get all trips for the user
    myTripFactory.getTrips()
        .then(function(response) {
                var trips = response;
                trips.forEach(buildLocationArray);
            },
            function(err) {
                console.log('Error getting trips', err);
            });

    function buildLocationArray(item, index) {
      if (item.destination_location) {
        self.locationArray.push(item.destination_location);
      }
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

}]); // END: PicController