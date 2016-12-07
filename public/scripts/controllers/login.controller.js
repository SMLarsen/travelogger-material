app.controller("LoginController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('LoginController started');
    var self = this;
    self.trips = [];
    var authFactory = AuthFactory;
    console.log(authFactory);

    // Function to Login
    self.logIn = function() {
        authFactory.logIn();
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut();
    }; // End Logout

}]); // END: TripController
