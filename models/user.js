var _ = require('nimble');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mytest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = new Schema({
  id: Number, // "1"
  name: String, // "creator"
  pass: String, // "$2a$12$GRSzwq1wDEOcJhBTcU89HeO.MAQ02tYgO06hyeQcVLaa020lSFb7G"
  salt: String, // "$2a$12$GRSzwq1wDEOcJhBTcU89He"
  status: Number, // "1"
  personal:
  {
    firstname: String, // "Son"
    lastname: String, // "Holy Ghost"
    patronymic: String, // "Father"
    phone: String, // "+00000000000"
    email: String, // "creator@this.universe"
    picurl: String, // "http://this.universe/creator.png"
    resume: String, // "The Creator"
    birthday: Date // "0000-00-00"
  },
  statistics:
  {
    created: Date, // "0000-00-00"
    lastlogin: Date // "2014-09-09"
  }
});

userSchema.methods.printSummary = function() {
	console.log('Name: ' + this.name);
	console.log('Full name: ' + this.personal.firstname + ' ' + this.personal.patronymic + ' ' + this.personal.lastname);
};

var User = mongoose.model('User', userSchema);

_.series([
	function (callback) {
		db.once('open', function() {
			console.log('Connected to MongoDB');
			callback();
		});
	},
	function (callback) {
		console.log('Save new User');
		var user1 = new User({
			id: "1",
			name: "creator",
			pass: "$2a$12$GRSzwq1wDEOcJhBTcU89HeO.MAQ02tYgO06hyeQcVLaa020lSFb7G",
			salt: "$2a$12$GRSzwq1wDEOcJhBTcU89He",
			status: "1",
			personal:
			{
				firstname: "Son",
				lastname: "Holy Ghost",
				patronymic: "Father",
				phone: "+00000000000",
				email: "creator@this.universe",
				picurl: "http://this.universe/creator.png",
				resume: "The Creator",
				birthday: new Date("0000-00-00")
			},
			statistics:
			{
				created: new Date("0000-00-00"),
				lastlogin: new Date("2014-09-09")
			}
		});
		console.log("user1 summary:");
		user1.printSummary();
		console.log();

		user1.save(function(err, user) {
			if (err) return console.error(err);
			console.log('user after saving summary');
			user.printSummary();
			callback();
		});
	},
]);