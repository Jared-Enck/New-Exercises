import React, {useState} from 'react'
import { v4 as uuid } from 'uuid'
import Box from './Box'
import NewBoxForm from './NewBoxForm'

function BoxList() {
    const [boxes, setBoxes] = useState([])
    
    const addBox = (box) => {
        const newBox = {...box, id: uuid()}
        setBoxes(boxes => [...boxes, newBox])
    }
    const removeBox = (id) => {
        setBoxes(boxes.filter(box => box.id !== id))
    } 

    return (
        <>
            <NewBoxForm addBox={addBox} />

            <div className='d-grid d-flex flex-row flex-wrap gap-4 ps-3'>
                {boxes.map(box => 
                    <Box 
                        key={box.id}
                        id={box.id}
                        color={box.color} 
                        width={box.width} 
                        height={box.height} 
                        remove={removeBox}
                    />
                )}
            </div>
        </>
    )
}

export default BoxList