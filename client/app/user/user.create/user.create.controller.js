'use strict';

angular.module('elnosErpApp')
  .controller('UserCreateCtrl', function ($scope, $http, $location, $upload) {
  	$scope.errors = {};
  	$scope.errors.other = {};
  	$scope.errors.name = {};
  	$scope.errors.email = {};
    $scope.errors.password = {};

    $scope.uploading = {};
    $scope.uploading.isactive = false;
    $scope.uploading.percentage = 0;

    $scope.userSubmit = function(form) {
      if (!$scope.user)
      	return $scope.errors.other.message = 'You have to fill this form out in order to submit.';

      $http.post('/api/users', $scope.user)
        .success(function(user) {
          $location.path('/user/view/' + user.name);
        }).error(function(data) {
      	  if (data.errors)
            $scope.errors = data.errors;
        })
    };

    $scope.onFileSelect = function(files) {
      /*for (var i = 0; i < files.length; i++)
      {
        var file = files[i];
        $scope.uploading.isactive = true;
        $scope.uploading.percentage = 0;
        $scope.upload = $upload.upload({
          url: 'api/users/uploadpic',
          file: file,
        }).progress(function(evt) {
          $scope.uploading.percentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
        })
        //.error(...)
        .then(function(success, error, progress) {
          $scope.uploading.isactive = false;
        });
      }*/
      console.log(files);
    };
  });
