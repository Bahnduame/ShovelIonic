angular.module('starter')
//add cordova geolocation injection
.controller('AddAddressCtrl',function($scope, $state, $http, $cordovaGeolocation, userData, apptData){
	//$cordovaStatusbar.overlaysWebView(false);
	// StatusBar.overlaysWebView(false);

	$scope.address = {};

	$scope.logout = function() {
		$scope.loginObj.$logout();
	};

	$scope.confirmAddress = function($event){
		//take in address and userID from input fields and populate apptData
		apptData.setAddress($scope.address);
		$state.go('app.confirmBooking');
	};

		//get location and  populate address fields with best guess from google
		$cordovaGeolocation
	        .getCurrentPosition()
	        .then(function (position) {

	          var key = "AIzaSyD8M6WnaIBMsstF_L3qYa7kXCtI8-_k_R8";
	          var lat  = position.coords.latitude;
	          var longi = position.coords.longitude;
	          var latlng = lat + ',' + longi;
	          //latlng = "40.714224,-73.961452";

	          var url = 'https://maps.googleapis.com/maps/api/geocode/json' + '?latlng=' + latlng + '&key=' + key;
	          console.log(url);

	          $http.get(url).success(function(data){
	          		console.log(data);
	            	$scope.address.street = data.results[0].address_components[0].long_name + " " + data.results[0].address_components[1].long_name;
	            	$scope.address.city = data.results[0].address_components[4].long_name;
	            	$scope.address.state = data.results[0].address_components[6].short_name;
	            	$scope.address.zip = data.results[0].address_components[8].long_name;
	            	$scope.address.lat= lat;
	            	$scope.address.lon=longi;
	          });
	        }, function(err) {
	          // error
	        	console.log("error :",err);
	        });


});