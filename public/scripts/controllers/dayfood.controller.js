/*jshint esversion: 6 */
app.controller('DayFoodController', ['MyTripFactory', 'NavFactory', function(MyTripFactory, NavFactory) {
    console.log('DayFoodController started');

    const navFactory = NavFactory;
    const myTripFactory = MyTripFactory;

    let self = this;
    self.data = myTripFactory.data;

    // Set left nav parameters
    navFactory.setNav('Food', '#/addday', true);

    // Function to go to add food
    self.addFood = function() {
        console.log('going to add food');
        window.location = '/#/addfood';
    };

}]); // END: DayFoodController
