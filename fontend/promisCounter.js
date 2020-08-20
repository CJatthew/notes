				function asyncAdd(a, b, callback) {
					setTimeout(function() {
						callback(null, a + b)
					}, 1000)
				}
				
				// 青铜级
				async function sum(...rest) {
					let result = rest.shift()
					
					for (let it of rest) {
						result = await new Promise(resolve => {
							asyncAdd(result, it, (_, res) => {
								resolve(res)
							})
						})
					}
					
					return result
				}
				
				//白银级
				async function sum1(...rest) {
					if (rest.length < 2) {
						return rest[0] || 0
					}
					
					let promises = []
					
					for (let i = 0, j = rest.length; i < j; i += 2) {						
						promises.push(new Promise(resolve => {
							if (rest[i + 1] === undefined) {
								resolve(rest[i])
							} else {
								asyncAdd(rest[i], rest[i + 1], (_, result) => {
									resolve(result)
								})
							}
						}))
					}
					
					let result = await Promise.all(promises)
					return await sum1(...result)
				}
					
				//王者级
				async function sum2(...rest) {
					let result = 0
					let obj = {}
					obj.valueOf = () => {
						return result
					}
					
					let promises = []
					
					for (let num of rest) {
						promises.push(new Promise(resolve => {
							asyncAdd(obj, num, (_, res) => {
								resolve(res)
							})
						}).then(res => {
							result = res
						}))
					}
					
					await Promise.all(promises)
					
					return result
				}	
				
				let start = window.performance.now()
				sum(1,2,3,4,5,6).then(res => {
					console.log(res)
					console.log("青铜耗时:" + (window.performance.now() - start))
				})
				
				start = window.performance.now()
				sum1(1,2,3,4,5,6).then(res => {
					console.log(res)
					console.log("白银耗时:" + (window.performance.now() - start))
				})
							
				start = window.performance.now()
				sum2(1,2,3,4,5,6).then(res => {
					console.log(res)
					console.log("王者耗时:" + (window.performance.now() - start))
				})