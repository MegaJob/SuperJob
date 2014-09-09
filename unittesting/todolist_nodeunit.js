var Todo = require('./todolist');
var todo = new Todo();

exports['deleteTest'] = function(test) {
	test.expect(2);
	todo.add('Delete Me');
	test.equal(todo.getCount(), 1, '1 item should exist');
	todo.deleteAll();
	test.equal(todo.getCount(), 0, 'No items should exist');
	test.done();
};

exports['addTest'] = function(test) {
	test.expect(1);
	todo.deleteAll();
	todo.add('Added');
	test.notEqual(todo.getCount(), 0, '1 item should exist');
	test.done();
};

exports['doAsyncTest'] = function(test) {
	test.expect(1);
	todo.doAsync(function(value) {
		test.ok(value, 'Callback should be passed true');
		test.done();
	});
};

exports['throwsTest'] = function(test) {
	test.throws(todo.add, /requires/);
	test.done();
}