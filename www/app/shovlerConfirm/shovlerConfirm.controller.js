angular.module('starter')
.controller('ShovlerConfirmCtrl',function($scope,$http, $state, $firebase, userData,apptData){

        apptData.setShovlerID(userData.getID());
        apptData.setShovler(userData.getName());
        $scope.appt=apptData.getAppointmentData();
        $scope.appt.status="accepted";
        console.log("appt data confirm :",$scope.appt);
        console.log("client ID :",apptData.getClientID())
        var apptID;

        $scope.marker = [];

        $scope.marker.latitude=$scope.appt.address.lat;
        $scope.marker.longitude=$scope.appt.address.lon;

        $scope.map = {
            center: {
                latitude: $scope.appt.address.lat,
                longitude: $scope.appt.address.lon
            },
            zoom: 18,
            options:{
                disableDefaultUI: true,
                draggable: false,
            }
        };

        $scope.acceptJob = function(){
            console.log("phone :",userData.getPhone())
            console.log("client name :",apptData.getClient())
            console.log("name :",userData.getName());
            apptID = apptData.getID();

            $http.post(paulServer+'/job',{phone:userData.getPhone(),shovlerName:userData.getName(), clientName: apptData.getClient(), status:"accepted"}).success(function(obj){
                   ref.child('appointments').child(apptID).update($scope.appt,$scope.addApptToShovler()
                    );
            });
        };

        $scope.addApptToShovler = function(){
            ref.child('users').child(userData.getID()).child('appointments').child(apptID).update($scope.appt,$scope.updateClientAppt());
        }

        $scope.updateClientAppt = function(){
            ref.child('users').child(apptData.getClientID()).child('appointments').child(apptID).update($scope.appt,function(snapshot){
                            $state.go("app.finishShovel")
                        }
                );
        }
});