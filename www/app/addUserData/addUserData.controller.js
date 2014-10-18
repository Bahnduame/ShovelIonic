angular.module('starter')
.controller('AddUserDataCtrl',function($rootScope, $scope, $firebaseSimpleLogin, $state, userData){
  $scope.phoneNum = {};

  console.log("userData ID at addUserData :", userData.getID());
  $scope.updateUser = function(){
    console.log("userId at updateUser : ",userData.getID());

    //take in phone number and update user in firebase
    ref.child('users').child(userData.getID())
      .update({"phone": $scope.phoneNum.val}, function(){

        //after successful update go to services page
        $state.go('app.address');
      });
  };
});