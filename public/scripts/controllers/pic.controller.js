app.controller("PicController", ['MyTripFactory', '$http', '$filter', function(MyTripFactory, $http, $filter) {
    console.log('PicController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    self.photoArray = [];

    // Get all trips for the user
    myTripFactory.getTrips()
        .then(function(response) {
                var trips = response;
                trips.forEach(buildPicArray);
                console.log("photoArray:", self.photoArray);
            },
            function(err) {
                console.log('Error getting trips for pics', err);
            });

    function buildPicArray(item, index) {
        var pic = {
            photo_url: item.photo_url,
            photo_caption: item.photo_caption
        };
        if (item.photo_url) {
            self.photoArray.push(pic);
        }
    }

    self.refresh = function() {
        alert("Hello pics!");
    };

}]); // END: PicController
