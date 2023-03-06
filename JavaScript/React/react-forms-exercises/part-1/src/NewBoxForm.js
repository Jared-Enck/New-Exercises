import React, {useState} from 'react'

function NewBoxForm({addBox}) {
    const INITIAL_STATE = {
        color: "",
        width: "",
        height: ""
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
        addBox(formData)
        setFormData(INITIAL_STATE)
        document.getElementById('color').focus()
    }
    
    return (
        <div className='row mx-auto'>
            <div className='col-6'>
                <form 
                    onSubmit={handleSubmit}
                    className='form-control mb-3 shadow-sm bg-light'
                >
                    <label htmlFor='color'>
                        Color
                    </label>
                    <input
                        id='color'
                        type='text'
                        name='color'
                        placeholder='Enter a Color'
                        className='form-control mb-2'
                        onChange={handleChange}
                        value={formData.color}
                        autoFocus
                    />
                    <label htmlFor='width'>
                        Width
                    </label>
                    <input
                        type='text'
                        name='width'
                        placeholder='Enter width ex: 100px'
                        className='form-control mb-2'
                        onChange={handleChange}
                        value={formData.width}
                    />
                    <label htmlFor='height'>
                        Height
                    </label>
                    <input
                        type='text'
                        name='height'
                        placeholder='Enter height ex: 100px'
                        className='form-control mb-2'
                        onChange={handleChange}
                        value={formData.height}
                    />
                    <button className='btn btn-medium btn-primary'>
                        Add Box!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewBoxForm