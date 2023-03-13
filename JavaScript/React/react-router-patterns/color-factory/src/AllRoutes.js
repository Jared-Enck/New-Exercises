import React from 'react';
import { Route, Routes } from 'react-router-dom'
import colors from './colors'
import ColorsContainer from './ColorsContainer';

function AllRoutes() {
    return (
        <Routes>
            <Route 
                path='/colors'
                element={<ColorsContainer colors={colors} />}
            />
            <Route 
                path='/colors/new'
            />
            <Route 
                path='/colors/:color'
            />
        </Routes>
    )
}

export default AllRoutes