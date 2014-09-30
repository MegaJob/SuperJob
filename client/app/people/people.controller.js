'use strict';

angular.module('elnosErpApp')
  .controller('PeopleCtrl', function ($scope, $http, $location) {
    $scope.usersList = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
      /* var counter = 0
      users.forEach(function(user){
        var index = Math.floor(counter / 3);
        if ((counter % 3) == 0)
          $scope.usersList[index] = [];
        $scope.usersList[index][counter % 3] = user;
        counter += 1;
      }); */
    });
  });
