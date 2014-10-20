angular.module('starter')
.controller('FinishShovelCtrl',function($scope, $state, $firebase, userData,apptData){

        var appt=apptData.getAppointmentData();
        var apptID;
        $scope.finishShovel = function(){
            apptID = apptData.getID();
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