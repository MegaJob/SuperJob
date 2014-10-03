'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user/view', {
        url: '/user/view/:userid',
        templateUrl: 'app/user/user.view/user.view.html',
        controller: 'UserViewCtrl'
      });
  });