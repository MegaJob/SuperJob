'use strict';

angular.module('elnosErpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      })
      .state('people/view', {
        url: '/people/view/:userid',
        templateUrl: 'app/people/peopleView.html',
        controller: 'PeopleViewCtrl'
      });
/*      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl'
      }); */
  });