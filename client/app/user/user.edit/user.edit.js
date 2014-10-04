'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user/edit', {
        url: '/user/edit/:username',
        templateUrl: 'app/user/user.form.html',
        controller: 'UserEditCtrl'
      });
  });