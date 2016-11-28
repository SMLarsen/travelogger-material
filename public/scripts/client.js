var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/employees', {
            templateUrl: '/views/templates/employees.html',
            controller: 'EmployeeController',
            controllerAs: 'ec'
        })
        .when('/budget', {
            templateUrl: '/views/templates/budget.html',
            controller: 'BudgetController',
            controllerAs: 'bc'
        })
        .otherwise({
            redirectTo: 'employees'
        });
}]);
