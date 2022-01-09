import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import PrivateRoute from './Util/PrivateRoute';
import Login from './Pages/Login';
import Home from './Pages/Home';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {/*MAKE PRIVATE*/}
            <Route exact path = "/Home" component = {Home}/>
            <Route exact path = "/" component = {Login}/>
          </Switch>
        </Router>
      </React.Fragment>
      
    );
  }
  
}

export default App;
