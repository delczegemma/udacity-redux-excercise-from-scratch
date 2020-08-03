// ---* Library Code *---//

function createStore(reducer) {
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

	//Store dispatch function to update state inside the store (part 4)
	const dispatch = (action) => {
		state = reducer(state,action)
		listeners.forEach((listener) =>listener())
	}

	return {
		getState,
		subscribe,
		dispatch
	}

}

// ---* App Code *---//

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

const store = createStore(todos)

store.subscribe(() => {
	console.log('The new state is: ', store.getState())
})

store.dispatch({
	type: 'ADD_TODO',
	todo:{
		id:0,
		name: 'Learn Redux',
		complete: false
	}
})