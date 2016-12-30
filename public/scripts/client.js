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
        .when('/mydays/:tripID', {
            templateUrl: '/views/templates/mydays.html',
            controller: 'MyDayController',
            controllerAs: 'mdc'
        })
        .when('/addtrip', {
            templateUrl: '/views/templates/addtrip.html',
            controller: 'AddTripController',
            controllerAs: 'atc'
        })
        .when('/edittrip/:tripID', {
            templateUrl: '/views/templates/edittrip.html',
            controller: 'EditTripController',
            controllerAs: 'etc'
        })
        .when('/addday/:tripID', {
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
        .otherwise({
            redirectTo: 'home'
        });
}]); // End config
