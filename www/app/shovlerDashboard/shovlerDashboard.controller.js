angular.module('starter')

.controller('ShovlerDashboardCtrl',function($scope, $state, userData, apptData, usSpinnerService, $timeout){

    $scope.available = { value: false };
    

    // listen to changes in available, if it changes modify it in Firebase    
    var updateAvailable = function(){
        usSpinnerService.spin('spinner-1');   

        availableObj = {
            available: $scope.available.value
        };

        ref.child('worker').child(userData.getID()).update(availableObj, function(err){
            usSpinnerService.stop('spinner-1');
        });
    }
    

    $scope.$watch("available.value", function(newVal, oldVal) { 

        if (newVal !== oldVal){
            updateAvailable();
        }
    });


    ref.child('appointments').on('value',function(snapshot){
        var allAppointments = snapshot.val();
        console.log(allAppointments)
         for(var key in allAppointments){
            if(allAppointments[key].status === 'booked'){
                $scope.appointments[key]=allAppointments[key];
                $scope.appointments[key].id=key;
            }
        }
        console.log("appointments",$scope.appointments)
    });

    $scope.checkRequest = function(appointment){
        //go to appointment lookup
        apptData.setAppointmentData(appointment);
        $state.go('app.shovlerConfirm')
    }

});