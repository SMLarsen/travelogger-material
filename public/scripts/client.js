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
  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = "Log in to get some secret data.";
    }

  });

  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };
});
