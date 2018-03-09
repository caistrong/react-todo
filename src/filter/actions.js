import {SELECT_FILTER} from './actionTypes'

export const selectFilter = (filterTag) => {
    return {
        type: SELECT_FILTER,
        filter: filterTag
    }
}