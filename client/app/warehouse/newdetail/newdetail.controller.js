'use strict';

angular.module('elnosErpApp')
  .controller('NewDetailCtrl', function ($scope, $http, $location) {
  	$scope.errors = {};
  	$scope.errors.other = {};
  	$scope.errors.identifier = {};
  	$scope.errors.name = {};

    $scope.newdetail = function(form) {
      if (!$scope.detail)
      	return $scope.errors.other.message = 'You have to fill this form out in order to submit.';

      $http.post('/api/parts', {
      	identifier: $scope.detail.identifier,
      	class:      $scope.detail.class,
      	type:       $scope.detail.type,
      	name:       $scope.detail.name,
      	amount:     $scope.detail.amount,
      	limit:      $scope.detail.limit
      }).success(function(data) {
      	$location.path('/warehouse');
      }).error(function(data) {
      	if (data.errors)
	 	  $scope.errors = data.errors;
      })
    }
  });
