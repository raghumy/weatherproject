import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Card, Menu, Label } from 'semantic-ui-react'

class CityForecast extends Component {
  constructor(props) {
    super(props);

    this.state = { forecast: [], error: ''}
  }

    componentDidMount() {
        // Fetch the cities list
        console.log('Getting city forecast');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'JWT ' + this.props.token)
        var c = this.props.city;
        var home = this;
        var path = '/cities/' + c.id + '/get_forecast/'
        fetch(path, {
          method: 'GET',
          headers: myHeaders,
          }).then(response => {
            console.log('Received response: ');
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                 this.setState({error: 'Failed to get forecast'})
            }
          })
          .then(function(data) {
            console.log('Forecast: ');
            console.log(data.forecast);
            home.setState({ forecast: data.forecast.list })
          })
          .catch(function(error) {
            console.log(error);
          });
    }

  render() {
    const today = new Date().getDay();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //const nextdays = [1, 2, 4].map((s) => {return weekdays[(today+s)%7]});

    var items = this.state.forecast;
    if (items)
        items = items.slice(0, 4);
    const listItems = items.map((f, i) =>
        <Grid.Column>
            <Card centered>
                <Card.Content>
                    <h3>{weekdays[(today+i+1)%7]}</h3>
                </Card.Content>
                <Card.Content>
                    <Grid columns="2" centered>
                        <Label><h3>{Math.round(f.temp.max)}{' '}&deg;F</h3>High</Label>
                        <Label><h3>{Math.round(f.temp.min)}{' '}&deg;F</h3>Low</Label>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    <h4>{f.weather[0].main}</h4>
                    {f.weather[0].description}
                </Card.Content>
            </Card>
        </Grid.Column>
    );
    return (
      <Modal trigger={<Button color="blue">Forecast</Button>} closeIcon='close'>
        <Modal.Header><h1>{this.props.city.city}{' '}Forecast</h1></Modal.Header>
        <Modal.Content>
          <Grid columns="4" centered>
            {listItems}
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

export default CityForecast
