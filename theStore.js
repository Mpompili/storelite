function todos(state = [], action) {
    //if we invoke this method with the ADD_TODO's action..
    switch (action.type) {
        case 'ADD_TODO': 
            return state.concat([action.todo]); 
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id); 
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, {complete: !todo.complete})
            ); 
        default: 
            return state; 
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal]); 
        case 'REMOVE_GOAL': 
            return state.filter(goal => goal.id !== action.id);
        default: 
            return state; 
    }
}

function rootReducer (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    };
}

function createStore(reducer) {
    // four parts
        // private = but can be accessed with public facing api 
    // 1. The internal state
        // public facing api - way to interact with store. 
    // 2. Get the state
    // 3. Listen to changes on state 
    // 4. Update the State

    let state; 
    let listeners = []; 

    const getState = () => state;

    const subscribe = (listener) => {
        /* pushing in callback functions to be invoked whenever state changes, 
        also providing user the ability to remove the initial cb function 
        by retunning a function that will filter out the cb within the listeners array. 
        */
        listeners.push(listener); 

        // unsubscribe()
        return () => { 
            listeners = listeners.filter((l) => l !== listener);
        };
    };

    const dispatch = (action) => { 
        // uses reducer to create to state to update store. 
        state = reducer(state, action);  
        listeners.forEach(listener => listener());

    };

    return {
        getState, 
        subscribe,
        dispatch
    };

}

const store = createStore(rootReducer);
// store.dispatch({type:'ADD_TODO', todo:{id:0, name: 'whatever'}});