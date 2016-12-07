app.factory("AuthFactory", function($firebaseAuth, $http) {
    console.log('AuthFactory started');
    var auth = $firebaseAuth();

    var currentUser = {};
    var newUser = {};
    var authIdToken = '';

    // Authenticates user at login
    logIn = function() {
        return auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
            currentUser = firebaseUser;
            return currentUser;
        }).catch(function(error) {
            console.log("Authentication failed: ", error);
        });
    }; // END: logIn

    // Runs when user changes authentication states (logs in or out)
    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        currentUser = firebaseUser;
        // console.log('State changed - currentUser:', currentUser);
        if (currentUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/privateData',
                    headers: {
                        id_token: idToken
                    }
                }).then(function(response) {
                        authIdToken = idToken;
                        // console.log('id token:', authIdToken);
                        console.log('current user authorized', currentUser.email);
                    },
                    function(err) {
                        console.log('current user not registered', err);
                    });
            });
        } else {
            console.log('Not logged in or not authorized.');
            currentUser = {};
        }
    }); // End $onAuthStateChanged

    // Function handles user log out
    logOut = function() {
        return auth.$signOut().then(function() {
            console.log('Logging the user out!');
        });
    }; // END: logOut

    var publicApi = {
      currentUser: currentUser,
      idToken: authIdToken,
      logIn: function() {
        return logIn();
      },
      logOut: function() {
        return logOut();
      }
    };

    return publicApi;

}); // END: AuthFactory
