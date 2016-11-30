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
      // have the factory go get the data and let us know when it's done
      DataFactory.updateBudgets().then(function(response) {
        self.budgets = DataFactory.budgetData();
        self.currentBudget = DataFactory.currentBudget();
        console.log("Controller got stuff from the factory: ", self.currentBudget, self.budgets);
      });
    } else {
      // Factory already has data, let's use it
      self.budgets = DataFactory.budgetData();
      self.currentBudget = DataFactory.currentBudget();
    }

  }

  self.addBudget = function() {
    // Give our new object to the factory to store on the server
    DataFactory.addBudget(self.newBudget)
      .then(function(response) {
        console.log('controller add budget response ', response);
        self.budgets = DataFactory.budgetData();
        self.currentBudget = DataFactory.currentBudget();
      });
  }

}]);
