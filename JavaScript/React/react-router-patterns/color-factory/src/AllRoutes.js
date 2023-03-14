import React, {useState} from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import ColorsContainer from './ColorsContainer';
import NewColorForm from './NewColorForm';
import Color from './Color';
import listColors from './colors'

function AllRoutes() {
    const navigate = useNavigate()
    const [listOfColors, setListOfColors] = useState(listColors)

    const addColor = (data) => {
        setListOfColors([...listOfColors, data.color])
    }
    return (
        <Routes>
            <Route 
                path='*' 
                element={<Navigate to='/colors' />}
            />
            <Route path='/colors'>
                <Route 
                    index element={
                        <ColorsContainer colors={listOfColors} />
                    }
                />
                <Route 
                    path='new'
                    element={
                        <NewColorForm 
                            add={addColor} 
                            navigate={navigate} 
                        />
                    }
                />
                <Route 
                    path=':color'
                    element={<Color />}
                />
            </Route>
        </Routes>
    )
}

export default AllRoutes