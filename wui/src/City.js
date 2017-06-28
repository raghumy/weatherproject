import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form, FormControl, FormGroup, Panel, Row, Col, ControlLabel, Grid, Label, ListGroup, ListGroupItem, Well } from 'react-bootstrap';

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
      <Panel header={this.props.city.city}>
        <Grid>
            <Row>
                <Col sm={4} md={2}>
                    <Well>
                     <span>Today</span>
                     <h1>{this.state.temp}&deg;C</h1>
                     <h2>{this.state.humidity} %</h2>
                    </Well>
                </Col>
                <Col sm={4} md={2}>
                    <Well>
                     <span>Tomorrow</span>
                     <h1>{this.state.temp}&deg;C</h1>
                     <h2>{this.state.humidity} %</h2>
                    </Well>
                </Col>
            </Row>
        </Grid>
      </Panel>
    );
  }
}

export default City;