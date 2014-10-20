var ref = new Firebase("https://blazing-inferno-9634.firebaseio.com/");
var paulServer = 'https://rgqediyasf.localtunnel.me';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase','starter.controllers','ngCordova','google-maps'.ns(), 'angularPayments'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    })
        .state('addUserData', {
      url: '/addUserData',
      templateUrl: 'app/addUserData/addUserData.html',
      controller: 'AddUserDataCtrl'
    })
/////////////////////////////////////////////////
//things with side bars
/////////////////////////////////////////////////
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: 'app/other/menu.html',
      controller: 'AppCtrl'
    })
  .state('app.services', {
      url: "/services",
      views: {
        'menuContent' :{
          templateUrl: 'app/serviceList/serviceList.html',
          controller: 'ServiceListCtrl'
        }
      }
    })
    .state('app.address', {
      url: '/address',
      views: {
        'menuContent' :{
          templateUrl: 'app/addAddress/addAddress.html',
          controller: 'AddAddressCtrl'
        }
      }
    })
    .state('app.confirmBooking', {
      url: "/confirmBooking",
      views: {
        'menuContent' :{
          templateUrl: 'app/confirmBooking/confirmBooking.html',
          controller: 'ConfirmBookingCtrl'
        }
      }
    })
    .state('app.stripe', {
      url: "/ccSubmit",
      views: {
        'menuContent' :{
          templateUrl: 'app/ccSubmit/ccSubmit.html',
          controller: 'ccSubmitCtrl'
        }
      }
    })
    .state('app.appointments', {
      url: "/appointments",
      views: {
        'menuContent' :{
          templateUrl: 'app/appointments/appointments.html',
          controller: 'AppointmentsCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: 'app/settings/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.shovlerDashboard', {
      url: "/shovlerDashboard",
      views: {
        'menuContent' :{
          templateUrl: 'app/shovlerDashboard/shovlerDashboard.html',
          controller: 'ShovlerDashboardCtrl'
        }
      }
    })
    .state('app.shovlerConfirm', {
      url: "/shovlerConfirm",
      views: {
        'menuContent' :{
          templateUrl: 'app/shovlerConfirm/shovlerConfirm.html',
          controller: 'ShovlerConfirmCtrl'
        }
      }
    })
     .state('app.waiting', {
      url: "/waitingForShovler",
      views: {
        'menuContent' :{
          templateUrl: 'app/waitingForShovler/waiting.html',
          controller: 'WaitingController'
        }
      }
    })
    .state('app.finishShovel', {
      url: "/finishShovel",
      views: {
        'menuContent' :{
          templateUrl: 'app/finishShovel/finish.html',
          controller: 'FinishShovelCtrl'
        }
      }
    })
    .state('app.pay', {
      url: "/pay",
      views: {
        'menuContent' :{
          templateUrl: 'app/customerPay/pay.html',
          controller: 'PayCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

