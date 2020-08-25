function debouce(fn, delay) {
	let timer = null

	return function(...args) {
		let context = this
		clearTimeout(timer)


		setTimeout(function() {
			fn.apply(context, args)
		}, delay)
	}
}
