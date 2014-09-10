var _ = require('nimble');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var kittySchema = mongoose.Schema({
	name: String
});
kittySchema.methods.speak = function() {
	var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name";
	console.log(greeting);
};

var Kitten = mongoose.model('Kitten', kittySchema);

_.series([
	function (callback) {
		db.once('open', function () {
			console.log('Connected to MongoDB');
			callback();		
		});
	},
	function (callback) {
		var silence = new Kitten({ name: 'Silence' });
		console.log(silence.name);

		callback();
	},
	function (callback) {
		console.log("SAVING fluffy");
		var fluffy = new Kitten({ name: 'fluffy' });
		fluffy.speak();
		fluffy.save(function(err, fluffy) {
			if (err) return console.error(err);
			fluffy.speak();
			callback();
		});
	},
	function (callback) {
		console.log("FIND ALL THE KITTENS");
		Kitten.find(function (err, kittens) {
			if (err) return console.error(err);
			console.log(kittens);
			callback();
		});
	}
]);