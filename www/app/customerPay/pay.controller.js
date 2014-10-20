angular.module('starter')
.controller('PayCtrl',function($rootScope, $scope, $state, $http, userData, apptData){

  // cost of cleaning a driveway
  $scope.amount = 35;

  // set dataToConfirm = appt data for viewing
  $scope.dataToConfirm = apptData.getAppointmentData();
  console.log($scope.dataToConfirm)

  // check if user has stored cc information, if yes get the brand & last 4 digits
  $http.get(paulServer+'/'+userData.getID()).success(function(obj){
    $scope.last = obj.last;
    $scope.brand = obj.brand;
  });


  $scope.goToStripe = function(){
    // sends user to add/change credit card information
    $state.go("app.stripe");
  };

  $scope.goToAddress = function(){
    $state.go("app.address");
  };

  $scope.confirm = function(){

    //change status of appt to booked
    apptData.setStatus("booked");
    var appt=apptData.getAppointmentData();
    console.log("appt data",appt);
    //push appt to firebase
    var appointment = ref.child('appointments').push(appt, function(){
      var app = {};
      console.log(appointment);
      app.apptID=appointment.path.o[1];
      app.status="booked";

      //upon successful push to firebase, push apptID and status to user table as well
      ref.child('users').child(userData.getID()).child('appointments').push(app, function(){

          //upon successful update to user, charge user through express server
          // $http.post(paulServer+'/charge', {userId: userID.getID(), amount: apptData.getTotalCost.toString()})
          //   .success(function(data,status,headers,config){
          //     console.log("http success")
          //     $state.go('main.confirmBooking')
          //   }).error(function(data,status){
          //     console.log("data :"+data);
          //     console.log("staus :"+status);
          //   });

          $state.go('app.waiting');
      });
    });
  }
});