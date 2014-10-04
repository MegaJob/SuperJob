'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user/create', {
        url: '/user/create',
        templateUrl: 'app/user/user.form.html',
        controller: 'UserCreateCtrl'
      });
  });