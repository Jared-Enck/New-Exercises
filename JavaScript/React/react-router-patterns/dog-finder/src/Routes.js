import React from 'react';
import { Route, Switch } from 'react-router-dom'
import dogs from './dogs'

function Routes() {
    return (
        <Switch>
            <Route exact path="/dogs" >
                <DogList dogs={dogs} />
            </Route>
            {/* <Route path="/dogs/:name" >
                <DogDetails /> // what props will this need?
            </Route> */}
            <Redirect to="/dogs" />
        </Switch>
    )
}

export default Routes