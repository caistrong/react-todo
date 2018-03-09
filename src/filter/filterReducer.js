import {SELECT_FILTER} from './actionTypes'

export default (state = SELECT_FILTER,action) => {
    switch (action.type){
        case SELECT_FILTER: {
            return action.filter
        }
        default: {
            return state
        }
    }
}