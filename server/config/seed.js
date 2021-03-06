/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Part = require('../api/part/part.model');
require('./seed.acl'); 
require('./seed.user');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Part.find({}).remove(function() {
  Part.create({
    identifier: 'RT_OVF_2',
    class: 'Крепёж',
    type: 'Винты',
    name: 'Винтик',
    amount: '2 шт',
    limit: '10 шт',
  }, {
    identifier: 'RT5_3',
    class: 'Пластик',
    type: 'Сита',
    name: 'Резина, которую нужно тянуть',
    amount: '30 см',
    limit: '100 м',
  }, function() {
    console.log('finished populating parts');
  } )
});