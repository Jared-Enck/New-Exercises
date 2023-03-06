import React, {useState} from 'react'

function NewTodoForm({add}) {
    const INITIAL_STATE = {
        todo: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        add(formData)
        setFormData(INITIAL_STATE)
        document.getElementById('todo').focus()
    }

    return (
        <div className='row mx-auto justify-content-center'>
            <div className='col-6'>
                <form 
                    onSubmit={handleSubmit}
                    className='form-control mb-3 shadow-sm bg-light'
                >
                    <label htmlFor='todo' className='form-label'>
                        Todo
                    </label>
                    <input
                        id='todo'
                        type='text'
                        name='todo'
                        placeholder='Enter a Todo'
                        className='form-control mb-2'
                        onChange={handleChange}
                        value={formData.todo}
                        autoFocus
                    />
                    <button className='btn btn-medium btn-primary'>
                        Add Todo!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTodoForm