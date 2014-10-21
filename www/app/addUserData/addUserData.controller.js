angular.module('starter')
.controller('AddUserDataCtrl',function($rootScope, $scope, $firebaseSimpleLogin, $state, userData){
  $scope.addData = {}
  $scope.username = userData.getName();
  $scope.updateUser = function(){
    console.log("userId at updateUser : ",userData.getID());
      //take updated User Data
      userData.setPhone($scope.addData.phone);
      if($scope.addData.shovler=== undefined){
        $scope.addData.shovler=false;
      }
      ref.child('users').child(userData.getID())
        .update({"phone": $scope.addData.phone, "email":$scope.addData.email, "shovler":$scope.addData.shovler}, function(){
              if($scope.addData.shovler){
                  ref.child('shovlers').push({"phone": $scope.addData.phone, "email":$scope.addData.email, "name":$scope.username},function(){
                        $state.go('app.shovlerDashboard');
                  });
              }else{
                $state.go('app.address');
              }
        });
    };

});