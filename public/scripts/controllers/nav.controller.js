/*jshint esversion: 6 */
app.controller("NavController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('NavController started');

    const authFactory = AuthFactory;

    let self = this;
    self.authData = authFactory.data;


    // Function to Login
    self.logIn = function() {
        authFactory.logIn()
            .then(function(currentUser) {
                self.authData.isUserLoggedIn = true;
                // authData.isUserLoggedIn = self.isUserLoggedIn;
                window.location = '/#/mytrips';
            });
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        authFactory.logOut().then(function(response) {
            window.location = '/#/home';
            console.log(self.authData.isUserLoggedIn);
        });
    }; // End Logout

}]); // END: NavController
