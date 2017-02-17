/*jshint esversion: 6 */
app.controller('DayGenController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, NgMap, GeoCoder) {
    console.log('DayGenController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;

    self.data = myTripFactory.data;

    // Set left nav parameters
    navFactory.setNav('Day General Info', '#/addday', true);

    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        // console.log('location', self.place);
        self.map.setCenter(self.place.geometry.location);
        let location = self.place.geometry.location;
        self.lat = location.lat();
        self.lng = location.lng();
        self.data.day.destination_location = {
            pos: [self.lat, self.lng]
        };
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

    // // Function to add a day
    self.addDay = function() {
        if (navFactory.dayID === undefined) {
            self.data.day.trip_id = navFactory.data.tripID;
            // console.log('addDay:', self.data.day);
            myTripFactory.addDay(self.data.day)
                .then(function(response) {
                        navFactory.data.dayID = myTripFactory.data.day._id;
                        window.location = '#/addday';
                    },
                    function(err) {
                        console.log('Error adding day', err);
                    });
        } else {
            self.data.day.trip_id = navFactory.data.tripID;
            myTripFactory.updateDay(self.data.day)
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
