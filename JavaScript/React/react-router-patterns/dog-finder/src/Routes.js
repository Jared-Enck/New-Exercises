import React from 'react';
import { Route, Switch } from 'react-router-dom'

function Routes() {
    return (
        <Switch>
            <Route exact path="/dogs" >
                <DogList /> // what props will this need?
            </Route>
            <Route path="/dogs/:name" >
                <DogDetails /> // what props will this need?
            </Route>
            <Redirect to="/dogs" />
        </Switch>
    )
}

export default Routes