app.factory('DataFactory', function() {
  console.log('Factory running');

  // var currentBudget = 0;
  // var message = "hello from the factory";

  function doAThing(thing) {
    console.log('did my thing:', thing);
  }

  var publicApi = {
    currentBudget: 0,
    message: "Boo!",
    doThing: function(thing) {
      doAThing(thing);
    }
  };

  return publicApi;

});
