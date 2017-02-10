/*jshint esversion: 6 */
app.factory("NavFactory", function() {
    console.log('NavFactory started');

    let data = {
      currentView: 'My Trips',
      backView: '#/home',
      leftMenuActive: true
    };

    setNav = function(text, backView, leftMenuActive) {
      currentView = text;
      backView = backView;
      leftMenuActive = leftMenuActive;
      return;
    };

    var publicApi = {
        data: data,
        setNav: function() {
            return setNav();
        }
    };

    return publicApi;

}); // END: NavFactory
