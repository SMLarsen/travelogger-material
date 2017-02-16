/*jshint esversion: 6 */
app.controller('AddFoodController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, NavFactory, NgMap, GeoCoder, $routeParams) {
    console.log('AddFoodController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    self.newMeal = {};

    // Set left nav parameters
    navFactory.setNav('Add Food', '#/dayfood', true);

    self.mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Refreshment'];

    // Add meal row to new Day
    self.addMeal = function() {
        self.data.day.meals.push(angular.copy(self.newMeal));
        self.newMeal = {};
        myTripFactory.updateDay(self.data.day)
            .then(function(response) {
                    self.newDay = {};
                    window.location = '#/dayfood';
                },
                function(err) {
                    console.log('Error adding day', err);
                });
    }; // End addMeal

    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        // console.log('location', self.place);
        self.newMeal.name = self.place.name;
        self.newMeal.location = self.place.formatted_address;
        let location = self.place.geometry.location;
        self.lat = location.lat();
        self.lng = location.lng();
        self.map.setCenter(self.place.geometry.location);
        self.newMeal.map_location = {
            pos: [self.lat, self.lng]
        };
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

}]); // END: MyTripController
