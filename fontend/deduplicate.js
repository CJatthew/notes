var array = [1, 1, '1', '1', null, null, 
                undefined, undefined, 
                new String('1'), new String('1'), 
                /a/, /a/,
                NaN, NaN
            ];


//es6 Set
let unique_1 = array => [...new Set(array)];
console.log(unique_1(array))

// filter
function unique_2(array) {
	let res = array.filter(function(item, index, array) {
		return array.indexOf(item) === index;
	})

	return res;
}

console.log(unique_2(array))

//reduce
let unique_3 = array => array.reduce((pre, cur) => pre.includes(cur) ? pre : [...pre, cur], []);
console.log(unique_3(array))

//object keyValue
function unique_4(array) {
	let obj = {};

	return array.filter(function(item, index, array) {
		return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
	})
}
console.log(unique_4(array))
