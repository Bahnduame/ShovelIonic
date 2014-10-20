angular.module('starter')
.controller('PayCtrl',function($rootScope, $scope, $state, $http, userData, apptData){

  // cost of cleaning a driveway
  $scope.amount = 35;


  $scope.confirm = function(){
    var appt=apptData.getAppointmentData();

          //upon successful update to user, charge user through express server
      $http.post(paulServer+'/charge', {userId: userID.getID(), shovlerID: appt.getShovlerID(), amount: $scope.amount})
        .success(function(data,status,headers,config){
          console.log("http success")
          $state.go('main.confirmBooking')
        }).error(function(data,status){
          console.log("data :"+data);
          console.log("staus :"+status);
        });

          $state.go('app.review');
  }
});