'use strict';

angular.module('elnosErpApp')
  .controller('UserViewCtrl', function ($scope, $stateParams, $http, $location) {
    $scope.user = [];

    $http.get('/api/users/' + $stateParams.username)
      .success(function(user) {
        $scope.user = user;
      });
  });