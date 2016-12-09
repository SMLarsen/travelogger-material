var app = angular.module('traveloggerApp', ['ngRoute', 'firebase', 'ngAnimate', 'ui.bootstrap']);
console.log('traveloggerApp running');

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/mytrips', {
            templateUrl: '/views/templates/mytrips.html',
            controller: 'MyTripController',
            controllerAs: 'mtc'
        })
        .when('/trips', {
            templateUrl: '/views/templates/trips.html',
            controller: 'TripController',
            controllerAs: 'tc'
        })
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'lc'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]); // End config
