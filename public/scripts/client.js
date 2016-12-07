var app = angular.module('traveloggerApp', ['ngRoute', 'firebase']);
console.log('traveloggerApp running');

// app.config(['$routeProvider', function($routeProvider) {
//     $routeProvider
//         .when('/employees', {
//             templateUrl: '/views/templates/employees.html',
//             controller: 'EmployeeController',
//             controllerAs: 'ec'
//         })
//         .when('/budgets', {
//             templateUrl: '/views/templates/budgets.html',
//             controller: 'BudgetController',
//             controllerAs: 'bc'
//         })
//         .otherwise({
//             redirectTo: 'employees'
//         });
// }]);

app.controller("SecurityController", function($firebaseAuth, $http) {
    console.log('SecurityController started');
    var auth = $firebaseAuth();
    var self = this;

    self.authenticatedUser = {};
    self.currentUser = {};
    self.newUser = {};

    // Authenticates user at login
    self.logIn = function() {
        auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
            self.authenticatedUser = firebaseUser;
        }).catch(function(error) {
            console.log("Authentication failed: ", error);
        });
    }; // END: logIn

    // Runs when user changes authentication states (logs in or out)
    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        self.authenticatedUser = firebaseUser;
        if (self.authenticatedUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/privateData',
                    headers: {
                        id_token: idToken,
                        currentUser: self.currentUser
                    }
                }).then(function(response) {
                        self.currentUser = response.data;
                        console.log('response.data', response.data);
                        console.log('current user authorized', self.currentUser);
                    },
                    function(err) {
                        console.log('current user not registered', err);
                    });
            });
        } else {
            console.log('Not logged in or not authorized.');
            self.authenticatedUser = {};
        }
    }); // End $onAuthStateChanged

    // Function handles user log out
    self.logOut = function() {
        auth.$signOut().then(function() {
            console.log('Logging the user out!');
        });
    }; // END: logOut

}); // END: SecurityController


app.controller("TripController", function($http) {
    console.log('TripController started');
    var self = this;

}); // END: TripController
