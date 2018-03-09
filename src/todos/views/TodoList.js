import React from 'react'
import {connect} from 'react-redux'
import TodoItem from './TodoItem'
import { filterTypes } from '../../filter'
import {toggleTodo,removeTodo} from '../actions'

const TodoList = ({todos,onToggleTodo,onRemoveTodo}) => {
    return (
        <ul className="todo-list">
            {
                todos.map((item) => (
                    <TodoItem 
                        key={item.id}
                        text={item.text}
                        done={item.done}
                        onToggle={()=> onToggleTodo(item.id) } 
                        onRemove={()=> onRemoveTodo(item.id) }/> 
                ))
            }
        </ul>
    )
}

const selectVisibleTodos = (todos,filter)=>{
    switch(filter) {
        case filterTypes.ALL:
            return todos
        case filterTypes.DONE:
            return todos.filter(item => item.done)
        case filterTypes.PENDING:
            return todos.filter(item => !item.done)
        default:
            throw new Error('you didn\'t select a filtertag')
    }
}

const mapStateToProps = (state) => {
    return {
        todos: selectVisibleTodos(state.todos,state.filter)
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onToggleTodo: (id) => {
            dispatch(toggleTodo(id))
        },
        onRemoveTodo: (id) => {
            dispatch(removeTodo(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)