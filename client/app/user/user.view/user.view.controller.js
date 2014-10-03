'use strict';

angular.module('elnosErpApp')
  .controller('PeopleViewCtrl', function ($scope, $stateParams, $http, $location) {
    $scope.user = [];

    $http.get('/api/users/' + $stateParams.userid).success(function(user) {
      $scope.user = user;

      console.log(user);
    });
  });