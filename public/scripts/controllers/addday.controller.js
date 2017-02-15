/*jshint esversion: 6 */
app.controller('AddDayController', ['NavFactory', 'MyTripFactory', function(NavFactory, MyTripFactory) {
    console.log('AddDayController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = myTripFactory.data;

    console.log('add day tripID', navFactory.data.tripID);
    console.log('add day dayID', navFactory.data.dayID);

    // Enable day topic buttons once day is created
    if (navFactory.data.dayID === '') {
      self.isDisabled = true;
    } else {
      self.isDisabled = false;
    }

    // Set left nav parameters
    navFactory.setNav('Add Day', '#/mydays/' + navFactory.data.tripID, true);

    //Function to manage navigation
    self.goToDay = function(target) {
      window.location = '/#/' + target;
    };

}]); // END: MyTripController
