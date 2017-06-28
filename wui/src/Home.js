import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import City from './City';
import { Form, Message, Card, Header, Grid, Button } from 'semantic-ui-react'

/*
Class that handles Home page
*/
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { cities: [] }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onUserLogout()
  }

  componentDidMount() {
    // Fetch the cities list
    console.log('Getting list of cities');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + this.props.state.token)
    var home = this;
    fetch('/cities/', {
      method: 'GET',
      headers: myHeaders,
      }).then(response => {
        console.log('Received response: ');
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
             this.setState({error: 'Failed to get list of cities'})
        }
      })
      .then(function(data) {
        console.log('Cities: ' + data);
        home.setState({ cities: data })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const cities = this.state.cities;
    const listItems = cities.map((c) =>
        <City city={c} token={this.props.state.token} />
    );
    console.log('Home.render');
    console.log(listItems);
    return (
        <div>
          <Header dividing block textAlign='center'>
            <h1>Weather Forecast</h1>
          </Header>
          <Header textAlign='left'>Welcome {this.props.state.username}
            {' '}<Button basic onClick={() => this.handleLogout()}>Logout</Button></Header>
            <Grid columns='2' centered>
             {listItems}
            </Grid>
        </div>
    );
  }
}

export default Home;