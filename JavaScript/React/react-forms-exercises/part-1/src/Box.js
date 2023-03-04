import React from 'react'

function Box({color,width,height}) {
    return (
        <div 
        style={{
            backgroundColor: color,
            width: width,
            height: height
        }}
        className='rounded shadow'
        ></div>
    )
}

export default Box