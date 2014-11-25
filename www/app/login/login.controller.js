angular.module('starter')
    .controller('LoginCtrl', function($rootScope, $scope, $firebase, $state, userData, apptData) {

        //update userData with Firebase data
        var updateUserData = function(userFirebaseData){
            userData.setName(userFirebaseData.name);
            userData.setEmail(userFirebaseData.email);
            lastAppt = userFirebaseData.appointments;
            ccInfo = userFirebaseData.ccInfo;

            if (lastAppt)
                userData.setStatus(lastAppt.pop().status);

            if (ccInfo)
                userData.setCCInfo(ccInfo);

            console.log('userdata: ', userData.getUserData());
        };


        // insert new user into Firebase
        var insertNewUser = function(provider, authData){     
            var userObj = {};

            userObj[authData.uid] = { 
                name: authData[provider].displayName,
                email: authData[provider].email
            } 
            
            ref.set({ 'users': userObj });

            return userObj[authData.uid];
        };


        // When user clicks login
        $scope.login = function(provider) {
            var userOAuthData;

            // log in all users
            ref.authWithOAuthPopup(provider, function(err, authData) {
                if (err)
                    console.log(err);
                
                else{
                    // set userID in factory
                    userData.setID(authData.uid);
                    
                    // check if user has logged in before by checking if the userID exists in Firebase
                    ref.child('users').child(userData.getID()).once('value', function(snapshot){
                        var userObj = snapshot.val();

                        // if user does not exist, insert into firebase
                        if (!userObj)
                            userObj = insertNewUser(provider, authData);

                        // update userData
                        updateUserData(userObj);
                    });

                    
                    // if apptStatus is set to true, then send straight to payment page
                    if (userData.getStatus() === 'completed')
                        //go to pay page,
                        console.log('in if');

                    else
                        // go to weather page
                        $state.go('app.services');
                }

            }, {scope: 'email'});
        }

    });// controller



//             auth.$login(provider, {rememberMe: true, scope: "email"}).then(function(userOAuthData){
//                 console.log("1");                
            
//                 // not sure what this does?
//                 var tpUser = userOAuthData.thirdPartyUserData;
//                 userData.setID(userOAuthData.uid);
//                 userID=userOAuthData.uid;
                

//                 // grabs user info from firebase
//                 ref.child('users').child(userOAuthData.uid).once('value',function(snapshot){
//                     console.log("2");
//                     user = snapshot.val();

//                     //update user in Firebase, but not email or name if they exist
//                     updatedUserData = {gender:tpUser.gender,age_range:tpUser.age_range || null};
                    
//                     if(!user || !user.email){
//                         updatedUserData.email = tpUser.email
//                     }


//                     if(!user || !user.name){
//                         updatedUserData.name = {
//                             first:tpUser.first_name || tpUser.given_name,
//                             last:tpUser.last_name || tpUser.family_name
//                          }
//                          userData.setName(tpUser.first_name || tpUser.given_name);
//                     }else{
//                         userData.setName(user.name.first)
//                     }
                    

//                     if(user && user.phone){
//                         userData.setPhone(user.phone);
//                     }

                    
//                     ref.child('users').child(userOAuthData.uid).update(updatedUserData);
//                     console.log("3");

//                     var acceptedAndShovler = function(status, isShovler){
//                         return (status === 'accepted' && isShovler);
//                     }
//                     var finishedAndCustomer = function(status, isShovler){
//                         return (status === 'finished' && (!isShovler));
//                     }
//                     if(user && user.appointments){
//                         for(var key in user.appointments){
//                             var shovler = user.shovler;
//                             var appStatus = user.appointments[key].status;
//                             if(acceptedAndShovler(appStatus,shovler)){
//                                 apptData.setAppointmentData(user.appointments[key]);
//                                  $state.go('app.finishShovel');
//                             }else if(finishedAndCustomer(appStatus,shovler)){
//                                 console.log("2")
//                                 apptData.setAppointmentData(user.appointments[key]);
//                                 $state.go('app.pay');
//                             }
//                         }

//                     }else{
//                             console.log("4");
//                             if(user && user.type === 'shovler'){
//                                 $state.go('app.shovlerDashboard');
//                             }

//                             // if we are missing phone number, go to addUserData page
//                             else if(!user || !user.phone || !user.email){
//                                 $state.go('addUserData');
//                             }

//                           // otherwise, go to address page
//                           else if(user.shovler){
//                             $state.go('app.shovlerDashboard')
//                           }else{
//                             $state.go('app.services');
//                           }
//                     }

//               }); //ref child
//             }); // auth login
//         }; // login



//         // when login happens, set the User ID
//     $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
//         // create an open listener for changes in appointment status
//         // ref.child('users').child(user.uid).on('value',function(snapshot){
//         //     user = snapshot.val();
//         //     console.log(user);
//         //     userData.setName(user.name.first);
//         //     userData.setPhone(user.phone);
//         //     userData.setID(user.id);
//         //     if(user && user.appointments){
//         //          for(var key in user.appointments){
//         //             if(user.appointments[key].status === 'accepted' && user.shovler){
//         //                 console.log("login appt data:",apptData)
//         //                 apptData.setAppointmentData(user.appointments[key]);
//         //                 $state.go('app.finishShovel');
//         //             }else if(user.appointments[key].status === 'finished' && !user.shovler){
//         //                 apptData.setAppointmentData(user.appointments[key]);
//         //                 $state.go('app.pay');
//         //             }
//         //         }
//         //     }
//         // });
//     });


//   // // when logout happens, clear cookies, and go to login
//   $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
//     // console.log($state);
//     //clear out userData and apptData
//     // window.cookies.clear(function() {
//     //     console.log("Cookies cleared!");
//     // });
//     console.log("logout event listener hit")
//     $state.go('login');
//   });

//     // ///////////////////////////////////////////////////////////////////
//   $scope.goToTest = function(){
//     $state.go('review');
//   }

//   // ///////////////////////////////////////////////////////////////////////

// }); // controller
