// app.controller("LoginController", ["AuthFactory", function(AuthFactory) {
  app.controller("LoginController", ["$location", "AuthFactory", function($location, AuthFactory) {
    console.log('LoginController started');
    var self = this;
    var authFactory = AuthFactory;
    var location = $location;

    self.status = {
        isLoggedIn: false
    };

    self.goGuest = function(hash) {
        location.path(hash);
    };

    // Function to Login
    self.logIn = function() {
        authFactory.logIn().then(function(currentUser) {
            console.log('lc current user', currentUser);
            authFactory.idToken = currentUser.idToken;
        });
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut();
    }; // End Logout

}]); // END: TripController
