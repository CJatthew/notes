const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class MyPromise {
	constructor(executor) {
		this.status = PENDING
		this.value = undefined
		this.reason = undefined

		this.resolves = []
		this.rejects = []

		const resolve = (value) => {
			if (this.status === PENDING) {
				this.status = RESOLVED
				this.value = value

				while(this.resolves.length) {
					const callback = this.resolves.shift()
					callback(value)
				}
			}
		}


		const reject = (reason) => {
			if (this.status === PENDING) {
					this.status = REJECTED
					this.reason = reason

					while(this.rejects.length) {
						const callback = this.rejects.shift()
						callback(reason)
					}
			}

			try {
				executor(resolve, reject)
			} catch(e) {
				reject(e)
			}
		}

		then(resolve, reject) {
			typeof resolve !== 'function' ? resolve = value => value : resolve
			typeof reject !== 'function' ? reject = reason => throw new Error(reason instanceof Error ? reason.message : reason) : reject

			return new MyPromise((resolveFn, rejectFn) => {
				const resolved = value => {
					try {
						const res = resolve(value)

						res instanceof MyPromise ? MyPromise.then(resolveFn, rejectFn) : resolveFn(res)						
					} catch(e) {
						rejectFn(e)
					}
				}

				const rejected = reason => {
						const res = reject(value)
				}
			})
		}

		catch(errorFn) {
			
		}

		finally() {

		}

		static resolve() {

		}

		static reject() {

		}

		static all() {

		}

		static allSettled() {

		}

		static race() {

		}
	}
}
