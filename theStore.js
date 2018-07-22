function createStore() {
    // four parts
        // private = but can be accessed with public facing api 
    // 1. The internal state
        // public facing api - way to interact with store. 
    // 2. Get the state
    // 3. Listen to changes on state 
    // 4. Update the State

    let state; 
    let listeners = []; 

    let addToDo = {
        type: 'ADD_TODO',
        todo: {
            id: 0,
            name: 'Learn Redux',
            complete: false,
        }
    };

    let removeTodo = {
        type: 'REMOVE_TODO',
        id: 0, 
    };

    let toggle = {
        type: 'TOGGLE_TODO',
        id: 0, 
    };

    let addGoal = {
        type: 'ADD_GOAL', 
        goal: {
            id: 0,
            name: 'Run a Marathon'
        }
    };

    const getState = () => state;

    const subscribe = (listener) => {
        /* pushing in callback functions to be invoked whenever state changes, 
        also providing user the ability to remove the initial cb function 
        by retunning a function that will filter out the cb within the listeners array. 
        */
        listeners.push(listener); 
        return () => { 
            listeners = listeners.filter((l) => l !== listener);
        };
    };

    return {
        getState, 
        subscribe,
    };

}