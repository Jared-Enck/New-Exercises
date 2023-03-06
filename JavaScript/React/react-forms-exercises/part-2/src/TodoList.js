import React, {useState} from 'react'
import { v4 as uuid } from 'uuid'
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'

function TodoList() {
    const [todos, setTodos] = useState([])

    const add = (todo) => {
        const newTodo = {...todo, id: uuid()}
        setTodos(todos => [...todos, newTodo])
    }

    const remove = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className='row mx-auto justify-content-center'>
            <h2 className='text-primary'>
                Todo List
            </h2>
            <hr></hr>
            <NewTodoForm add={add} />

            <ul className='list-group col-4 shadow-sm p-0'>
                {todos.map(todo => 
                    <Todo 
                        key={todo.id}
                        id={todo.id}
                        text={todo.todo}
                        remove={remove}
                    />
                )}
            </ul>
        </div>
    )
}

export default TodoList