import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PhotoPage from './pages/PhotoPage';


   
export default class Router extends React.Component {
    render(){
    
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={props=><HomePage {...props}/>} />
                    <Route path="/camera" component={props=><PhotoPage {...props} />} />
                </Switch>
            </div>
        )
    }
}