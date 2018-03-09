import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './actionTypes'

let todoId = 3

export const addTodo = (inputText) => {
    return {
        type: ADD_TODO,
        id: todoId++,
        text: inputText,
        done: false
    }
}

export const removeTodo = (id) => {
    return {
        type: REMOVE_TODO,
        id: id,
    }
}

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        id: id
    }
}