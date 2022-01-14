import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import PrivateRoute from './Util/PrivateRoute';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Wallet from './Pages/Wallet';
import Search from './Pages/Search';
import Account from './Pages/Account';
import Transactions from './Pages/Transactions';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {/*MAKE PRIVATE*/}
            <Route exact path = "/" component = {Login}/>
            <Route exact path = "/Home" component = {Home}/>
            <Route exact path = "/Wallet" component = {Wallet}/>
            <Route exact path = "/Search" component = {Search}/>
            <Route exact path = "/Transactions" component = {Transactions}/>
            <Route exact path = "/Account" component = {Account}/>
          </Switch>
        </Router>
      </React.Fragment>
      
    );
  }
  
}

export default App;
