/*jshint esversion: 6 */
app.factory("NavFactory", function() {
    console.log('NavFactory started');

    let data = {
        currentView: 'My Blank',
        backView: '#/home',
        leftMenuActive: true
    };

    var setNav = function(text, backView, leftMenuActive) {
        data.currentView = text;
        data.backView = backView;
        data.leftMenuActive = leftMenuActive;
        console.log('navFactory', data);
        return;
    };

    var publicApi = {
        data: data,
        setNav: function(text, backView, leftMenuActive) {
            return setNav(text, backView, leftMenuActive);
        }
    };

    return publicApi;

}); // END: NavFactory
