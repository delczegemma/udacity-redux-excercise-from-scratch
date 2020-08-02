//The Reducer function is responsible to updating the state based on the current action
//It takes alwas to arguments, the "state" and the "action"
//This has to be a pure function to increase predictability.
//So the function doesn't modify the current, instead with the concat() method it creates a new one,
// in order to remain pure.

function todos(state = [], action) {
	if(action.type === 'ADD_TODO') {
		return state.concat([action.todo])
	}
	return state
}

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