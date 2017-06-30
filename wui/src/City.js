import React, { Component } from 'react';
import './App.css';
import { Card, Grid, Label } from 'semantic-ui-react'
import CityForecast from './CityForecast';

/*
Class that handles City
Forecast is rendered as a popup
*/
class City extends Component {

    constructor(props) {
        super(props);

        this.state = { temp: 0, humidity: 0, main: '', desc: '' }
    }

    /*
    Get the weather details for the city
    */
    componentDidMount() {
        // Fetch the cities list
        console.log('Getting city details');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'JWT ' + this.props.token)
        var c = this.props.city;
        var home = this;
        var path = this.props.restHost + '/cities/' + c.id + '/get_weather/'
        fetch(path, {
          method: 'GET',
          headers: myHeaders,
          }).then(response => {
            console.log('Received response: ');
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                 this.setState({error: 'Failed to get weather data'})
            }
          })
          .then(function(data) {
            console.log('City Data: ');
            console.log(data.weather);
            home.setState({ temp: data.weather.main.temp,
                humidity: data.weather.main.humidity,
                main: data.weather.weather[0].main,
                desc: data.weather.weather[0].description })
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    render() {
    return (
      <Grid.Column>
      <Card centered>
        <Card.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12} textAlign='left'><h2>{this.props.city.city}</h2></Grid.Column>
                <Grid.Column width={3}>
                    <Label basic icon='delete' onClick={() => this.props.deleteCity(this.props.city)} />

                </Grid.Column>
              </Grid.Row>
            </Grid>
        </Card.Content>
        <Card.Content>
            <Grid columns="2" centered>
                <Grid.Column><Label basic><h3>{Math.round(this.state.temp)}{' '}&deg;F</h3>Temperature</Label></Grid.Column>
                <Grid.Column><Label basic><h3>{Math.round(this.state.humidity)}{' '}%</h3>Humidity</Label></Grid.Column>
            </Grid>
        </Card.Content>
        <Card.Content>
            <h4>{this.state.main}</h4>
            {this.state.desc}
        </Card.Content>
        <Card.Content extra>
            <CityForecast city={this.props.city} token={this.props.token} restHost={this.props.restHost} />
        </Card.Content>
      </Card>
      </Grid.Column>
    );
  }
}

export default City;