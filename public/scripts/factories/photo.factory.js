/*jshint esversion: 6 */
app.factory("PhotoFactory", ["$http", "AuthFactory", "MyTripFactory", function($http, AuthFactory, MyTripFactory) {
    console.log('PhotoFactory started');

    const authFactory = AuthFactory;
    const myTripFactory = MyTripFactory;

    let authData = authFactory.data;
    let tripData = myTripFactory.data;

    let data = {
        photo: {}
    };

    // Function to GET photos for a day
    function getDayAlbum(dayID) {} // End getDayAlbum

    // Function to GET photos for a trip
    function getTripAlbum(tripID) {} // End getTripAlbum

    // Function to GET photos for a traveller
    function getUserAlbum(userID) {} // End getUserAlbum

    // Function to add album for a traveller
    function addTravellerAlbum(albumName) {} // End addTravellerAlbum

    // Function to delete album for a traveller
    function deleteTravellerAlbum(userID) {} // End deleteTravellerAlbum

    // Function to add album for a trip
    function addTripAlbum(tripID) {} // End addTripAlbum

    // Function to delete album for a trip
    function deleteTripAlbum(tripID) {} // End deleteTripAlbum

    // Function to add a photo
    function uploadPhoto(file) {
        file.append('dayCoverPhoto', data.newPhoto.dayCoverPhoto);
        file.append('tripCoverPhoto', data.newPhoto.tripCoverPhoto);
        file.append('trip_id', data.newPhoto.trip._id);
        file.append('day_id', data.newPhoto.day._id);
        file.append('icon', data.newPhoto.icon);
        file.append('description', data.newPhoto.description);
        file.append('detail_type', data.newPhoto.detail_type);
        console.log('file:', file);

        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'POST',
                        url: '/photo/' + tripData.trip.album_url + '/' + tripData.day.album_url,
                        data: file,
                        transformRequest: angular.indentity, //stops angular from serializing our data
                        headers: {
                            'Content-Type': undefined, //lets browser handle what type of data is being sent...
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .then((response) => {
                        data.photo = response.data;
                        console.log('data.newPhoto:', data.newPhoto);
                        console.log('data.photo:', data.photo);
                        myTripFactory.getDay(data.newPhoto.day._id);
                        if (data.newPhoto.tripCoverPhoto === true) {
                            tripData.trip.cover_photo_url = data.photo.url;
                            myTripFactory.updateTrip();
                        }
                        if (data.newPhoto.dayCoverPhoto === true) {
                            tripData.day.cover_photo_url = data.photo.url;
                            myTripFactory.updateDay();
                        }
                        return;
                    })
                    .catch((err) => console.log('Unable to add photo', err));
            });

    } // End uploadPhoto

    // Function to delete a photo
    function deletePhoto(photoID, dayID, photoURL) {
        let encodedURL = encodeURIComponent(photoURL);
        console.log('encodedURL', encodedURL);
        return authFactory.getIdToken()
            .then((currentUser) => {
                return $http({
                        method: 'DELETE',
                        url: '/photo/' + dayID + '/' + photoID + '/' + encodedURL,
                        headers: {
                            id_token: authData.currentUser.authIdToken
                        }
                    })
                    .catch((err) => alert('There was an error deleting your photo: ', err.message));
            });
    } // End deletePhoto

    const publicApi = {
        data: data,
        getDayAlbum: function(dayID) {
            return getDayAlbum(dayID);
        },
        getTripAlbum: function(tripID) {
            return getTripAlbum(tripID);
        },
        getUserAlbum: function(userID) {
            return getUserAlbum(userID);
        },
        addTravellerAlbum: function() {
            return addTravellerAlbum();
        },
        deleteTravellerAlbum: function() {
            return deleteTravellerAlbum();
        },
        addTripAlbum: function() {
            return addTripAlbum();
        },
        deleteTripAlbum: function() {
            return deleteTripAlbum();
        },
        uploadPhoto: function(fd) {
            return uploadPhoto(fd);
        },
        deletePhoto: function(photoID, dayID, photoURL) {
            return deletePhoto(photoID, dayID, photoURL);
        }
    };

    return publicApi;
}]); // END: PhotoFactory
