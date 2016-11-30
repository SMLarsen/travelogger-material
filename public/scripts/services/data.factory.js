app.factory('DataFactory', ["$http", function($http) {
  console.log('Factory running');
  var currentBudget = undefined;
  var budgets = undefined;

  // Private methods
  function addBudget(newBudget) {
    var promise = $http.post('/budgets', newBudget)
      .then(function(response) {
        console.log('factory add budget response', response);
        return getBudgets();
      },
      function(response) {
        // error
        console.log('ERROR post response: ', response.data);
      });

    return promise;
  }

  function getBudgets() {
    console.log('factory getting budgets');
    var promise = $http.get('/budgets')
      .then(function(response) {
        budgets = response.data;
        currentBudget = budgets[budgets.length - 1].monthly_limit;
        console.log('async stuff:', budgets);
        return 'hello';
      },
      function(response) {
        // error
        console.log('ERROR get response: ', response.data);
      });

    return promise;
  }


  // Public API
  var publicApi = {
    updateBudgets: function() {
      return getBudgets();
    },
    currentBudget: function() {
      return currentBudget;
    },
    budgetData: function() {
      return budgets;
    },
    addBudget: function(newBudget) {
      return addBudget(newBudget);
    }
  };

  return publicApi;

}]);
