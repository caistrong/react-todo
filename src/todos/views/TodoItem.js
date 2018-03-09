import React from 'react'

const TodoItem = ({key,text,done,onToggle,onRemove}) => (
    <li className="todo-item">
        <input className="todo-item-check" onClick={onToggle} type="checkbox" checked = { done ? true : false } />
        <span className="todo-item-text">{ text }</span>
        <button className="todo-item-button" onClick={onRemove}>x</button>
    </li>
)

export default TodoItem