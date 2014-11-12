angular.module('starter')
.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 0;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
})
.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                   return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
})
.controller('ServiceListCtrl', function($scope, $state, userData, apptData, $http, $cordovaGeolocation) {

    $scope.weather = { temp: {}, clouds: null };

  // debugger;
  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {

      var key = "AIzaSyD8M6WnaIBMsstF_L3qYa7kXCtI8-_k_R8";
      var lat  = position.coords.latitude;
      var longi = position.coords.longitude;
      var latlng = "lat="+lat+'&lon='+longi;
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?'+latlng+'&units=metric&callback=JSON_CALLBACK').success(function(data) {
            if (data) {
                console.log(data);
                if (data.main) {
                    $scope.weather.temp.current = data.main.temp;
                    $scope.weather.temp.min = data.main.temp_min;
                    $scope.weather.temp.max = data.main.temp_max;
                }
                $scope.weather.clouds = data.clouds ? data.clouds.all : undefined;
              console.log($scope.weather)
            }
        });
    }, function(err) {
      // error
        console.log("error :",err);
    });

  $scope.goToStylists = function(){
    apptData.setClient(userData.getName());
    apptData.setClientID(userData.getID());
    apptData.setClientPhone(userData.getPhone());
    $state.go('app.address');
  }
});
