# React和Redux构建TodoApp

## 起步
今天是在美团实习的第四天，也是接触React的第四天。这四天以来一直在学习React和Redux的一些思想，以及熟悉React的一些用以编程的API。这个TodoApp是这几天来学习的一点成果。本文将以TodoApp为例子介绍怎么从0来构建一个代码组织良好、模块高内聚低耦合、易于维护的React App。

我们先来看看**最终成果[React TodoApp](https://caistrong.github.io/react-todo/)**

## 设计
软件的设计一般来说是一个比较复杂的活，需要经过大量的思考斟酌，在上面我们提到的代码组织良好、模块高内聚低耦合、易于维护这些优点，大多数是在软件设计阶段就已经决定了。虽然我们只是做一个简单的TodoApp，但是如果仔细在这个过程下功夫，而不是一上来就劈头盖脸的直接编码，绝对可以为后续的维护、迭代工作省不少心。下面我简单讲一下这个Todo App设计过程考虑的事。

### 需求分析
- 可以添加、删除事项，可以勾选待办事项为完成
- 可以按【全部】【完成】【待办】来查看相应事项

### store状态树设计
```js
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
```
状态树的设计要相对扁平避免嵌套太多层，同时应避免冗余数据。也就是一些可以通过计算得出的数据，最好不要直接写在状态树里。参考下面的模块划分，todos模块的todoReducer能处理的也就state.todos这个节点的状态，filter模块的filterReducer能处理的是state.filter这个节点的状态。

### 模块划分

模块的划分是一个比较”只可意会不可言传“的过程。我们提倡使用”按功能来划分模块“的方式。考虑到我们按标签来查看待办事项的这个功能，相对于添加、删除、勾选事项等功能而言，”独立性“比较强。所以我们把应用划分为以下两个模块。

- todos模块
- filter模块

同时**模块的划分也要参考状态树设计**

### 每个模块需要包括哪些部分

- views 这个部分我们定义了组件component的代码
- index.js 这个部分我们作为该模块对外的接口。应用程序别的部分想要引用这个模块只可以通过`import {Todos} from './todos/'` `import {filterReducer} from './filter/';`这样的方式来导入。同时index.js里面主要做的就是import/export,导入模块内部的文件，再作为一个接口导出给外部。
- actionTypes.js 这个文件定义了该模块的所有业务逻辑（操作），比如说我们的todos模块的这个文件有`ADD_TODO` `REMOVE_TODO` `TOGGLE_TODO` 这三个操作。
- actions.js 这个文件主要是用来编写生成action对象的creator，一般来说一种actionType对应一种action对象
- reducer.js 这个文件用于定义**对于每一种被触发的action对象，该模块应该怎么来处理，怎么更改stroe的state**。同时这个文件里面**函数必须为纯函数**。纯函数简单说就是必须保证**相同的输入产生相同的输出**

### 代码文件组织
- filter 【filter模块】
  - views【filter模块的视图】
    - FiltersBar.js【标签栏组件】
    - Tag.js【标签组件】
    - style.css【filter模块的组件样式】
  - index.js【filter模块对外接口】
  - actions.js【filter模块所有可操作action对象的creator】
  - actionTypes.js【定义filter模块所有可操作action类型】
  - filterReducer.js【这里定义了action触发时如何更改store的state】
  - filterTypes.js【一个存一些常量的地方】
- todos【todos模块】
  - views【todos模块的视图】
    - Todos.js【整个todos组件】
    - AddTodo.js【添加新todo的组件】
    - TodoList.js【todolist组件】
    - TodoItem.js【单个todo组件】
    - style.css【todos模块的组件样式】
  - index.js【todos模块的对外接口】
  - actions.js【todos模块所有可操作action对象的creator】
  - actionType.js【定义todos模块所有可操作action类型】
  - todoReducer.js【这里定义了action触发时如何更改store的state】
- TodoApp.js【整个App的组件】
- App.css【整个App组件的样式】
- index.js【整个应用的入口】
- index.css【整个应用的样式(可以放CSS Reset)】
- Store.js【整个应用的state tree】

### 组件树状图
- TodoApp
  - img & h1
  - FiltersBar
    - Tag
  - Todos
    - AddTodo
    - TodoList
      - TodoItem

## 开始编程
这个APP里，我的整个编程过程是从逻辑到结构再到样式的。具体到react技术栈里，我把整个开发分为以下3各阶段：
1. 先编写redux相关的内容，先根据需求写好actionTypes，然后写action creator。完了之后写当action触发时处理action的reducer。reducer写好后就在Store里用createStore(reducer)里创建出store。之后再在index.js里，从"react-redux"里导出Provider包裹整个TodoApp，然后将store放在Provider的attribute上通过props将store传入整个APP。这样就完成了和状态管理，redux这部分相关的内容。
2. 之后编写和react相关的内容。主要就是编写views文件夹下的component文件。在我们顶层中的TodoApp主要引用了Todos、FiltersBar这两个component。其中这两个又各自引用了其他一些small component。可以参考上面的组件树状图。component编写是整个编程的重头戏。编写完成之后就整个应用的结构和逻辑就基本完成了。

3. 之后就是编写整个应用入口的index.css（这里我基本上是用来做CSS Reset）和App.css再在相应的views下编写组件各自的style.css。完成！

### 初始化工程
 安装好nodejs(含npm)，并配置环境变量。
 ```bash
 npm install --global create-react-app
 cd 到相应文件夹下
 create-react-app todo_app
 cd todo_app
 npm install --save redux react-redux
 npm start
 ```
## 第一阶段
### ActionTypes
```js
// F:\caistrong\react-demo\todo_app\src\todos\actionTypes.js
export const ADD_TODO = "addTodo"
export const REMOVE_TODO = "removeTodo"
export const TOGGLE_TODO = "toggleTodo"
```
```js
//F:\caistrong\react-demo\todo_app\src\filter\filterTypes.js
export const SELECT_FILTER = 'select-filter'
```
这就是这个应用ActionTypes的所有源代码，是的，**所有**。这里的ActionTypes非常简单。我们可以看到，他只有几行代码，但是却**规定了该应用所有可以对状态进行改变的操作(Action)**。参照我们上面的需求分析，我们可以清晰的看到，我们的TodoApp可以增、删todo(更改statte.todos)，更改单个todo的done状态，然后filter模块可以更改当前选中的filter标签(更改state.filter)

注意我们的ActionTypes关心的是所有**可以对状态进行改变**的操作。而不是应用所有操作，比如说我们的TodoApp。实际上还可以在输入栏上面输入一些字。”输入”这一行为其实也可以算是一种操作。但是我们的状态树上却没有类似inputValue:"hello world"这样的状态存储。

> 实际上并不是应用里的所有状态都要被存在状态树里的，我觉得redux的出现主要是为了解决**组件间状态共享**的问题。具体到我们这个项目，TodoList这个组件需要知道FiltersBar组件里哪个Tag被选中了。观察我们的组件树状图，可以很容易发现他们之间不是父子组件的关系，如果不使用redux，那就得疯狂使用props或者开启一条Bus，通过emit/on,这样的发布订阅者模式来传递状态。这很容易导致整个应用的状态管理混乱，难以维护。另一方面，把应用所有的状态都存储在Store里，都用redux来管理也不是最佳设计。比如我们在输入这个操作的文本框的inputValue。一来我们并不持久化这个状态，二来这个状态只在我们的AddTodo组件（及其Container）中使用。其他组件并不需要共享这个状态。把类似这样现在**以及将来**都只严格属于某一个组件(或一对父子组件)的state也放在整个应用的状态树中只会徒增状态树的复杂度。

### Actions
```js
//F:\caistrong\react-demo\todo_app\src\todos\actions.js
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
```
在Actions.js这个文件里，我们编写的诸如addTodo、removeTdo、toggleTodo这样的函数一般称作action creator（有些人翻译为action构造函数，我觉得不妥，会和constructor混掉，因为像箭头函数是不能作为构造函数（constructor）的，但是可以做creator）。实际上这个action creator的作用只是根据一些传入的参数然后生成一个简单的对象，我们称这个对象为action对象。对象的所有字段涵盖有决定我们如何处理这个action的所有信息。这些信息将会在reducer里用到，一般来说约定俗成会有个type字段。这里的话要和reducer结合来看。

> 对于有DOM 事件基础，并不了解redux的同学来讲，可以把action对象和event对象作为类比，我在学习的过程中发现redux这套机制和DOM的事件机制有不少类似的地方。比如我们之后也会用dispatch(addTodo("helo world!"))这样的方式来触发action对象

### Reducer

```js
//F:\caistrong\react-demo\todo_app\src\todos\todoReducer.js
import {ADD_TODO,REMOVE_TODO,TOGGLE_TODO} from './actionTypes.js'

// 要加state = []，为state参数赋一个默认值
export default (state = [],action) => {
    switch (action.type){
        case ADD_TODO: {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: action.done
                }
            ]
        }
        case REMOVE_TODO: {
            return state.filter((item)=>{
                    return item.id !== action.id
                }
            )

        }
        case TOGGLE_TODO: {
            return state.map((item)=>{
                if(item.id === action.id){
                    return {...item, done: !item.done }
                }else{
                    return item
                }
            })
        }
        default: {
            return state
        }
    }
}
```

Reducer这个文件export出一个函数，这个函数一般来说接受两个参数state和action。这里的state就是
```js
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
    ]
```
只是这一个节点，而不是整个状态树，所以我们可以看到下面这样的解构
```
...state
```
而不是
```
...state.todos
```
*至于怎么把reducer和他所能处理的state tree节点的关联我们在下面的store会介绍*
而action就是我们dispatch出来的由action creator构建的action对象。

Reducer export出来的这个函数，我们称之为reducer。每当一个action被dispatch之后，reducer这个函数就会执行。因为dispatch任何action都会触发reducer，所以在reducer里我们需要先判断action的type然后再做对应的操作。

#### reducer应该是一个纯函数
reducer的函数签名
```js
reducer(state,action)
```
第一个参数state是当前的状态，第二个参数是接收到的action对象。reducer函数要做的事情就是根据state和action的值产生一个新的对象返回。在**reducer里的返回值应该返回对应的state**，在我们这里也就是整个状态树的state.todos这个数组
*可以理解为action(state) === new state,然后return出这个new state。*

同时这个**reducer必须为一个纯函数**，所谓纯函数。也就是函数的输出应该完全由函数的输入决定。同样的输入必定返回同样的输出。不纯的函数可以理解为函数的输出要依赖于外部环境，同时函数会对外部环境产生改变（产生副作用）。而纯函数的意思好像也就是把外部环境也当作参数传入函数里面。**同时不能对传入的参数对象做更改**
```js
reducer(action)  //不纯，reducer函数里面会有this.state = {tid:id++}这类产生副作用的操作，对外部环境进行了改变
state.reducer(action)  //不纯, reducer里面也会有this.state.tid++这类的副作用，当你再次调用state.reducer(action)，即使传入相同的action，结果也不一样了
reducer(state,action) //纯，无副作用，不管调用多少次，只要state和action一致。返回的结果就一致
```
关于纯函数这里也可以参考这本书
[JS 函数式编程指南](https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)

我们TodoApp关于纯函数具体的例子
```js
//纯函数写法
case ADD_TODO: {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: action.done
                }
            ]
        }
```
```js
//非纯函数写法
case ADD_TODO: {
            return state.push({
                    id: action.id,
                    text: action.text,
                    done: action.done
                })
        }
```
非纯函数的写法看起来并没有错，但实际上是行不通的。产生错误的原因就是redux底层会对传进来旧的state和返回的新state进行比较，这个比较是一个浅比较（类似nextState!==previousState），也就是只比较新旧state对象的地址，如果使用state.push这种非纯函数的方法。那么新旧state对象的地址并没有改变。redux底层会认为hasChanged === false。也就是对象的state没有改变，而不更改state。

我猜测换成state.slice().push({id: action.id,text: action.text,done: action.done})就可以解决问题。(或者concat())

详情可以参考[(译)为什么Redux需要reducers是纯函数](https://mingjiezhang.github.io/2017/02/11/%E7%BF%BB%E8%AF%91-%E4%B8%BA%E4%BB%80%E4%B9%88Redux%E9%9C%80%E8%A6%81reducers%E6%98%AF%E7%BA%AF%E5%87%BD%E6%95%B0-md/)

### Store

```js
//F:\caistrong\react-demo\todo_app\src\Store.js
import {createStore, combineReducers} from 'redux'
import {filterTypes} from './filter'
import {todoReducer} from './todos/';
import {filterReducer} from './filter/';

//store初始状态树
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
```

Store这个文件主要的目的是产生应用状态树的存储仓库。

在我们的TodoApp应用中,关键点在于combineReducers和createStore这两个方法。

comibineReducers的作用是：**把相应reducer函数和其所能操作的state tree的节点关联起来**。假设我们想在todoReducer里去更改filter这个状态，就不行，实际上，todoReducer甚至没办法拿到这个状态，todoReducer里的reducer函数所传入的第一个参数state，实际上等同于state.todos.

而createStore就是创建出这个仓库的对象store了，第二个参数是preloadedState。也就是store的初始状态树。这个传入的preloadedState以及我们在reducer里使用的ES6 默认参数语法state = []之间的作用关系是我这几天遇到的一个小坑。简单讲就是**优先preloadedState，如果没有preloadedState，就使用ES6默认语法指定的[]作为初始状态**可以参考[redux文档 初始化State](https://cn.redux.js.org/docs/recipes/reducers/InitializingState.html)

### DataFlow 
我们的TodoApp的数据流如下所示
![](https://raw.githubusercontent.com/caistrong/Blog/master/_posts/react-todo/data-flow.png)

观察这个数据流图，发现我上面所讲的内容没有讲到Views和dispatch这部分。没关系，在下面马上就会涉及到。
## 第二阶段
index.js是应用程序的入口，我们先看下他的代码
### index.js
```js
//F:\caistrong\react-demo\todo_app\src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Store'
import './index.css';
import TodoApp from './TodoApp.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

```
我们在第一阶段开发的最终结果可以说就是创建了一个store对象，并export出来，我们在index.js这里导入了我们第一阶段的劳动成功store对象。并通过Provider的Props传入。这里的Provider实际上是使用了Context API，把我们的Store仓库放在一个整个App都可以访问到的Context(上下文环境)。所以我们的不管在哪一层次的组件都可以随时来这个Store里getState()。我们的组件也会subscribe这个Store，当Store状态树改变时更新视图。同时我们的组件也可以通过dispatch（action）的方式去改变整个App的状态树。在这里我们使用了`react-redux`这个npm包，这个包在我们的TodoApp里的另一个用处在于`connect`，下面会讲到。就如名字所言他是用来连接react和redux的。同时connect用来分离Dumb Component和Smart Component。避免我们书写太多模板代码。

### TodoApp
```js
//F:\caistrong\react-demo\todo_app\src\TodoApp.js
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
                <Fodos/>
            </div>
        )
    }
}

export default TodoApp
```
TodoAPP这里好像没什么好说的，他是一个简单的Dump Component。没有State、同时也无法dispatch(action)去更改状态树，纯粹是作为展示用的组件。同时他也是整个App的父组件。他需要依赖todos和filter这两个模块。

**注意！！！**
React判断一个元素是HTML元素还是React组件的原则就是看第一个字母是否是大写。
对于HTML和React组件，JSX在处理他们的时候有不同的逻辑
比如
```jsx
<div className="redStyle"></div>
```
React（JSX）处理上面这种代码的时候类似于
```html
<div class="redStyle"></div>
```
而假设我们有个组件Div
```jsx
<Div className="redStyle"></Div>
```
这个时候className会被当作是一个父组件传给子组件Div的一个prop。

### Todos Views

```js
//F:\caistrong\react-demo\todo_app\src\todos\views\Todos.js
import React from 'react'
import AddTodo from './AddTodo.js'
import TodoList from './TodoList.js'
import './style.css'

export default () => {
    return (
        <div className="todos">
            <AddTodo />
            <TodoList />
        </div>
    )
}
```
这个Todos Views也是一个纯粹为了展示的组件，他的重要作用其实也就是结构化，从结构上让应用显得更合理，同时也方便CSS来布局。实际上不要这个组件直接把AddTodo TodoList挂在TodoApp上也行的。至于要不要他，是软件设计上见仁见智的选择


#### AddTodo
```js
//F:\caistrong\react-demo\todo_app\src\todos\views\AddTodo.js
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
```
下面我挑一些重点做下记录

1. 
```js
this.onInputChange = this.onInputChange.bind(this)
```
我们在constructor里面的这句代码，是为了让我们在new 一个组件实例的时候，把这个函数内部的this绑定到这个组件对象实例上去。如果缺少了这个步骤，那么你在onInputChange这个函数里面的
```js
this.setState({
            value: event.target.value
        })
```
就会报'setState is not a function/undefined'之类的错误，原因就是this的错误指向
2. 
```jsx
<input className="add-todo-input" type="text" onKeyUp={this.onSubmit} onChange={this.onInputChange} />
```
这里的JSX代码的作用有点像我们在html中
```html
<input className="add-todo-input" type="text" onkeyup="onSubmit()" onchange="onInputChange()" />
```
不过又有不同之处
 - React框架在JSX中看到组件使用了onClick并没有产生直接使用onclick的html。而是很智能地使用了**事件委托**的方式来处理。
 - React控制了组件的生命周期所以不会导致内存泄漏

3. 
关于connect和 mapDispatchToProps 我在下面的组件讲。

#### TodoList
```js
//F:\caistrong\react-demo\todo_app\src\todos\views\TodoList.js
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
```

1. 
```jsx
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
```
在jsx里面，用{}括起来的，里面可以填写任意的javascript expression。不过也仅现expression(表达式)了。所以我们无法在这里使用while之类的语句。

2. 
**connect**
```js
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
```
我们可能会把一个完成某种功能的组件分离成两个组件，分别是Smart Component和Dumb Component。其中Smart负责管理状态，通过dispatch(action)去修改状态。而Dumb Componet就纯粹作为展示使用。

在我们这里TodoList就是那个Dumb Component。而我们export default出去的就是那个Smart Component。

在这个分离过程中connect需要做两件事。
- mapStateToProps(state，ownProps)
**把Store上的状态转化为内层Dumb Component的prop**
我们可以看到在TodoList的参数里面，我们接收并解构了传下来的所有prop。这些prop来自Smart Component的State，而这个State是从Store上getState()的结果，也就是我们这个函数的第一个参数的值，他是整个状态树的结果。我们这里state.todos和state.filter都取得到。
- mapDispatchToProps(dispatch,ownProps)
**把内层Dumb Component的用户动作转化为派送给Store的动作**
我们可以在文件头部那里import一些action creator，比如说这里的toggleTodo和removeTodo用以构建action对象以供dispatch函数派送。这个dispatch函数我们可以从参数中获取。

**通过mapStateToProps,mapDispatchToProps返回的两个对象最终会合并变成Dumb component的props**
所以我们可以看到在TodoList函数的参数里我们解构了这个对象{todos,onToggleTodo,onRemoveTodo}，用以render组件的视图。

关于第二个参数ownProps的作用我们在下面讲。

### Filters View

#### FiltersBar & Tag
```js
// F:\caistrong\react-demo\todo_app\src\filter\views\FiltersBar.js
import React from 'react'
import Tag from './Tag'
import {ALL,DONE,PENDING} from '../filterTypes'
import './style.css'


const FilterBar = () => {
    return (
        <nav>
            <ul className="tagbar">
            <Tag tag={ALL} tagName="全部"/>
            <Tag tag={DONE} tagName="完成"/>
            <Tag tag={PENDING} tagName="待办"/>
            </ul>
        </nav>
    )
}

export default FilterBar
```
```js
//F:\caistrong\react-demo\todo_app\src\filter\views\Tag.js
import React from 'react'
import {connect} from 'react-redux'
import {selectFilter} from '../actions'

const Tag = ({active,tag,tagName,onSelectFilter})=>{
    return(
        <div className="tag" onClick={()=>{onSelectFilter(tag)}} >
           <input className="tag-checkbox" id={tag} type="radio" value={tag} name="filter" checked={active}/>
           <label className="tag-label" for={tag} >{tagName}</label>
        </div>
    )
}

const mapStateToProps = (state, ownProps)=>{
    return {
        active: state.filter === ownProps.tag
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onSelectFilter: (filter)=>{
            dispatch(selectFilter(filter))
        } 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tag)
```
1. 
我们看下面这个函数
```js
// Tag.js下
const mapStateToProps = (state, ownProps)=>{
    return {
        active: state.filter === ownProps.tag
    }
}
```
这里我们用到了第二个参数ownProps
他的值就是引用我们这个Tag(Smart Component)的组件上面传递的props。
```js
// FiltersBar.js下
import Tag from './Tag'

<Tag tag={ALL} tagName="全部"/>
<Tag tag={DONE} tagName="完成"/>
<Tag tag={PENDING} tagName="待办"/>
```
这下上面那个函数的参数ownProps就会变成类似这样一个对象
```js
ownProps = {
    tag:"all",
    tagName:"全部"
}
```
我们的Tag(Dumb Component)就会接收到active这个prop,他的值有可能是true和false。代表着当前这个Tag(Smart Component)的一种状态，即当前他是否被选中。整个应用的状态树种的state.filters是不是他

## 第三阶段

第三阶段就是编写CSS了，在src/index.css这里编写一些CSS Reset。然后App.css编写TodoApp的一些样式。我们的开发使用了webpack，所以可以比如说在Todos.js里面直接使用import './style.css'来载入css。这种做法就是用CSS来写CSS模块。然后用JavaScript来CSS导入模块。和一些在CSS中@import的方式不同。同时我们的项目也没有使用stylus、scss、sass之类的预处理器。但是在实际项目中为了避免CSS的命名污染还有想要使用变量之类的应该考虑使用这些预处理器。具体怎么实现该应用的CSS样式我在这里不做介绍了，他也不是本文重点。我觉得CSS的学习重在尝试、多做多积累一些技巧、方式，自然而然也就会熟悉。除了一些基础知识外，"系统地去学习CSS"更像是一个伪命题。

## 完成！

#### 参考资料
《深入浅出React和Redux By程墨》