angular.module('starter')
.controller('SelfieCtrl',function($rootScope, $scope, $state, $cordovaCamera){

$scope.takePicture = function() {
    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

                      //      ref.child('appointments').child(<appointmentID>).update({"photo":<data>}, function(){
		// 	<whatever you want TO do IN the callback>
		// });

    }, function(err) {
      // An error occured. Show a message to the user
    });
  }



});