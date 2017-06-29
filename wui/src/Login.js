import React, { Component } from 'react';
import './App.css';
import { Form, Message, Card, Header, Grid, Label } from 'semantic-ui-react'
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
            this.setState({error: 'Please check your Username and Password'})
            throw new Error('Login Failed');
        }
      })
      .then(function(data) {
        const t = data.token;
        console.log('Token: ' + t);
        l.props.onUserLogin({username: l.state.username, token: t, userid: data.user.id});
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
          <Header dividing block textAlign='center'>
            <Label basic><h1>Weather Forecast</h1></Label>
          </Header>
          <Form onSubmit={() => this.handleClick()}>
          <Card centered>
              <Card.Content>
                  <Grid columns="1" centered padded>
                    <h2>User Login</h2>
                  </Grid>
              </Card.Content>
              <Card.Content>


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
                        {fireRedirect && (
                            <Redirect to={'/'}/>
                        )}
               </Card.Content>
               <Card.Content>
                    <Grid columns="1" centered padded>
                        <Form.Button color="blue" disabled={!this.state.username || !this.state.password}
                                        onClick={() => this.handleClick()}>Login</Form.Button>
                    </Grid>
               </Card.Content>
        </Card>
        </Form>
                {this.state.error &&
                    <Card centered>
                        <Message
                          error
                          header='Login Failed'
                          content={this.state.error}
                        />
                        </Card>
                }

      </Grid.Column>
    </Grid>

    );
  }
}

export default Login;