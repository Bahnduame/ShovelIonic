angular.module('starter')
.controller('AppointmentsCtrl',function($scope, $firebase, userData){
    $scope.appointments= [];
    ref.child('appointments').once('value',function(snapshot){
        var allAppointments = snapshot.val();
         for(var key in allAppointments){
            if(allAppointments[key].userID === userData.getID()){
                $scope.appointments.push(allAppointments[key]);
            }
        }
    });

});