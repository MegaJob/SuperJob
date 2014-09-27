'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newdetail', {
        url: '/warehouse/newdetail',
        templateUrl: 'app/warehouse/newdetail/newdetail.html',
        controller: 'NewDetailCtrl'
      });
  });