angular.module('starter')
.controller('FinishShovelCtrl',function($scope, $state, $http, $firebase, userData,apptData){

        var appt=apptData.getAppointmentData();
        var apptID;
        console.log("appointment",appt);
        console.log("userID",userData.getID())
        $scope.finishShovel = function(){
            apptID = apptData.getID();
            console.log(apptID);
            $http.post(paulServer+'/job',{phone:userData.getPhone(),shovlerName:userData.getName(), clientName: apptData.getClient(), status:"finished"}).success(function(obj){
                ref.child('appointments').child(apptID).update({status:"finished"},$scope.addApptToShovler()
                );
            });
        };

        $scope.addApptToShovler = function(){
            ref.child('users').child(userData.getID()).child('appointments').child(apptID)
                .update({status:"finished"},$scope.updateClientAppt());
        }

        $scope.updateClientAppt = function(){
            ref.child('users').child(apptData.getClientID()).child('appointments').child(apptID)
                .update({status:"finished"},
                        function(snapshot){
                            $state.go("app.shovlerDashboard")
                        }
                );
        }
});