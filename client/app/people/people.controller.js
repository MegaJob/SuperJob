'use strict';

angular.module('elnosErpApp')
  .controller('PeopleCtrl', function ($scope, $http, $location) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      users.forEach(function(user) {
        if (user.personal)
          $scope.users.push(user);
      });
    });
  });