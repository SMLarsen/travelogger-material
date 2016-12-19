app.controller("NavController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('NavController started');
    var self = this;
    var authFactory = AuthFactory;

    self.isUserLoggedIn = authFactory.isUserLoggedIn;
    console.log(1, self.isUserLoggedIn);
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
                authFactory.isUserLoggedIn = true;
                self.isUserLoggedIn = true;
                console.log(2, self.isUserLoggedIn);
            });
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut();
        authFactory.isUserLoggedIn = false;
        self.isUserLoggedIn = authFactory.isUserLoggedIn;
        console.log(3, self.isUserLoggedIn);
    }; // End Logout

}]); // END: NavController
