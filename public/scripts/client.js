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
            controller: 'MyTripController',
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
            controller: 'MyDayController',
            controllerAs: 'mdc'
        })
        .when('/addday', {
            templateUrl: '/views/templates/addday.html',
            controller: 'AddDayController',
            controllerAs: 'adc'
        })
        .when('/editday/:dayID', {
            templateUrl: '/views/templates/editday.html',
            controller: 'EditDayController',
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
        .when('/daygen', {
            templateUrl: '/views/templates/daygen.html',
            controller: 'DayGenController',
            controllerAs: 'dg'
        })
        .when('/daybed', {
            templateUrl: '/views/templates/daybed.html',
            controller: 'DayBedController',
            controllerAs: 'db'
        })
        .when('/dayfood', {
            templateUrl: '/views/templates/dayfood.html',
            controller: 'DayFoodController',
            controllerAs: 'df'
        })
        .when('/addfood', {
            templateUrl: '/views/templates/addfood.html',
            controller: 'AddFoodController',
            controllerAs: 'af'
        })
        .when('/daypic', {
            templateUrl: '/views/templates/daypic.html',
            controller: 'DayPicController',
            controllerAs: 'dp'
        })
        .when('/dayroute', {
            templateUrl: '/views/templates/dayroute.html',
            controller: 'DayRouteController',
            controllerAs: 'dr'
        })
        .when('/daypoi', {
            templateUrl: '/views/templates/daypoi.html',
            controller: 'DayPOIController',
            controllerAs: 'di'
        })
        .otherwise({
            redirectTo: 'home'
        });

}]); // End config
