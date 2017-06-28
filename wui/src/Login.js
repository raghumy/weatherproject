import React, { Component } from 'react';
import './App.css';
import { Form, Message, Card, Header, Grid } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom';

/*
Class that handles Login page
*/
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', error: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Handle change in user name
  handleUsernameChange(event) {
    this.setState({username: event.target.value})
    //console.log(this.state);
  }

  // Handle change in password
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
    //console.log(this.state);
  }

  handleClick(i) {
    console.log('Login button clicked:');
    console.log(this.state);
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    var l = this;
    fetch('/api-token-auth/', {
      method: 'POST',
      body: formData,
      }).then(response => {
        console.log('Received response');
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
             this.setState({error: 'Login Failed. Please check your Username and Password'})
        }
      })
      .then(function(data) {
        const t = data.token;
        console.log('Token: ' + t);
        l.props.onUserLogin({username: l.state.username, token: t});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const fireRedirect = this.props.loggedIn
    console.log("Login render: " + this.props.loggedIn);
    return (
      <Grid columns='1' verticalAlign='middle'>
        <Grid.Column>
          <Header dividing block textAlign='center'><h1>Weather Forecast</h1></Header>
          <Card centered>
              <Card.Content>
                  <Card.Header>User Login</Card.Header>
                  <Form onSubmit={() => this.handleClick()}>
                    <Form.Input label='User Name'
                        placeholder='Enter User Name'
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        />
                    <Form.Input label='Password'
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        />
                    {this.state.error &&
                        <Message
                          error
                          header='Error'
                          content={this.state.error}
                        />
                        }
                        {fireRedirect && (
                            <Redirect to={'/'}/>
                        )}
                    <Form.Button disabled={!this.state.username || !this.state.password}
                                        onClick={() => this.handleClick()}>Login</Form.Button>
                </Form>
            </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>

    );
  }
}

export default Login;