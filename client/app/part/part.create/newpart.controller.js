'use strict';

angular.module('elnosErpApp')
  .controller('NewDetailCtrl', function ($scope, $http, $location, $upload) {
  	$scope.errors = {};
  	$scope.errors.other = {};
  	$scope.errors.identifier = {};
  	$scope.errors.name = {};

    $scope.uploading = {};
    $scope.uploading.isactive = false;
    $scope.uploading.percentage = 0;

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
    };

    $scope.onFileSelect = function(files) {
    	for (var i = 0; i < files.length; i++)
    	{
    		var file = files[i];
        $scope.uploading.isactive = true;
        $scope.uploading.percentage = 0;
  			$scope.upload = $upload.upload({
  				url: 'api/parts/uploadpic', //upload.php script, node.js route, or servlet url
  				//method: 'POST' or 'PUT',
  				//headers: {'header-key': 'header-value'},
  				//withCredentials: true,
  				file: file, // or list of files ($files) for html5 only
  				//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
  				// customize file formData name ('Content-Disposition'), server side file variable name. 
  				//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
  				// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
  				//formDataAppender: function(formData, key, val){}
  			}).progress(function(evt) {
  				// console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          $scope.uploading.percentage = parseInt(100.0 * evt.loaded / evt.total);
  			}).success(function(data, status, headers, config) {
  				// file is uploaded successfully
  			})
  			//.error(...)
  			.then(function(success, error, progress) {
          $scope.uploading.isactive = false;
        });
    	}
    };
  });
