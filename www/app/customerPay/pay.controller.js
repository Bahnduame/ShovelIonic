angular.module('starter')
.controller('PayCtrl',function($rootScope, $scope, $state, $http, userData, apptData){

  // cost of cleaning a driveway
  $scope.amount = 35;
  console.log("userdata :",userData.getName());
  $scope.tip = {};
  $scope.total= function(){
    return (35 + Number($scope.tip.val)) || 35;
  }
  $scope.confirm = function(){
    var appt=apptData.getAppointmentData();
    console.log("appt",appt);
    console.log('userID',userID.getID());
    console.log('shovlerID',shovlerID);


          //upon successful update to user, charge user through express server
      $http.post(paulServer+'/charge', {userId: userID.getID(), shovlerID: appt.getShovlerID(), amount: $scope.total()})
        .success(function(data,status,headers,config){
          console.log("http success")
          $state.go('app.review');
        }).error(function(data,status){
          console.log("data :"+data);
          console.log("staus :"+status);
        });
  }
});