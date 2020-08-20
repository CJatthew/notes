			function instanceOf(left, right) {
				let proto = left.__proto__
				let i = 0
				while (proto) {
					console.log(proto, '->' + i++)
					if (proto === right.prototype) {
						return true
					}
					
					proto = proto.__proto__
				}
				
				return false
			}
			
			class A {}
			class B extends A {}
			class C {}
			
			const b = new B()
			
			console.log(instanceOf(b, B))
			console.log(instanceOf(b, A))
			console.log(instanceOf(b, C))