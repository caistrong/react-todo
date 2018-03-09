import {createStore, combineReducers} from 'redux'
import {filterTypes} from './filter'
import {todoReducer} from './todos/';
import {filterReducer} from './filter/';

//store状态树
const initState = {
    todos: [
        {
            id: 0,
            text: '去吃饭',
            done: false
        },
        {
            id: 1,
            text: '做作业',
            done: true
        }
    ],
    filter: filterTypes.ALL
}

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer
})

const store = createStore(reducer, initState)

export default store