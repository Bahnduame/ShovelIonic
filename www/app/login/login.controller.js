angular.module('starter')
    .controller('LoginCtrl', function($rootScope, $scope, $firebase, $firebaseSimpleLogin, $state, userData, apptData) {

        var auth = $firebaseSimpleLogin(ref);
        var userID;
        // When user clicks login
        $scope.login = function(provider) {
            console.log("in login function");

            auth.$login(provider, {rememberMe: true, scope: "email"}).then(function(userOAuthData){
                console.log("1");                
                var tpUser = userOAuthData.thirdPartyUserData;
                userData.setID(userOAuthData.uid);
                userID=userOAuthData.uid;
                // grabs user info from firebase
                ref.child('users').child(userOAuthData.uid).once('value',function(snapshot){
                    console.log("2");
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
                         userData.setName(tpUser.first_name || tpUser.given_name);
                    }else{
                        userData.setName(user.name.first)
                    }
                    if(user && user.phone){
                        userData.setPhone(user.phone);
                    }
                    ref.child('users').child(userOAuthData.uid).update(updatedUserData);
                    console.log("3");

                    var acceptedAndShovler = function(status, isShovler){
                        return (status === 'accepted' && isShovler);
                    }
                    var finishedAndCustomer = function(status, isShovler){
                        return (status === 'finished' && (!isShovler));
                    }
                    if(user && user.appointments){
                        for(var key in user.appointments){
                            var shovler = user.shovler;
                            var appStatus = user.appointments[key].status;
                            if(acceptedAndShovler(appStatus,shovler)){
                                apptData.setAppointmentData(user.appointments[key]);
                                 $state.go('app.finishShovel');
                            }else if(finishedAndCustomer(appStatus,shovler)){
                                console.log("2")
                                apptData.setAppointmentData(user.appointments[key]);
                                $state.go('app.pay');
                            }
                        }

                    }else{
                            console.log("4");
                            if(user && user.type === 'shovler'){
                                $state.go('app.shovlerDashboard');
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
                    }

              }); //ref child
            }); // auth login
        }; // login



        // when login happens, set the User ID
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        // create an open listener for changes in appointment status
        // ref.child('users').child(user.uid).on('value',function(snapshot){
        //     user = snapshot.val();
        //     console.log(user);
        //     userData.setName(user.name.first);
        //     userData.setPhone(user.phone);
        //     userData.setID(user.id);
        //     if(user && user.appointments){
        //          for(var key in user.appointments){
        //             if(user.appointments[key].status === 'accepted' && user.shovler){
        //                 console.log("login appt data:",apptData)
        //                 apptData.setAppointmentData(user.appointments[key]);
        //                 $state.go('app.finishShovel');
        //             }else if(user.appointments[key].status === 'finished' && !user.shovler){
        //                 apptData.setAppointmentData(user.appointments[key]);
        //                 $state.go('app.pay');
        //             }
        //         }
        //     }
        // });
    });


  // // when logout happens, clear cookies, and go to login
  $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
    // console.log($state);
    //clear out userData and apptData
    // window.cookies.clear(function() {
    //     console.log("Cookies cleared!");
    // });
    console.log("logout event listener hit")
    $state.go('login');
  });

    // ///////////////////////////////////////////////////////////////////
  $scope.goToTest = function(){
    $state.go('review');
  }

  // ///////////////////////////////////////////////////////////////////////

}); // controller
