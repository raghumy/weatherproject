import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Message, Card, Header, Grid } from 'semantic-ui-react'

/*
Class that handles Home page
*/
class City extends Component {

    constructor(props) {
        super(props);

        this.state = { temp: 0, humidity: 0 }
    }

    componentDidMount() {
        // Fetch the cities list
        console.log('Getting city details');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'JWT ' + this.props.token)
        var c = this.props.city;
        var home = this;
        var path = '/cities/' + c.id + '/get_weather/'
        fetch(path, {
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
            home.setState({ temp: data.weather.main.temp, humidity: data.weather.main.humidity })
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    render() {
    return (
      <Grid.Column>
      <Card centered>
        <Card.Header><h2>{this.props.city.city}</h2></Card.Header>
        <Card.Meta>Today</Card.Meta>
        <Card.Content>Temperature<h3>{this.state.temp}&deg;C</h3></Card.Content>
        <Card.Content>Humidity<h4>{this.state.humidity} %</h4></Card.Content>
      </Card>
      </Grid.Column>
    );
  }
}

export default City;