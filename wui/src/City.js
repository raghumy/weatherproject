import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Message, Card, Header, Grid, Button, Icon, Label } from 'semantic-ui-react'
import CityForecast from './CityForecast';

/*
Class that handles Home page
*/
class City extends Component {

    constructor(props) {
        super(props);

        this.state = { temp: 0, humidity: 0, desc: '' }
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
            console.log('City Data: ');
            console.log(data.weather);
            home.setState({ temp: data.weather.main.temp,
                humidity: data.weather.main.humidity,
                desc: data.weather.weather[0].main })
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
        <Card.Content>
            <Grid columns="2" centered>
                <div><h3>{this.state.temp}{' '}&deg;C</h3>Temperature</div>
                <div><h3>{this.state.humidity}{' '}%</h3>Humidity</div>
            </Grid>
        </Card.Content>
        <Card.Content><h4>{this.state.desc}</h4></Card.Content>
        <Card.Content extra>
        <CityForecast city={this.props.city} token={this.props.token} />
        <Icon link name='delete' bordered label='Delete' onClick={() => this.props.deleteCity(this.props.city)}/>
        </Card.Content>
      </Card>
      </Grid.Column>
    );
  }
}

export default City;