angular.module('starter')
.controller('ccSubmitCtrl',function($rootScope, $scope, $state, $window, $http, userData){

    $window.Stripe.setPublishableKey('pk_test_YrwJF0909Ps1AGMJpYGlYd6J');

    $scope.handleStripe = function(status, response){
        if(response.error) {
          console.log("error: " + response.error)
        } 

        else {
          // customer token is returned by Stripe
          var token = response.id;

          // now send it to express server for processing
          $http.post(paulServer, {stripeToken: token, userId: userData.getID()})
            .success(function(data,status,headers,config){

              //on successful update return, store cc info locally and send back to confirm booking page
              userData.setCCInfo(data);
              $state.go('app.confirmBooking')

            }).error(function(data, status){
              console.log("data: " + data);
              console.log("staus: " + status);
            });
        }
    }

});