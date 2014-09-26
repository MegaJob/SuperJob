'use strict';

angular.module('elnosErpApp')
  .controller('WarehouseCtrl', function ($scope, $http, socket) {
    $scope.parts = [];

    $http.get('/api/parts').success(function(parts) {
      $scope.parts = parts;

      $('#warehousTable')
        .dataTable({
          "info":     true,
          stateSave: true,
          "bSortCellsTop": true,
           /* for grouping */
          "bLengthChange": false,
          "bPaginate": false
          /*language: {
              url: '/lang/dataTables.ru.json'
          }*/
        })
        .columnFilter({
          sPlaceHolder: "head:after",
          bUseColVis: true,
          aoColumns: [{ type: "select" },
                      { type: "select" },
                      { type: "select" },
                      null,
                      null
                     ]
        })
        .rowGrouping({
          iGroupingColumnIndex: 0,
          bExpandableGrouping: true
        })
    });
  });
