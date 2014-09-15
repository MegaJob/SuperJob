var User = require('../user');
var assert = require('assert');

describe('user', function() {
	beforeEach(function(done) {
		User.find().remove(function() {
			done();
		});
	});

	describe('.new(user)', function() {
		it('create new user', function(done) {
			var newUser = new User({ 
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
			newUser.save(function(err, user) {
				if (err) throw err;
				assert.deepEqual(newUser, user);
				User.authenticate("creator", "123", function(res) {
					assert(true);
					done();
				});
			});
		});
	});

});