angular.module('starter')
.controller('AddUserDataCtrl',function($rootScope, $scope, $window, $state, userData, $http){

  $window.Stripe.setPublishableKey('pk_test_YrwJF0909Ps1AGMJpYGlYd6J');
  
  //var declaration
  $scope.addData = userData.getUserData();
  $scope.bank = {
    id: userData.getID(),
    name: '',
    account: '',
    routing: ''
  };
  

  // validate the text boxes
  var validate = function(){

  }


  // pop up an error msg if they fields are not filled in
  var popUpMsg = function(){

  }


  var updateUserData = function(){
      for (key in $scope.addData)
        userData.setProperty(key, $scope.addData[key]);
  }


  var createFirebaseObj = function(){
      var newObj = {
        name: '',
        phone: '',
        email: ''
      };

      for (key in newObj)
        newObj[key] = $scope.addData[key];

      return newObj;
  }


  // update user information (email, phone)
  $scope.updateUser = function(){

      // validation - if not pop up modal with what they are missing
      //validate();

      // update userData
      updateUserData();
      
      //create obj to insert into Firebase
      var newData = createFirebaseObj();

      ref.child(userData.getProperty('type')).child(userData.getID()).set(newData, function(err){
        
        if (err) console.log(err);

        if (userData.getProperty('type') === 'user')      
          $state.go('app.services');

        // do something if its a worker
        if (userData.getProperty('type') === 'worker')
          $state.go('addBankInfo');
        
      });
  };


    // get stripe token for bank account information
    $scope.updateBank = function(){
        console.log('routing', $scope.bank.routing.toString());
        console.log('account', $scope.bank.account);
        console.log('name', $scope.bank.name);



        // create token
        Stripe.bankAccount.createToken({
          country: 'US',
          routingNumber: $scope.bank.routing,
          accountNumber: $scope.bank.account,
        }, function (status, response) {

            // send stripe token to server, store Stripe recipient 
            $http.post(paulServer + 'bank', $scope.bank);
        });
    }

});