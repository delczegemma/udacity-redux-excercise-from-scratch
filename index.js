function createStore() {
	//The store should have four parts
	//1. the state
	//2. Get the state
	//3. Listen to stat changes
	//4. Update the state

	let state
	let listeners = []

	const getState = () => state

	const subscribe = (listener) => {
		listeners.push(listener)
		return () => {
			listeners = listeners.filter((l) => l !== listener)
		}
	}

	return {
		getState,
		subscribe
	}

}

const store = createStore()

store.subsrcibe(() => {
	console.log('The new state is: ', store.getState())
})

const unsubscribe = store.subsrcibe(() => {
	console.log('The store changed.')
})

unsubscribe()