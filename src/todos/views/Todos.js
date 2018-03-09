import React from 'react'
import AddTodo from './AddTodo.js'
import TodoList from './TodoList.js'
import './style.css'


// <AddTodo className="add-todo"/> 在自己写的组件上加className这样写似乎行不通
export default () => {
    return (
        <div className="todos">
            <AddTodo />
            <TodoList />
        </div>
    )
}
// 在引入了<TodoList/>，而TodoList文件还没export出一个class of function的时候会报
// Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
// 这个报错会直接在src/index.js的ReactDom.render这里，比较难以追踪