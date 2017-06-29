import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Message, Card, Header, Grid, Button, Icon, Label, Menu } from 'semantic-ui-react'
import CityForecast from './CityForecast';

/*
Class that handles Home page
*/
class City extends Component {

    constructor(props) {
        super(props);

        this.state = { temp: 0, humidity: 0, main: '', desc: '' }
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
        <Card.Header>
            <Menu borderless>
                <Menu.Item borderless>
                        <h2>{this.props.city.city}</h2>
                </Menu.Item>
                <Menu.Menu  borderless compact position='right'>
                    <Menu.Item onClick={() => this.props.deleteCity(this.props.city)}>
                        <Icon name='delete' label='Delete'/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Card.Header>
        <Card.Content>
            <Grid columns="2" centered>
                <Grid.Column><Label basic><h3>{this.state.temp}{' '}&deg;F</h3>Temperature</Label></Grid.Column>
                <Grid.Column><Label basic><h3>{this.state.humidity}{' '}%</h3>Humidity</Label></Grid.Column>
            </Grid>
        </Card.Content>
        <Card.Content>
            <h4>{this.state.main}</h4>
            {this.state.desc}
        </Card.Content>
        <Card.Content extra>
            <CityForecast city={this.props.city} token={this.props.token} />
        </Card.Content>
      </Card>
      </Grid.Column>
    );
  }
}

export default City;