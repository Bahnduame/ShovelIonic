angular.module('starter')
    .controller('LoginCtrl', function($rootScope, $scope, $firebase, $state, userData, apptData) {

        //update userData with Firebase data
        var updateUserData = function(userFirebaseData){

            for (key in userFirebaseData)
                userData.setProperty(key, userFirebaseData[key]);

        };


        // insert new user into Firebase
        var createNewUser = function(provider, authData){     
            var userObj = {};

            userObj[authData.uid] = { 
                name: authData[provider].displayName,
                email: authData[provider].email
            } 
            
            return userObj[authData.uid];
        };
        
 
        // When user clicks login
        $scope.login = function(provider) {
            var counter = 0;
            var userOAuthData;
            var newUser = false;

            // log in all users
            ref.authWithOAuthPopup(provider, function(err, authData) {
                if (err)
                    console.log(err);
                
                else{
                    // set userID in factory
                    userData.setID(authData.uid);

                    // checks if user exists in Firebase, both user and worker collections
                    var exist = function(){
                        var userObj = null;

                        // check if its a user
                        ref.child('user').child(userData.getID()).once('value', function(snapshot){
                            userObj = snapshot.val();
                            counter++;

                            // if not a user, check if its a worker
                            if (!userObj){
                                ref.child('worker').child(userData.getID()).once('value', function(snapshot){
                                    userObj = snapshot.val();
                                    counter++;  
                                    redirect(userObj);                      
                                });
                            }

                            // then redirect the user where they should go
                            redirect(userObj);
                        });
                    }

                    // redirects the user, depending on new user, worker, or user
                    var redirect = function(userObj){
                         var newUser = false;

                         if ((counter === 1 && userObj) || counter === 2){

                            // if user does not exist, create new user
                            if (!userObj){
                                userObj = createNewUser(provider, authData);
                                newUser = true;
                            }

                            // update userData
                            updateUserData(userObj);

                            // if a new user, then get some more information
                            if (newUser)
                                $state.go('addUserData');

                            // else, figure out where to go
                            else{
                                var typeVal = (counter === 1 ? 'user' : 'worker');
                                userData.setProperty('type', typeVal);
                                
                                // if worker and do not have recipient id, send to bank account page
                                if (userData.getProperty('type') === 'worker'){

                                    // if worker does not have a recipient id
                                    if (userData.getProperty('recipientID') === '')
                                        $state.go('addBankInfo');
                                    
                                    // if worker has a recipient id
                                    else
                                        $state.go('app.shovlerDashboard');
                                }

                                // else if you are a user
                                else{
                                
                                    // if apptStatus is set to true, then send straight to payment page
                                    if (userData.getStatus() === 'completed')
                                        console.log('in if');

                                    // else, go to the weather page where you can book an appointment
                                    else{
                                        console.log('data ', userData.getUserData());
                                        $state.go('app.services');
                                    }

                                }
                            }
                         }
                    }

                    // check if the user exists in Firebase
                    exist();
                }

            }, {scope: 'email'});
        }

    });// controller


