angular.module('starter')
.controller('ConfirmBookingCtrl',function($rootScope, $scope, $state, $http, userData, apptData){

  // cost of cleaning a driveway
  $scope.amount = 35;
  
  // set dataToConfirm = appt data for viewing
  $scope.dataToConfirm = apptData.getAppointmentData();

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


  var updateApptData = function(){
    // set status
    apptData.setStatus('booked');

    // set date
    var d = new Date();
    apptData.setDate(d);

    // set client (current user)
    apptData.setClient(userData.getName());
    apptData.setClientID(userData.getID());    
  }


  // confirm the appt
  $scope.confirm = function(){
    console.log('cc ', $scope.doWeHaveCCInfo());

    // check if they entered credit card information
    if (!$scope.doWeHaveCCInfo()){    
        $scope.goToStripe();
    }

    else{
        
        updateApptData();

        // get all the data from the apptData factory to insert into Firebase
        var appt = apptData.getAppointmentData();

        //push appt to Firebase, Firebase will give it a uniqueID
        var appointment = ref.child('appointments').push(appt, function(err){

          if (err) console.log(err);

          var key = appointment.key();

          //upon successful push to firebase, push apptID and status to user table as well
          var userApptObj = {
            id: key,
            status: 'booked'
          };

          ref.child('user').child(userData.getID()).child('currentAppt').set(userApptObj, function(){
              console.log('waiting');
              $state.go('app.waiting');
          });

        });
    }
  }

});


// booked(1), enroute(2), in-progress(3), completed (0)
