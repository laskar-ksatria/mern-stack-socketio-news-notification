import React from 'react';
import "./App.css";
import Register from './views/Register';
import Login from './views/Login';
import Main from './views/Main';
import { withRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('merntoken')) {
      this.props.history.push('/main')
    }else {
      if (this.props.location.pathname === '/register') {
        this.props.history.push(this.props.location.pathname);
      }else {
        this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      
        <div className="App">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/main">
                <Main />
              </Route>
            </Switch>
        </div>
    )
  }

}

export default withRouter(App);