const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({
			name: 'Thomas',
			age: 28
		})
	}, 3500)
})

promise
	.then((data) => {
		console.log(data)

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('This is my other promise')
			}, 3500)
		})
	})
	.then((data) => {
		console.log(data)
	})
	.catch((error) => {
		console.log('Error: ', error)
	})