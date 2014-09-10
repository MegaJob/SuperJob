function Field(val) {
	var value = val;

	this.__defineGetter__("value", function() {
		return value;
	});

	this.__defineSetter__("value", function(val) {
		value = val * 2;
	});
}

var field = new Field(25);
console.log(field.value);
field.value = 25;
console.log(field.value);