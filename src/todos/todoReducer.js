import {ADD_TODO,REMOVE_TODO,TOGGLE_TODO} from './actionTypes.js'

//Reducer "todos" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.
// 如果state不加 state = []
export default (state = [],action) => {
    switch (action.type){
        case ADD_TODO: {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: action.done
                }
            ]
        }
        case REMOVE_TODO: {
            return state.filter((item)=>{
                    return item.id !== action.id
                }
            )

        }
        case TOGGLE_TODO: {
            return state.map((item)=>{
                if(item.id === action.id){
                    return {...item, done: !item.done }
                }else{
                    return item
                }
            })
        }
        default: {
            return state
        }
    }
}