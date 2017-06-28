import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import City from './City';
import { Button, Form, FormControl, FormGroup, Panel, Row, Col, ControlLabel, Grid, PageHeader } from 'react-bootstrap';

/*
Class that handles Home page
*/
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { cities: [] }
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
     <Grid>
        <PageHeader>Weather App</PageHeader>
        <div>
            <p>Welcome {this.props.state.username}</p>

        </div>
        <FormGroup>
         {listItems}
         </FormGroup>
     </Grid>
    );
  }
}

export default Home;