function myNew(constructor, ...rest) {
	if (typeof constructor !== 'function') {
		return constructor;
	}

	const _constructor = Object.create(constructor.prototype);

	const obj = constructor.call(_constructor, ...rest);

	if (typeof obj === 'object') {
		return obj;
	} else {
		return _constructor;
	}
}

function Fun(name, sex) {
	this.name = name;
	this.sex = sex;
}

Fun.prototype.getUserInfo = function() {
	return `我的名字${this.name}, 我的姓名${this.sex}` 
}

const fun = myNew(Fun, '字君', '男');

console.log(fun.getUserInfo());
