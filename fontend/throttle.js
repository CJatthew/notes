function throttle (fn, delay) {
	let flag = true;
	let timer = null;

	return function(...args) {
		if (!flag) {
			return
		}

		let context = this
		flag = false
		clearTimeout(timer)

		setTimeout(function() {
			fn.apply(context, args)
			flag = true
		}, delay)
	}
}
