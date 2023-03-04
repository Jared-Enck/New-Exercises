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
    return (
        <>
            <NewBoxForm addBox={addBox} />

            <div className='row mx-auto'>
                <div className='row mx-auto grid gap-4'>
                    {boxes.map(box => 
                        <Box 
                            key={uuid()}
                            color={box.color} 
                            width={box.width} 
                            height={box.height} 
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default BoxList