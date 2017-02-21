/*jshint esversion: 6 */
app.controller('AddDayController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, NgMap, GeoCoder) {
    console.log('AddDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    console.log('add day tripID', navFactory.data.tripID);
    console.log('add day dayID', navFactory.data.dayID);

    // Enable day topic buttons once day is created
    self.isDisabled = false;
    if (navFactory.data.dayID === '') {
        self.isDisabled = true;
    }

    // Set left nav parameters
    navFactory.setNav('Add Day', '#/mydays/' + navFactory.data.tripID, true);

    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        // console.log('location', self.place);
        self.map.setCenter(self.place.geometry.location);
        let location = self.place.geometry.location;
        self.data.day.destination_location = {
            pos: [location.lat(), location.lng()]
        };
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

    // // Function to add a day
    self.addDay = function() {
      console.log('addDay', navFactory.dayID);
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
