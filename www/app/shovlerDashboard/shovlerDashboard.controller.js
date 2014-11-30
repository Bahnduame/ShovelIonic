angular.module('starter')
.controller('ShovlerDashboardCtrl',function($scope, $state, userData, apptData){
    $scope.appointments= {};
    $scope.available = userData.getProperty('available');

    // listen to changes in available, if it changes modify it in Firebase
    

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