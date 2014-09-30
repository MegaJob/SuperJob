'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      });
/*      .state('viewperson', {
        url: '/people/view',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      });
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      }); */
  });