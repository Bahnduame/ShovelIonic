angular.module('starter')
.controller('StylistProfileCtrl',function($rootScope, $scope, $state,apptData){
  $scope.stylist = {};

  // Attach an asynchronous callback to read the data at our stylist reference
  ref.child('stylists').once('value', function (snapshot) {
    $scope.stylists = snapshot.val();
    $scope.stylist = $scope.stylists[apptData.getStylistID()];
    console.log($scope.stylist);
    $scope.$apply();
   }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  $scope.confirmAppointment = function(){
    $state.go('app.confirmBooking');
  }


});

