angular.module('starter')
.controller('ReviewCtrl',function($rootScope, $scope,$firebaseSimpleLogin, $state, $timeout){
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.shows = [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}];

  $scope.submitReview = function(index){
  	for (var i = 0; i < index+1; i++){
  		$scope.shows[i].val = true;
  	}

    	$timeout(function(){
    		$scope.auth.$logout();
    	}, 2000);

  };

});