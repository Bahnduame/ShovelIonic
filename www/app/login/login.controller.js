angular.module('starter')
    .controller('LoginCtrl', function($rootScope, $scope, $firebase, $firebaseSimpleLogin, $state, userData, apptData) {

        var auth = $firebaseSimpleLogin(ref);

        // When user clicks login
        $scope.login = function(provider) {
            console.log("in login function");

            auth.$login(provider, {rememberMe: true, scope: "email"}).then(function(userOAuthData){

                var tpUser = userOAuthData.thirdPartyUserData;
                userData.setID(userOAuthData.uid);
                userData.setName(tpUser.first_name || tpUser.given_name);

                // grabs user info from firebase
                ref.child('users').child(userOAuthData.uid).once('value',function(snapshot){
                    user = snapshot.val();

                    //update user in Firebase, but not email or name if they exist
                    updatedUserData = {gender:tpUser.gender,age_range:tpUser.age_range || null};
                    if(!user || !user.email){
                        updatedUserData.email = tpUser.email
                    }
                    if(!user || !user.name){
                        updatedUserData.name = {
                            first:tpUser.first_name || tpUser.given_name,
                            last:tpUser.last_name || tpUser.family_name
                         }
                    }
                    ref.child('users').child(userOAuthData.uid).update(updatedUserData);

                    //check for an appt with status of completed
                    if(user && user.appointments){
                         for(var key in user.appointments){
                            if(user.appointments[key].status === 'accepted' && user.shovler){
                                apptData.setAppointmentData(user.appointments[key]);
                                $state.go('app.finishShovel');
                            }else if(user.appointments[key].status === 'finished' && !user.shovler){
                                apptData.setAppointmentData(user.appointments[key]);
                                $state.go('app.pay');
                            }
                        }
                    }


                    if(user.type === 'shovler'){
                        $state.go('app.shovlerDashboard');
                    }
                    // if appointment has been completed, go to selfie page
                    else if(completedAppointment){
                        $state.go('selfie');
                    }

                    // if we are missing phone number, go to addUserData page
                    else if(!user || !user.phone || !user.email){
                        $state.go('addUserData');
                    }

                  // otherwise, go to address page
                  else if(user.shovler){
                    $state.go('app.shovlerDashboard')
                  }else{
                    $state.go('app.services');
                  }

              }); //ref child
            }); // auth login
        }; // login



        // when login happens, set the User ID
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        //     console.log("login event: ", user);

        //     // create an open listener for changes in appointment status
        ref.child('users').child(userData.getID()).on('value',function(snapshot){
                user = snapshot.val();
                if(user && user.appointments){
                     for(var key in user.appointments){
                        if(user.appointments[key].status === 'accepted' && user.shovler){
                            apptData.setAppointmentData(user.appointments[key]);
                            $state.go('app.finishShovel');
                        }else if(user.appointments[key].status === 'finished' && !user.shovler){
                            apptData.setAppointmentData(user.appointments[key]);
                            $state.go('app.pay');
                        }
                    }
                }
            });
        });


  // // when logout happens, clear cookies, and go to login
  $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
    // console.log($state);
    //clear out userData and apptData
    // window.cookies.clear(function() {
    //     console.log("Cookies cleared!");
    // });

    $state.go('login');
  });

    // ///////////////////////////////////////////////////////////////////
  $scope.goToTest = function(){
    $state.go('review');
  }

  // ///////////////////////////////////////////////////////////////////////

}); // controller
