var app = angular.module('traveloggerApp', ['ngRoute', 'firebase', 'ngAnimate', 'ui.bootstrap', 'ngMap', 'ngMaterial']);

console.log('traveloggerApp running');

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/mytrips', {
            templateUrl: '/views/templates/mytrips.html',
            controller: 'MyTripsController',
            controllerAs: 'mtc'
        })
        .when('/trips', {
            templateUrl: '/views/templates/trips.html',
            controller: 'TripsController',
            controllerAs: 'tc'
        })
        .when('/trip/:tripID', {
            templateUrl: '/views/templates/trip.html',
            controller: 'TripController',
            controllerAs: 'gtc'
        })
        .when('/mydays/:tripID', {
            templateUrl: '/views/templates/mydays.html',
            controller: 'MyDaysController',
            controllerAs: 'mdc'
        })
        .when('/myday/:tripID/:dayID', {
            templateUrl: '/views/templates/myday.html',
            controller: 'MyDayController',
            controllerAs: 'edc'
        })
        .when('/days/:tripID', {
            templateUrl: '/views/templates/days.html',
            controller: 'DayController',
            controllerAs: 'dc'
        })
        .when('/maps', {
            templateUrl: '/views/templates/maps.html',
            controller: 'MapController',
            controllerAs: 'mc'
        })
        .when('/pics', {
            templateUrl: '/views/templates/pics.html',
            controller: 'PicController',
            controllerAs: 'pc'
        })
        .otherwise({
            redirectTo: 'home'
        });

}]); // End config
