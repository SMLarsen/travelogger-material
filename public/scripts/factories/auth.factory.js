/*jshint esversion: 6 */
app.factory("AuthFactory", function($firebaseAuth, $http) {
    console.log('AuthFactory started');

    const auth = $firebaseAuth();

    let data = {
        currentUser: firebase.auth().currentUser
    };

    if (data.currentUser) {
        data.isUserLoggedIn = true;
    } else {
        data.isUserLoggedIn = false;
    }

    // Authenticates user at login
    logIn = function() {
        return auth.$signInWithPopup("google")
            .then((firebaseUser) => {
                console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
                data.currentUser = firebaseUser.user;
                return data.currentUser.getToken()
                    .then((idToken) => {
                        return $http({
                                method: 'GET',
                                url: '/privateData',
                                headers: {
                                    id_token: idToken
                                }
                            })
                            .then((response) => {
                                data.currentUser.authIdToken = idToken;
                                data.currentUser.id = response.data._id;
                                data.isUserLoggedIn = true;
                                console.log('current user authorized', data.currentUser, data.isUserLoggedIn);
                                return;
                            })
                            .catch((error) => console.log("Authentication failed: ", error));
                    });
            });
    }; // END: logIn

    // Function handles user log out
    logOut = function() {
        return auth.$signOut()
            .then(() => {
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
                .then((idToken) => data.currentUser.authIdToken = idToken)
                .catch((err) => console.log('current user not registered', err));
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
            firebaseUser.getToken()
                .then((idToken) => {
                    $http({
                            method: 'GET',
                            url: '/privateData',
                            headers: {
                                id_token: idToken
                            }
                        })
                        .then((response) => {
                            data.currentUser.authIdToken = idToken;
                            console.log('currentUser:', data.currentUser.displayName)
                        })
                        .catch((err) => console.log('Current user not reauthorized:'));
                });
        } else {
            console.log('Not logged in or not authorized.');
            data.currentUser = {};
        }
        return;
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
