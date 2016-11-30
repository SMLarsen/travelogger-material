app.controller("BudgetController", ["$http", "DataFactory", function($http, DataFactory) {
  console.log('BudgetController running');

  var self = this;
  self.newBudget = {};
  self.budgets = [];
  self.currentBudget = 0;

  getBudgets();

  function getBudgets() {
    // does the factory have data?
    if(DataFactory.budgetData() === undefined) {
      // have the factory go get the data
      DataFactory.updateBudgets().then(function(response) {
        console.log(DataFactory.currentBudget());
        self.budgets = DataFactory.budgetData();
        self.currentBudget = DataFactory.currentBudget();
        console.log(self.currentBudget, self.budgets);
      });
    } else {
      self.budgets = DataFactory.budgetData();
      self.currentBudget = DataFactory.currentBudget();
    }

  }

  self.addBudget = function() {
    DataFactory.addBudget(self.newBudget)
      .then(function(response) {
        self.budgets = DataFactory.budgetData();
        self.currentBudget = DataFactory.currentBudget();
        console.log('controller add budget response ', response);
        console.log('controller add budget response ', response);
      });
  }

}]);
