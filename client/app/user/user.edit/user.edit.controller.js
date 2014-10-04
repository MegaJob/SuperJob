'use strict';

angular.module('elnosErpApp')
  .controller('UserEditCtrl', function ($scope, $stateParams, $http, $location, $upload) {
  	$scope.errors = {};
  	$scope.errors.other = {};
  	$scope.errors.name = {};
  	$scope.errors.email = {};
    $scope.errors.password = {};

    $scope.uploading = {};
    $scope.uploading.isactive = false;
    $scope.uploading.percentage = 0;

    $http.get('/api/users/' + $stateParams.username)
      .success(function(user) {
        $scope.user = user;
      });

    $scope.userSubmit = function(form) {
      if (!$scope.user)
      	return $scope.errors.other.message = 'You have to fill this form out in order to submit.';

      $http.put('/api/users/' + $stateParams.username, $scope.user)
        .success(function(user) {
          $location.path('/user/view/' + user.name);
        }).error(function(data) {
      	  if (data.errors)
            $scope.errors = data.errors;
        })
    };

    $scope.onFileSelect = function(files) {
      for (var i = 0; i < files.length; i++)
      {
        var file = files[i];
        $scope.uploading.isactive = true;
        $scope.uploading.percentage = 0;
        $scope.upload = $upload.upload({
          url: 'upload',
          file: file,
        }).progress(function(evt) {
          $scope.uploading.percentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          $scope.user.picture = data;
        })
        //.error(...)
        .then(function(success, error, progress) {
          $scope.uploading.isactive = false;
        });
      }
    };
  });