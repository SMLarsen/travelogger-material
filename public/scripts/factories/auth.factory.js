app.factory("AuthFactory", function($firebaseAuth, $http) {
    console.log('AuthFactory started');
    var auth = $firebaseAuth();

    var currentUser = {};
    var newUser = {};
    var loginUser = {};
    var authIdToken = '';
    var isUserLoggedIn = false;

    // Authenticates user at login
    logIn = function() {
        // if (currentUser) {
            return auth.$signInWithPopup("google").then(function(firebaseUser) {
                console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
                currentUser = firebaseUser;
                isUserLoggedIn = true;
                return currentUser;
            }).catch(function(error) {
                console.log("Authentication failed: ", error);
            });
        // } else {
        //     return;
        // }
    }; // END: logIn

    // Runs when user changes authentication states (logs in or out)
    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        console.log('State changed - currentUser:', currentUser);
        console.log('State changed - firebaseUser:', firebaseUser);
        console.log('currentUser true? ', currentUser === true);
        if (currentUser !== false) {
          currentUser = firebaseUser;
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                return $http({
                    method: 'GET',
                    url: '/privateData',
                    headers: {
                        id_token: idToken
                    }
                }).then(function(response) {
                        loginUser.authIdToken = idToken;
                        loginUser.id = response.data._id;
                        isUserLoggedIn = true;
                        console.log('current user authorized', currentUser.email, isUserLoggedIn);
                    },
                    function(err) {
                        isUserLoggedIn = false;
                        console.log('current user not registered', err);
                    });
            });
        } else {
            console.log('Not logged in or not authorized.');
            currentUser = {};
            isUserLoggedIn = false;
        }
    }); // End $onAuthStateChanged

    // Function handles user log out
    logOut = function() {
        return auth.$signOut().then(function() {
            isUserLoggedIn = false;
            console.log('Logging the user out!');
        });
    }; // END: logOut

    // Function get idToken
    getIdToken = function() {
        console.log('getIdToken currentUser', currentUser);
        if (currentUser) {
            // This is where we make our call to our server
            return currentUser.getToken().then(function(idToken) {
                    authIdToken = idToken;
                    console.log('got current user idToken:', currentUser.email);
                    return loginUser;
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
        getLoginUser: function() {
            return loginUser;
        }
    };

    return publicApi;

}); // END: AuthFactory
