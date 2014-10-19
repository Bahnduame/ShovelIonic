angular.module('starter')
.controller('ServiceListCtrl', function($scope, $state) {
  // debugger;

  $scope.goToStylists = function(){
      $state.go('app.address');
  }
});