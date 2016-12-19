app.controller("NavController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('NavController started');
    var self = this;
    var authFactory = AuthFactory;

    self.isUserLoggedIn = authFactory.isUserLoggedIn;
    self.status = {
        isLoggedIn: false
    };

    self.goGuest = function(hash) {
        location.path(hash);
    };

    // Function to Login
    self.logIn = function() {
        authFactory.logIn()
            .then(function(currentUser) {
                console.log('lc current user', currentUser);
                authFactory.idToken = currentUser.idToken;
                self.isUserLoggedIn = true;
                authFactory.isUserLoggedIn = self.isUserLoggedIn;
            });
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut();
        authFactory.isUserLoggedIn = false;
        authFactory.isUserLoggedIn = self.isUserLoggedIn;
    }; // End Logout

}]); // END: NavController
