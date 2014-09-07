module.exports = function() {
	return function(req, res, next) {
		req.lev = res.locals.lev = "I'm lev's variable!";

		next();
	}
};