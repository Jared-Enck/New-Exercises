import React from 'react'

function Box({
    id,
    color,
    width,
    height,
    remove
}) {
    return (
        <div className='d-flex align-items-start'>
            <div 
                style={{
                    backgroundColor: color,
                    width: width,
                    height: height
                }}
                className='rounded shadow'
            >
            </div>
            <button 
                onClick={() => remove(id)} 
                className='btn btn-sm btn-danger ms-1 shadow'
            >
                X
            </button>
        </div>
    )
}

export default Box