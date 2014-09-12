var db = [];

/*
 * cb is asynchronous callback
 */
exports.save = function(doc, cb) {
	db.push(doc);
	if (cb) {
		setTimeout(function() {
			//cb();
		}, 1000);
	}
};

exports.first = function(obj) {
	return db.filter(function(doc){
		for (var key in obj) {
			if (doc[key] != obj[key]) {
				return false;
			}
		}
		return true;
	}).shift();
};

exports.clear = function() {
	db = [];
};

if (!Function.prototype.bind) {
	Function.prototype.bind=function(b){
		if(typeof this!=="function"){
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		function c(){}
		var a=[].slice,
			f=a.call(arguments,1),
			e=this,
			d=function(){
				return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));
			};
			c.prototype=this.prototype;
			d.prototype=new c();
		return d;
	};
}