import React, { Component } from 'react';
import './App.css';
import { Grid, PageHeader, Button, Form, FormControl, FormGroup, Panel, ControlLabel, HelpBlock, Row, Col, Alert } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <Row align="middle">
            <Col xs={1} md={4}></Col>
            <Col sm={4}>
                <FormGroup controlId={id}>
                  <ControlLabel>{label}</ControlLabel>
                  <FormControl {...props} />
                  {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            </Col>
            <Col xs={1} md={4}></Col>
         </Row>

    );
}

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
      <Grid>
        <PageHeader>Weather App</PageHeader>
        <FormGroup controlId="formUsername" >
            <FieldGroup
                        id="formControlsUserName"
                      type="email"
                      label="User Name"
                      placeholder="Enter User Name"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
            <FieldGroup
                      id="formControlsPassword"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
            {this.state.error &&
                <Row>
                    <Col xs={1} md={3}></Col>
                    <Col md={6} >
                    <Alert bsStyle="danger">
                        {this.state.error}
                    </Alert>
                    </Col>
                    <Col xs={1} md={3}></Col>
                </Row>
            }
            {fireRedirect && (
                <Redirect to={'/'}/>
            )}
            <FormGroup>
                <Row align="middle">
                    <Col xs={1} md={5}></Col>
                    <Col md={2} >
                    <Button bsStyle="primary" block
                            disabled={!this.state.username || !this.state.password}
                            onClick={() => this.handleClick()}>
                        Login
                      </Button>
                    </Col>
                    <Col xs={1} md={5}></Col>
                </Row>
          </FormGroup>
        </FormGroup>
      </Grid>
    );
  }
}

export default Login;