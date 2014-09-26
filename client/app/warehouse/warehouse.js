'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('warehouse', {
        url: '/warehouse',
        templateUrl: 'app/warehouse/warehouse.html',
        controller: 'WarehouseCtrl'
      });
  });