app.controller("NavController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('NavController started');
    var self = this;
    self.trips = [];
    var authFactory = AuthFactory;

    // Function to Login
    self.logIn = function() {
        authFactory.logIn().then(function(currentUser) {
          console.log('lc current user', currentUser);
          authFactory.idToken = currentUser.idToken;
        }) ;
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut();
    }; // End Logout

}]); // END: TripController
