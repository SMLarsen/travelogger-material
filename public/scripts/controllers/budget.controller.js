app.controller("BudgetController", ["$http", "DataFactory", function($http, DataFactory) {
  console.log('BudgetController running');

  var self = this;
  self.newBudget = {};
  self.budgets = [];
  self.currentBudget = 0;
  self.factory = DataFactory;

  getBudgets();

  function getBudgets() {
    $http.get('/budgets')
      .then(function(response) {
        self.budgets = response.data;
        self.currentBudget = self.budgets[self.budgets.length - 1].monthly_limit;
        DataFactory.currentBudget = self.currentBudget;
      },
      function(response) {
        // error
        console.log('ERROR get response: ', response.data);
      });
  }

  self.addBudget = function() {
    DataFactory.doThing('like, dance');
    $http.post('/budgets', self.newBudget)
      .then(function(response) {
        getBudgets();
      },
      function(response) {
        // error
        console.log('ERROR post response: ', response.data);
      });
  }

}]);
