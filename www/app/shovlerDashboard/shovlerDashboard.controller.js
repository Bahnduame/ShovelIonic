angular.module('starter')

.controller('ShovlerDashboardCtrl',function($scope, $state, userData, apptData, usSpinnerService, $timeout, $cordovaGeolocation){

    $scope.available = { 
        value: userData.getProperty('available'),
        status: 'SLEEPING ON COUCH'
    };
    

    // listen to changes in available, if it changes modify it in Firebase    
    var updateAvailable = function(){
        usSpinnerService.spin('spinner-1');   
        var status = ($scope.available.value === true ? 'READY TO SHOVEL' : 'SLEEPING ON COUCH');

        $scope.available.status = status;

        availableObj = {
            available: $scope.available.value
        };

        // set local factory to current status
        userData.setProperty('available', $scope.available.value);

        ref.child('worker').child(userData.getID()).update(availableObj, function(err){
            usSpinnerService.stop('spinner-1');
        });
    }
    

    //store lat long of user in firebase every five minutes
    var updateLocation = function(){
        $cordovaGeolocation.getCurrentPosition().then(function (position) {
            var location = {};
            location.lat  = position.coords.latitude;
            location.long = position.coords.longitude;
            location.updated = new Date();

            ref.child('worker').child(userData.getID()).update({location: location}, function(err){
                usSpinnerService.stop('spinner-1');
            });

        });
    };


    $scope.$watch("available.value", function(newVal, oldVal) { 


        // update availability of worker in Firebase
        if (newVal !== oldVal){
            console.log('newVal ', newVal);
            updateAvailable();
        
            // update location of worker in Firebase every 5 minutes
            if (newVal === true){
                console.log('about to update location');
                updateLocation();

                $timeout(function(){
                    updateLocation();
                }, 3000000);
            }
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