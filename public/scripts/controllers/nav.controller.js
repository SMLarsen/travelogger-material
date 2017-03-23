/*jshint esversion: 6 */
app.controller("NavController", ["$http", "AuthFactory", "NavFactory", function($http, AuthFactory, NavFactory) {
    console.log('NavController started');

    const authFactory = AuthFactory;
    const navFactory = NavFactory;

    let self = this;
    self.authData = authFactory.data;
    self.navData = navFactory.data;
    self.displayOverlay = false;

    // test
    self.leftClick = function() {
        window.location = self.navData.backView;
    };

    // Function to show overlay menu
    self.showOverlay = function() {
        self.displayOverlay = true;
    }; // End showOverlay

    // Function to close overlay menu
    self.closeOverlay = function() {
        self.displayOverlay = false;
    }; // End closeOverlay

    // Function to Login
    self.logIn = function() {
        console.log('logging in');
        authFactory.logIn()
            .then((currentUser) => {
                self.authData.isUserLoggedIn = true;
                console.log('logged in as:', currentUser);
                window.location = '/#/mytrips';
            });
    }; // End Login

    // Function to Logout
    self.logOut = function() {
        console.log('logging out');
        authFactory.logOut()
            .then((response) => window.location = '/#/home');
    }; // End Logout

}]); // END: NavController