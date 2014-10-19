angular.module('starter')
.controller('ServiceListCtrl', function($scope, $state, userData, apptData) {
  // debugger;

  $scope.goToStylists = function(){
    apptData.setClient(userData.getName());
    apptData.setClientID(userData.getID());
    $state.go('app.address');
  }
});