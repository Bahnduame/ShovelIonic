angular.module('starter')
.controller('AddUserDataCtrl',function($rootScope, $scope, $firebaseSimpleLogin, $window, $state, userData){

  $window.Stripe.setPublishableKey('pk_test_YrwJF0909Ps1AGMJpYGlYd6J');
  //var declaration
  $scope.addData = {}
  $scope.username = userData.getName();
  $scope.bank = {};


  // update user information (email, phone)
  $scope.updateUser = function(){
    console.log("userId at updateUser : ",userData.getID());

      // take updated User Data
      userData.setPhone($scope.addData.phone);
      if($scope.addData.shovler=== undefined){
        $scope.addData.shovler=false;
      }

      // update phone and email fields to firebase
      ref.child('users').child(userData.getID())
        .update({"phone": $scope.addData.phone, "email":$scope.addData.email, "shovler":$scope.addData.shovler}, function(){
              if($scope.addData.shovler){
                  ref.child('shovlers').push({"phone": $scope.addData.phone, "email":$scope.addData.email, "name":$scope.username},function(){
                        $state.go('addBankInfo');
                  });
              }else{
                $state.go('app.address');
              }
        });

    };


    // get stripe token for bank account information
    $scope.updateBank = function(){

        // create token
        Stripe.bankAccount.createToken({
          country: 'US',
          routingNumber: $scope.bank.routing,
          accountNumber: $scope.bank.account
        }, function (status, response) {

            // response contains id and card, which contains additional card details
            var token = response.id;

             ref.child('user').push({"phone": $scope.addData.phone, "email":$scope.addData.email, "name":$scope.username},function(){
                        $state.go('app.shovlerDashboard');
                  });


        });
    }

});