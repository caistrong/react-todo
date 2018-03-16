import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {filterTypes} from './filter'
import {statusTypes} from './weather/'
import {todoReducer} from './todos/'
import {filterReducer} from './filter/'
import {weatherReducer} from './weather/';

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
    filter: filterTypes.ALL,
    weather: {
        status: statusTypes.LOADING,
        info: null
    }
}

const middlewares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = composeEnhancers(applyMiddleware(...middlewares))

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
    weather: weatherReducer
})

const store = createStore(reducer, initState, enhancers)

export default store