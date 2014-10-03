'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user/list', {
        url: '/user/list',
        templateUrl: 'app/user/user.list.html',
        controller: 'UserListCtrl'
      });
  });