'use strict';

angular.module('elnosErpApp')
  .controller('UserCreateCtrl', function ($scope, $http, $location, $upload) {
  	$scope.errors = {};
  	$scope.errors.other = {};
  	$scope.errors.name = {};
  	$scope.errors.email = {};
    $scope.errors.password = {};

    $scope.userCreate = function(form) {
      if (!$scope.user)
      	return $scope.errors.other.message = 'You have to fill this form out in order to submit.';

      $http.post('/api/users', {
      	name:     $scope.user.name,
      	email:    $scope.user.email,
      	password: $scope.user.password,
      }).success(function(user) {
        $location.path('/user/view/' + user.name);
      }).error(function(data) {
      	if (data.errors)
          $scope.errors = data.errors;
      })
    };
  });
