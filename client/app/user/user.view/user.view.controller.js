'use strict';

angular.module('elnosErpApp')
  .controller('UserViewCtrl', function ($scope, $stateParams, $http, $location) {
    $scope.user = [];

    $http.get('/api/users/' + $stateParams.userid).success(function(user) {
      $scope.user = user;
    });
  });