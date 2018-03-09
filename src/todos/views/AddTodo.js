import React, {Component} from 'react'
import { addTodo } from '../actions'
import { connect } from 'react-redux'

class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.state = {
            value : ''
        }
    }
    onInputChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    onSubmit(event) {
        if(event.type ==='keyup' && event.keyCode !== 13) return;
        //keyCode===13是回车键

        const inputValue = this.state.value
        if(!inputValue.trim()) {
            return    
        }
        this.props.onAdd(inputValue)

        this.setState({
            value: ''
        })
    }
    render() {
        return (
            <div className="add-todo">
                <input className="add-todo-input" type="text" onKeyUp={this.onSubmit} onChange={this.onInputChange} value={this.state.value} placeholder="在此输入..."></input>
                <button className="add-todo-button" onClick={this.onSubmit}>添加</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (text)=>{
            dispatch(addTodo(text))
        }
    }
}

export default connect(null,mapDispatchToProps)(AddTodo)