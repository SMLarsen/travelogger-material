/*jshint esversion: 6 */
app.controller("PicController", ['AuthFactory', 'MyTripFactory', '$filter', function(AuthFactory, MyTripFactory, $filter) {
    console.log('PicController started');

    const myTripFactory = MyTripFactory;
    const authFactory = AuthFactory;

    let self = this;
    self.data = myTripFactory.data;
    let userID = "";
    self.photoArray = [];

    getPhotos();

    // Get photos for all trips and days for the user
    function getPhotos() {
        return myTripFactory.getTrips()
            .then((response) => {
                self.data.trips.forEach(buildPicArray);
                userID = self.data.trips[0].user_id;
                // Get all days for the user
                myTripFactory.getUserDays(userID);
            })
            .then((response) => {
                self.data.userDays.forEach(buildPicArray);
            })
            .catch((err) => console.log('Error getting days for pics', err));
    }

    function buildPicArray(item, index) {
        var pic = {
            photo_url: item.photo_url,
            photo_caption: item.photo_caption
        };
        if (item.photo_url) {
            self.photoArray.push(pic);
        }
    }

}]); // END: PicController
