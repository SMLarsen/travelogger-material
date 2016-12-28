app.factory("AuthFactory", function($firebaseAuth, $http) {
    console.log('AuthFactory started');
    var auth = $firebaseAuth();

    var currentUser = {};
    var newUser = {};
    var isUserLoggedIn = false;

    // Authenticates user at login
    logIn = function() {
        return auth.$signInWithPopup("google")
            .then(function(firebaseUser) {
                console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
                currentUser = firebaseUser.user;
                isUserLoggedIn = true;
                // console.log('currentUser', currentUser);
                // This is where we make our call to our server
                return currentUser.getToken()
                    .then(function(idToken) {
                        return $http({
                                method: 'GET',
                                url: '/privateData',
                                headers: {
                                    id_token: idToken
                                }
                            })
                            .then(function(response) {
                                    currentUser.authIdToken = idToken;
                                    currentUser.id = response.data._id;
                                    isUserLoggedIn = true;
                                    console.log('current user authorized', currentUser.id, isUserLoggedIn);
                                    return currentUser;
                                },
                                function(err) {
                                    isUserLoggedIn = false;
                                    console.log('current user not registered', err);
                                    return;
                                })
                            .catch(function(error) {
                                console.log("Authentication failed: ", error);
                            });
                    });
            });
    }; // END: logIn

    // Function handles user log out
    logOut = function() {
        return auth.$signOut().then(function() {
            isUserLoggedIn = false;
            console.log('Logging the user out!');
        });
    }; // END: logOut

    // Function get idToken
    getIdToken = function() {
        // console.log('getIdToken currentUser', currentUser);
        if (currentUser) {
            // This is where we make our call to our server
            return currentUser.getToken().then(function(idToken) {
                    currentUser.authIdToken = idToken;
                    console.log('got current user idToken:', currentUser.email);
                    return currentUser;
                },
                function(err) {
                    console.log('current user not registered', err);
                    return;
                });
        } else {
            return;
        }
    }; // End getIdToken

    var publicApi = {
        currentUser: currentUser,
        isUserLoggedIn: isUserLoggedIn,
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
            return currentUser;
        }
    };

    return publicApi;

}); // END: AuthFactory
