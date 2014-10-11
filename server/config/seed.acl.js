var acl = require('../components/acl');
var mongoose = require('mongoose');
var async = require('async');

var acl_resources_collection;

async.series([
    function(cb) {
        mongoose.connection.db.collection
            ('acl_resources', function(err, collection) {
                if (err) return errorHandler();
                acl_resources_collection = collection;
                cb();
            });
    },
    function(cb) {
        acl_resources_collection.remove({}, function(err) {
            if (err) return errorHandler();
            cb();
        });
    },
    function(cb) {
        acl.allow([
            {
                roles:['guest','member'],
                allows:[
                    {resources:'blogs', permissions:'get'},
                    {resources:['forums','news'], permissions:['get','put','delete']}
                ]
            },
            {
                roles:['gold','silver'], 
                allows:[
                    {resources:'cash', permissions:['sell','exchange']},
                    {resources:['account','deposit'], permissions:['put','delete']}
                ]
            }
        ], function(err) {
            if (err) return errorHandler();
            cb();
        });        
    },
    function(cb) {
        acl.addUserRoles('lev', 'silver', function(){
            cb();
        });
    },
    function(cb) {
        console.log('finished populating access rules');
        cb();
    }
]);