angular.module('starter')
.directive('stylistListItem',function(){
  return{
    restrict: 'E',
    templateUrl: 'app/directives/stylistListItem/stylistListItem.html',
    replace: true,
    scope:{
      stylist: '@stylist'
    }
  }
});