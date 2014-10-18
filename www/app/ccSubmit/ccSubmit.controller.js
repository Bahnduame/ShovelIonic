angular.module('starter')
.controller('ccSubmitCtrl',function($rootScope, $scope, $state, $window, $http, userData){

	$window.Stripe.setPublishableKey('pk_test_YrwJF0909Ps1AGMJpYGlYd6J');

    $scope.handleStripe = function(status, response){
        if(response.error) {
          // there was an error. Fix it.
          console.log("error: " + response.error)

        } else {
          var token = response.id;
          console.log("token: " + token);

          // got stripe token, now send it to express server for processing
          $http.post(paulServer+'/', {stripeToken: token, userId: userData.getID()})
            .success(function(data,status,headers,config){

              //on successful update return to confirm booking page
              $state.go('app.confirmBooking')
            }).error(function(data,status){
              console.log("data :"+data);
              console.log("staus :"+status);
            });
        }
    }

});