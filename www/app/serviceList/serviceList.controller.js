angular.module('starter')
.controller('ServiceListCtrl', function($scope, $rootScope, $firebase, $firebaseSimpleLogin, $state, apptData) {
  // debugger;
  $scope.auth = $firebaseSimpleLogin(ref);

  //link services in app to service list on firebase
  ref.child('services').on('value', function (snapshot) {
    $scope.services = snapshot.val();
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });


////////////////////////////////////////////////////////////////////
  var findService = function(ref){
    //loop through all services and either initialize page or push to apptData
    for(var key in $scope.services){
        if ($scope.services.hasOwnProperty(key)){
          for (ser in $scope.services[key]) {

            if(ref === 'initialization'){
              for (var i = selectedServices.length - 1; i >= 0; i--) {
                if($scope.services[key][ser].name === selectedServices[i].name){
                  $scope.services[key][ser].sel=true;
                }
              }

            }else if(ref === 'continue'){
              if($scope.services[key][ser].sel === true){
                delete $scope.services[key][ser].sel;
                apptData.addService($scope.services[key][ser]);
              }
            }

          };
        }
    }
  }
//////////////////////////////////////////////////////////////////////////

  //upon arrival/return to page reselect services already associated with appointment
  var selectedServices = apptData.getServices();
  findService('initialization');


  $scope.selectService = function(cat, index){
    //using index and service category, find correct service and toggle selected status
    var keys = Object.keys($scope.services[cat]);
    var key = keys[index];
    if($scope.services[cat][key].sel){
      $scope.services[cat][key].sel = false;
    }else{
      $scope.services[cat][key].sel=true;

    }
  }

  $scope.goToStylists = function(){
    //loop through services and take all selected services and push to apptData
    findService('continue');

    //do not allow user to continue to next screen with no services selected
    // if(apptData.getTotalCost() === 0){
    //   alert("please select a service")
    // }else{
      $state.go('app.address');
    // }
  }

  $scope.logout = function() {
    $scope.auth.$logout();
  };
});