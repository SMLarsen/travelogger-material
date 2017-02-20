/*jshint esversion: 6 */
app.factory("AuthFactory", function($firebaseAuth, $http) {
    console.log('AuthFactory started');

    const auth = $firebaseAuth();

    let data = {
        currentUser: {},
        isUserLoggedIn: false
    };

    // Authenticates user at login
    logIn = function() {
        return auth.$signInWithPopup("google")
            .then(function(firebaseUser) {
                console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
                data.currentUser = firebaseUser.user;
                data.isUserLoggedIn = true;
                return data.currentUser.getToken()
                    .then(function(idToken) {
                        return $http({
                                method: 'GET',
                                url: '/privateData',
                                headers: {
                                    id_token: idToken
                                }
                            })
                            .then(function(response) {
                                    data.currentUser.authIdToken = idToken;
                                    data.currentUser.id = response.data._id;
                                    data.isUserLoggedIn = true;
                                    // console.log('current user authorized', data.currentUser.id, data.isUserLoggedIn);
                                    return;
                                },
                                function(err) {
                                    data.isUserLoggedIn = false;
                                    console.log('current user not registered', err);
                                    return;
                                })
                            .catch(function(error) {
                                console.log("Authentication failed: ", error);
                                return;
                            });
                    });
            });
    }; // END: logIn

    // Function handles user log out
    logOut = function() {
        return auth.$signOut().then(function() {
            data.isUserLoggedIn = false;
            data.currentUser = {};
            console.log('Logging the user out!');
            return;
        });
    }; // END: logOut

    // Function get idToken
    getIdToken = function() {
        if (data.currentUser) {
            return data.currentUser.getToken()
                .then(function(idToken) {
                        data.currentUser.authIdToken = idToken;
                        // console.log('got current user idToken:', data.currentUser.email);
                        return;
                    },
                    function(err) {
                        console.log('current user not registered', err);
                        return;
                    });
        } else {
            return;
        }
    }; // End getIdToken


    // This code runs whenever the user changes authentication states
    // e.g. whevenever the user logs in or logs out
    // this is where we put most of our logic so that we don't duplicate
    // the same things in the login and the logout code
    auth.$onAuthStateChanged(function(firebaseUser) {
        window.location = '/#/home';
        // firebaseUser will be null if not logged in
        data.currentUser = firebaseUser;
        if (firebaseUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/privateData',
                    headers: {
                        id_token: idToken
                    }
                }).then(function(response) {
                        data.currentUser.authIdToken = idToken;
                        // console.log('Current user reauthorized:', data.currentUser);
                        return;
                    },
                    function(err) {
                        console.log('Current user not reauthorized:', err);
                        return;
                    });
            });
        } else {
            console.log('Not logged in or not authorized.');
            data.currentUser = {};
        }
    });


    var publicApi = {
        data: data,
        getIdToken: function() {
            return getIdToken();
        },
        logIn: function() {
            return logIn();
        },
        logOut: function() {
            return logOut();
        },
        getcurrentUser: function() {
            return getCurrentUser();
        }
    };

    return publicApi;

}); // END: AuthFactory
