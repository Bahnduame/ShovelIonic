angular.module('starter')
.controller('AddUserDataCtrl',function($rootScope, $scope, $firebaseSimpleLogin, $state, userData){
  $scope.addData = {}
  $scope.username = userData.getName();
  $scope.updateUser = function(){
    console.log("userId at updateUser : ",userData.getID());
      //take updated User Data
      userData.setPhone($scope.addData.phone);
      ref.child('users').child(userData.getID())
        .update({"phone": $scope.addData.phone, "email":$scope.addData.email, "shovler":$scope.addData.shovler}, function(){
          //after successful update go to services page
          if($scope.addData.shovler){
            $state.go('app.shovlerDashboard');
          }else{
            $state.go('app.address');
          }
        });
    };

});