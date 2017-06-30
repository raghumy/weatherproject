import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';

/*
Main Application Component that maintains the global state and the user
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { restHost: process.env.REACT_APP_REST_HOST, loggedIn: false, username: '', token: '' , userid: 0};
    console.log('REST_HOST: ' + this.state.restHost);
    this.renderHome = this.renderHome.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }
  handleUserLogin(data) {
    console.log('handleUserLogin data: ');
    console.log(data);
    this.setState({username: data.username, loggedIn: true, token: data.token, userid: data.userid})
  }
  handleUserLogout() {
    this.setState({username: '', loggedIn: false, token: '', userid: 0})
  }
  renderHome() {
    console.log("renderHome called");
    console.log(this.state);
    return (
        this.state.loggedIn ? (
                <Home state={this.state} onUserLogout={(h) => this.handleUserLogout(h)}/>
              ) : (
                <Redirect to="/login"/>
              )
    );
  }
  renderLogin() {
    return (
        <Login restHost={this.state.restHost} loggedIn={this.state.loggedIn} onUserLogin={(h) => this.handleUserLogin(h)}/>
    );
  }
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" render={this.renderHome} />
                <Route path='/login' render={this.renderLogin} />
            </div>
        </Router>
    );
  }
}

export default App;
