import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, username: '', token: '' };
    this.renderHome = this.renderHome.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }
  handleUserLogin(data) {
    console.log('handleUserLogin data: ' + data);
    this.setState({username: data.username, loggedIn: true, token: data.token})
  }
  handleUserLogout() {
    this.setState({username: '', loggedIn: false, token: '' })
  }
  renderHome() {
    console.log("renderHome called");
    console.log(this.state);
    return (
        this.state.loggedIn ? (
                <Home state={this.state} />
              ) : (
                <Redirect to="/login"/>
              )
    );
  }
  renderLogin() {
    return (
        <Login loggedIn={this.state.loggedIn} onUserLogin={(h) => this.handleUserLogin(h)}/>
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
