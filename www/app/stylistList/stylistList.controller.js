angular.module('starter')
.controller('StylistListCtrl',function($rootScope, $scope, $state, apptData){
  $scope.stylists = {};
  //clear stylist from apptData


  // Attach an asynchronous callback to read the data at our stylists reference
  ref.child('stylists').once('value', function (snapshot) {
    $scope.stylists = snapshot.val();
    // console.log($scope.stylists);
    if(!$scope.$$phase){
      $scope.$apply();
    }
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  //find correct stylist and add to apptData
  $scope.goToStylistProfile = function(index){
    var keys = Object.keys($scope.stylists);
    var stylistID = keys[index];
    apptData.setStylistID(stylistID);
    $state.go('app.stylistProfile')
  }
});