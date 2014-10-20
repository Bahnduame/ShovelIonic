angular.module('starter')
.controller('ReviewCtrl',function($rootScope, $scope,$firebaseSimpleLogin, $state){
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.submitReview = function(){
    var review = {};
    review.body= $scope.review.body;
    // review.rating = $scope.review.rating;
  };

  $scope.logout = function() {
    $scope.auth.$logout();
  };
});