// Ionic OpenWeather App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('openweather-app', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeCtrl',
      templateUrl: 'views/home.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherCtrl',
      templateUrl: 'views/weather.html'
    });
  
  $urlRouterProvider.otherwise('/home');

})

.controller('HomeCtrl', function($scope) {
    $scope.forcastDisabled = true
})

.controller('WeatherCtrl', function ($scope, $http, $ionicLoading) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  $scope.getIconUrl = function(iconId) {
      return 'http://openweathermap.org/img/w/' + iconId + '.png';
  };

  $scope.getIconComp = function(iconId) {
      var iconClass = 'ion-ios-partlysunny-outline';

      switch (iconId) {
      case '01d': iconClass = 'ion-ios-sunny';
            break;
      case '01n': iconClass = 'ion-ios-moon';
            break;
      case '02d': iconClass = 'ion-ios-partlysunny-outline';
            break;
      case '02n': iconClass = 'ion-ios-cloudy-night';
            break;
      case '03d': iconClass = 'ion-ios-cloudy-outline';
            break;
      case '03n': iconClass = 'ion-ios-cloudy';
            break;
      case '04d': iconClass = 'ion-ios-cloudy-outline';
            break;
      case '04n': iconClass = 'ion-ios-cloudy';
            break;
      case '09d': iconClass = 'ion-ios-rainy-outline';
            break;
      case '09n': iconClass = 'ion-ios-rainy';
            break;
      case '10d': iconClass = 'ion-ios-rainy-outline';
            break;
      case '10n': iconClass = 'ion-ios-rainy';
            break;
      case '11d': iconClass = 'ion-ios-thunderstorm-outline';
            break;
      case '11n': iconClass = 'ion-ios-thunderstorm';
            break;
      case '13d': iconClass = 'ion-ios-snowy';
            break;
      case '13n': iconClass = 'ion-ios-snowy';
            break;

      }

      return '<i class="icon ' + iconClass + '"></i>';
  };

  $ionicLoading.show();

  // Sunnyvale, CA
  var loc = {lat: 37.37, lng: -122.04};

  $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + loc.lat + '&lon=' + loc.lng + '&units=imperial').success(function (weather) {
    $scope.weather = weather;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load weather. Please try again later.',
      duration: 3000
    });
  });

  $scope.getDirection = function (degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
