import React from 'react'

function Todo({id, text, remove}) {
    const capsFirstLetters = (str) => {
        return str.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
    const newText = capsFirstLetters(text)
    return (
        <li className='d-flex flex-grow list-group-item bg-light'>
            <span className='flex-grow-1'>
                {newText}
            </span>
            <button 
                onClick={() => remove(id)}
                className='btn btn-sm btn-danger'
            >
                X
            </button>
        </li>
    )
}

export default Todo