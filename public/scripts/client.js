var app = angular.module('traveloggerApp', ['ngRoute', 'firebase', 'ngAnimate', 'ui.bootstrap', 'xeditable', 'ngMap']);

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
        .when('/days/:tripID', {
            templateUrl: '/views/templates/days.html',
            controller: 'DayController',
            controllerAs: 'dc'
        })
        .when('/maps', {
            templateUrl: '/views/templates/maps.html',
            controller: 'MapController',
            controllerAs: 'tc'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]); // End config
