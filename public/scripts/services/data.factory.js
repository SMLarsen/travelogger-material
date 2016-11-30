app.factory('DataFactory', ["$http", function($http) {
  console.log('Factory running');
  var currentBudget = undefined;
  var budgets = undefined;

  // Private methods
  // Add a new budget to the database
  function addBudget(newBudget) {
    // store and return our Promise object
    var promise = $http.post('/budgets', newBudget)
      .then(function(response) {
        console.log('factory add budget response', response);
        // Now go get our updated budget data
        return getBudgets();
      },
      function(response) {
        // error
        console.log('ERROR post response: ', response.data);
      });

    return promise;
  }

  // Get all the budgets from the server
  function getBudgets() {
    console.log('factory getting budgets');
    // store and return our Promise object
    var promise = $http.get('/budgets')
      .then(function(response) {
        // we have our data from the server, now store it for use in the factory
        budgets = response.data;
        currentBudget = budgets[budgets.length - 1].monthly_limit;
        console.log('async stuff:', budgets);

        // We can also return values to the Controller
        // return 'hello';
      },
      function(response) {
        // error
        console.log('ERROR get response: ', response.data);
      });

    return promise;
  }


  // Public API
  // This object is what the Controllers can access
  var publicApi = {
    currentBudget: function() {
      // return our varible to the Controller!
      return currentBudget;
    },
    budgetData: function() {
      // return our array to the Controller!
      return budgets;
    },
    updateBudgets: function() {
      // return our Promise to the Controller!
      return getBudgets();
    },
    addBudget: function(newBudget) {
      // return our Promise to the Controller!
      return addBudget(newBudget);
    }
  };

  return publicApi;

}]);
