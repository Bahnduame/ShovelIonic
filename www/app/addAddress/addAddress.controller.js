angular.module('starter')
//add cordova geolocation injection
.controller('AddAddressCtrl',function($scope, $state, $http, $cordovaGeolocation, userData, apptData, usSpinnerService){
	//$cordovaStatusbar.overlaysWebView(false);
	// StatusBar.overlaysWebView(false);

	$scope.address = {
	      'street_number': '',
		'route': '',
		'locality': '',
		'administrative_area_level_1': '',
		'postal_code': '',
		'streetAddr': ''
  	};

	$scope.logout = function() {
		$scope.loginObj.$logout();
	};

	$scope.confirmAddress = function($event){
		//take in address and userID from input fields and populate apptData
		apptData.setAddress($scope.address);
		$state.go('app.confirmBooking');
	};

	//get location and  populate address fields with best guess from google
       usSpinnerService.spin('spinner-1');    		
	$cordovaGeolocation
	      .getCurrentPosition()
	      .then(function (position) {

	        var key = "AIzaSyD8M6WnaIBMsstF_L3qYa7kXCtI8-_k_R8";
	        var lat  = position.coords.latitude;
	        var longi = position.coords.longitude;
	        var latlng = lat + ',' + longi;
	        
	        var url = 'https://maps.googleapis.com/maps/api/geocode/json' + '?latlng=' + latlng + '&key=' + key;
	    
	        $http.get(url).success(function(data){
        		console.log('address: ', data);

        		var addrArr = data.results[0].address_components;

        		for (var i = 0; i < addrArr.length; i++)
        			for (key in $scope.address)
        				if (addrArr[i].types.indexOf(key) != -1)
        					$scope.address[key] = (key === 'administrative_area_level_1' ? addrArr[i].short_name : addrArr[i].long_name);
        				
        		$scope.address.streetAddr = $scope.address.street_number + ' ' + $scope.address.route;

        		usSpinnerService.stop('spinner-1');

	        });
	      }, function(err) {
	        // error
	      	console.log("error :",err);
	      });
    		
});