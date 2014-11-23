angular.module('starter')
.controller('ReviewCtrl',function($rootScope, $scope,$firebaseSimpleLogin, $state, $timeout, apptData){
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.shows = [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}];


  $scope.submitReview = function(index){
      
      // set the value for shows array so those snowflakes become highlighted using ng-show
  	for (var i = 0; i < index+1; i++){
  		$scope.shows[i].val = true;
  	}

      // calculate the rating
      var rating = index + 1;

      // insert the rating in appointment 
      var apptID = apptData.getAppointmentData().apptID;
      

      // store the rating in review property in appointments object
      ref.child('appointments').child(apptID)
        .update({review: rating});

      // logout after 2 seconds
    	$timeout(function(){
    	   $scope.auth.$logout();
    	}, 2000);

  };

});