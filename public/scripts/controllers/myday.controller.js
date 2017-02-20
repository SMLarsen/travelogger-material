/*jshint esversion: 6 */
app.controller('MyDayController', ['MyTripFactory', 'NavFactory', '$routeParams', 'NgMap', 'GeoCoder', function(MyTripFactory, NavFactory, $routeParams, NgMap, GeoCoder) {
    console.log('MyDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;
    self.tripID = $routeParams.tripID;

    self.days = [];

    // Set left nav parameters
    navFactory.setNav('Days', '#/mytrips', true);

    getDays(self.tripID);

    // Function to GET days for a trip
    function getDays(tripID) {
        myTripFactory.getDays(tripID)
            .then(function(response) {
                    console.log('Retrieved days');
                },
                function(err) {
                    console.log('Error getting days', err);
                });
    } // End getDays

    // Function to Delete a day
    self.deleteDay = function(dayID, tripID) {
        console.log('delete day:', dayID);
        myTripFactory.deleteDay(dayID)
            .then(function(response) {
                    myTripFactory.getDays(tripID)
                        .then(function(response) {
                                console.log('Day deleted');
                            },
                            function(err) {
                                console.log('Error getting days after delete', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete day', err);
                });
    }; // End deleteDay

    // Function to go to add day
    self.goToDay = function(type, day) {
        console.log('go to day type:', type, day);
        navFactory.data.tripID = $routeParams.tripID;
        if (type === 'Add') {
            self.data.day = {};
            navFactory.data.dayID = '';
        } else {
            self.data.day = day;
            navFactory.data.dayID = self.data.day._id;
        }
        window.location = '/#/addday';
    };

}]); // END: MyDayController
