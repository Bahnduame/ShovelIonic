angular.module('starter')
.controller('ConfirmBookingCtrl',function($rootScope, $scope, $state, $http, userData, apptData){

  // cost of cleaning a driveway
  $scope.amount = 35;
  
  // set dataToConfirm = appt data for viewing
  $scope.dataToConfirm = apptData.getAppointmentData();
  console.log($scope.dataToConfirm);

  // check if they've entered cc info before
  $scope.doWeHaveCCInfo = function(){
    var ccInfo = userData.getCCInfo();

    if (ccInfo){
      $scope.last = ccInfo.lastFour;
      $scope.brand = ccInfo.brand;
      return true;
    }

    return false;
  }
  

  // sends user to add/change credit card information
  $scope.goToStripe = function(){
    $state.go("app.stripe");
  };


  $scope.goToAddress = function(){
    $state.go("app.address");
  };


  // confirm the appt
  $scope.confirm = function(){

    // set status in userData & apptData


    //change status of appt to booked
    apptData.setStatus("booked");

    // get all the data from the apptData factory
    var appt = apptData.getAppointmentData();

    console.log("appt data", appt);
    
    //push appt to firebase
    var appointment = ref.child('appointments').push(appt, function(data){

      var app = appt;
      console.log(appointment);
      app.apptID = appointment.path.o[1];

      //upon successful push to firebase, push apptID and status to user table as well
      ref.child('users').child(userData.getID()).child('appointments').child(app.apptID).update(app, function(){
          $state.go('app.waiting');
      });

    });
  }

});