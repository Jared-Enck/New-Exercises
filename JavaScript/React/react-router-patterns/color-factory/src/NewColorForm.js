import React, {useState} from "react"

function NewColorForm({add, navigate}) {
    const [formData, setFormData] = useState({
        color: '',
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (formData.color) {
                add(formData)
                navigate('/colors')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                onChange={handleChange}
                name="color"
                value={formData.color}
                placeholder='Enter a color'
                type='text' 
            />
            <button>
                Add Color!
            </button>
        </form>
    )
}

export default NewColorForm