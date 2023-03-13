import React from 'react';
import { Route, Routes } from 'react-router-dom'
import DogList from './Doglist';
import DogDetails from './DogDetails'

function AllRoutes({dogs}) {
    return (
        <Routes>
            <Route 
                path="dogs" 
                element={<DogList dogs={dogs} />} 
            />
            <Route 
                path="/dogs/:name" 
                element={<DogDetails />}
            />
        </Routes>
    )
}

export default AllRoutes