/*jshint esversion: 6 */
app.controller('DayGenController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, NgMap, GeoCoder) {
    console.log('DayGenController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;

    self.newDay = {
        interesting_locations: [],
        routes: [],
        meals: [],
        recommendations: []
    };

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
        self.newDay.destination_location = {
            pos: [self.lat, self.lng]
        };
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

    // // Function to add a day
    self.addDay = function() {
        self.newDay.trip_id = navFactory.data.tripID;
        // console.log('addDay:', self.newDay);
        myTripFactory.addDay(self.newDay)
            .then(function(response) {
                    self.newDay = {};
                    navFactory.data.dayID = myTripFactory.data.day._id;
                    window.location = '#/addday';
                },
                function(err) {
                    console.log('Error adding day', err);
                });
    }; // End addDay

}]); // END: MyTripController
