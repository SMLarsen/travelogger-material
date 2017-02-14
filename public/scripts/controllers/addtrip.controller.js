/*jshint esversion: 6 */
app.controller('AddTripController', ['MyTripFactory', 'NgMap', 'GeoCoder', 'NavFactory', function(MyTripFactory, NgMap, GeoCoder, NavFactory) {
    console.log('AddTripController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    self.newTrip = {};

    self.newAddress = '';
    self.lat = '';
    self.lng = '';

    // Set left nav parameters
    navFactory.setNav('Add Trip', '#/mytrips', true);

    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        // console.log('location', self.place);
        self.map.setCenter(self.place.geometry.location);
        let location = self.place.geometry.location;
        self.lat = location.lat();
        self.lng = location.lng();
        self.newTrip.destination_location = {
            pos: [self.lat, self.lng]
        };
        NgMap.getMap().then(function(map) {
            self.map = map;
        });
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // Function to add a trip
    self.addTrip = function() {
        myTripFactory.addTrip(self.newTrip)
            .then(function(response) {
                    self.newTrip = {};
                    myTripFactory.getTrips()
                        .then(function(response) {
                                self.addTripStatus = false;
                                console.log('Trip added');
                                self.newTrip = {};
                                window.location = '/#/mytrips';
                            },
                            function(err) {
                                console.log('Error getting trips', err);
                            });

                },
                function(err) {
                    console.log('Unable to add trip', err);
                }
            );
    }; // End addTrip

}]); // END: MyTripController
