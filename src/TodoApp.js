import React, {Component} from 'react'
import {Todos} from './todos/'
import {FiltersBar} from './filter/'
import logo from './logo.svg'
import './App.css'

class TodoApp extends Component {
    render() {
        return(
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>React Todo</h1>
                <FiltersBar/>
                <Todos/>
            </div>
        )
    }
}

export default TodoApp