/*jshint esversion: 6 */
app.controller('AddDayController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, NgMap, GeoCoder) {
    console.log('AddDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];

    console.log('add day tripID', navFactory.data.tripID);
    console.log('add day dayID', navFactory.data.dayID);

    // Enable day topic buttons once day is created
    self.isDisabled = false;
    if (navFactory.data.dayID === '') {
        self.isDisabled = true;
    }

    // Set left nav parameters
    navFactory.setNav('Add Day', '#/mydays/' + navFactory.data.tripID, true);

    // Geocode general destination
    self.genDestinationChanged = function() {
        self.place = this.getPlace();
        self.map.setCenter(self.place.geometry.location);
        self.location = self.place.geometry.location;
        self.data.day.destination_location = {
            pos: [self.location.lat(), self.location.lng()]
        };
        console.log('gen day:', self.data.day);
    };

    // Geocode lodging destination
    self.bedDestinationChanged = function() {
        self.place = this.getPlace();
        self.map.setCenter(self.place.geometry.location);
        self.location = self.place.geometry.location;
        self.data.day.lodging_map_location = {
            pos: [self.location.lat(), self.location.lng()]
        };
        self.data.day.lodging_name = self.place.name;
        self.data.day.lodging_address = self.place.formatted_address;
        self.data.day.lodging_name = self.place.name;
        console.log('bed day:', self.data.day);
    };

    // Find location
    destinationChanged = function() {
        self.place = this.getPlace();
        self.map.setCenter(self.place.geometry.location);
        self.location = self.place.geometry.location;
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

    // // Function to add a day
    self.addDay = function() {
        console.log('addDay', self.data.day);
        if (navFactory.dayID === undefined) {
            self.data.day.trip_id = navFactory.data.tripID;
            // console.log('addDay:', self.data.day);
            myTripFactory.addDay()
                .then(function(response) {
                        navFactory.data.dayID = myTripFactory.data.day._id;
                        window.location = '#/addday';
                    },
                    function(err) {
                        console.log('Error adding day', err);
                    });
        } else {
            self.data.day.trip_id = navFactory.data.tripID;
            myTripFactory.updateDay()
                .then(function(response) {
                        navFactory.data.dayID = myTripFactory.data.day._id;
                        window.location = '#/addday';
                    },
                    function(err) {
                        console.log('Error updating day', err);
                    });
        }
    }; // End addDay

}]); // END: MyTripController
