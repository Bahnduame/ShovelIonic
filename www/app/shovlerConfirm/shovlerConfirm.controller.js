angular.module('starter')
.controller('ShovlerConfirmCtrl',function($scope, $firebase, userData,apptData){
        $scope.appt=apptData.getAppointmentData();
        console.log("appt data confirm :",$scope.appt);


        $scope.marker = [];

        $scope.marker.latitude=$scope.appt.address.lat;
        $scope.marker.longitude=$scope.appt.address.lon;

        $scope.map = {
            center: {
                latitude: $scope.appt.address.lat,
                longitude: $scope.appt.address.lon
            },
            zoom: 15,
            draggable: false
        };

});