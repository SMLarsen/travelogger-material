/*jshint esversion: 6 */
app.controller("MapController", ['MyTripFactory', '$filter', '$routeParams', 'NgMap', 'GeoCoder', function(MyTripFactory, $filter, $routeParams, NgMap, GeoCoder) {
    console.log('MapController started');

    const myTripFactory = MyTripFactory;

    let self = this;
    self.data = myTripFactory.data;
    self.newAddress = '';
    self.location = {};
    self.lat = '';
    self.lng = '';
    self.locationArray = [];

    // Get all trips for the user
    myTripFactory.getTrips()
        .then((response) => self.data.trips.forEach(buildLocationArray))
        .catch((err) => console.log('Error getting trips', err));

    function buildLocationArray(item, index) {
        if (item.destination_location) {
            self.locationArray.push(item.destination_location);
        }
    }

    self.findAddress = function() {
        GeoCoder.geocode({
            address: self.newAddress
        }).then((result) => {
            self.location = result[0].geometry.location;
            self.lat = self.location.lat();
            self.lng = self.location.lng();
            buildLocationArray();
        });
    };

}]); // END: MapController
