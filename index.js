// ---* Library Code *---//

function createStore(reducer) {
	//The store should have four parts
	//1. the state
	//2. Get the state
	//3. Listen to state changes
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
	switch (action.type){
		case 'ADD_TODO' :
			return state.concat([action.todo])
		case 'REMOVE_TODO' :
			return state.filer((todo) => todo.id !== action.id)
		case 'TOGGLE_TODO' :
			return state.map((todo) => todo.id !== action.id ? todo :
				Object.assign({}, todo, { complete: !todo.complete }))
		default: 
			return state
	}
}

function goals (state = [], action) {
	switch(action.type) {
		case 'ADD_GOAL' :
			return state.concat([action.goal])
		case 'REMOVE_GOAL' :
			return state.filer((goal) => goal.id !== action.id)
		default :
			return state
	}
}

//createStore() must be passed a "reducer" function, when it's invoked.
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