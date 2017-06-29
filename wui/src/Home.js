import React, { Component } from 'react';
import './App.css';
import City from './City';
import { Form, Message, Card, Header, Grid, Button, Container, Divider } from 'semantic-ui-react'

/*
Class that handles Home page
*/
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { cities: [], newCity: '', error: ''}
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewCity = this.handleNewCity.bind(this);
    this.handleNewCityChange = this.handleNewCityChange.bind(this);
    this.handleDeleteCity = this.handleDeleteCity.bind(this);
  }

  handleLogout() {
    this.props.onUserLogout()
  }

  handleNewCityChange(e) {
    this.setState({newCity: e.target.value, error: ''});
  }

  handleNewCity() {
    console.log('Add new city ' + this.state.newCity);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + this.props.state.token)
    const formData = new FormData();
    formData.append('user', this.props.state.userid);
    formData.append('city', this.state.newCity);
    var home = this;
    fetch(this.props.state.restHost + '/cities/', {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      }).then(response => {
        console.log('Received response: ');
        console.log(response);
        if (response.ok) {
            this.componentDidMount();
        } else {
            this.setState({error: 'Failed to add City'});
            throw new Error('Failed to add City');
        }
      })
      .catch(function(error) {
        home.setState({error: 'Failed to add City'});
        console.log(error);
      });
  }

  handleDeleteCity(city) {
    console.log('Delete city ');
    console.log(city);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + this.props.state.token)
    const formData = new FormData();
    formData.append('user', this.props.state.userid);
    formData.append('city', city.id);
    fetch(this.props.state.restHost + '/cities/'+ city.id + '/', {
      method: 'DELETE',
      headers: myHeaders,
      body: formData,
      }).then(response => {
        console.log('Received response: ');
        console.log(response);
        if (response.ok) {
            this.setState({newCity: '', error: ''})
            this.componentDidMount();
        } else {
            this.setState({error: 'Failed to delete City'})
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    // Fetch the cities list
    console.log('Getting list of cities');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'JWT ' + this.props.state.token)
    var home = this;
    fetch(this.props.state.restHost + '/cities/', {
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
        home.setState({error: 'Failed to get list of cities'})
      });
  }

  render() {
    const cities = this.state.cities;
    const listItems = cities.map((c) =>
        <City city={c} token={this.props.state.token} restHost={this.props.state.restHost}  deleteCity={(c) => this.handleDeleteCity(c)}/>
    );
    console.log('Home.render');
    console.log(listItems);
    console.log(this.state);
    return (
        <div>
          <Container textAlign='center'>
            <Header block><h1>Weather Forecast</h1>
            <Grid columns="2">
                <Grid.Column textAlign='left'>Welcome {this.props.state.username}</Grid.Column>
                <Grid.Column textAlign='right'><Button onClick={() => this.handleLogout()}>Logout</Button></Grid.Column>
            </Grid>
            </Header>
          </Container>
          <Divider hidden />
          <Grid columns="1" centered padded>
              <Form onSubmit={() => this.handleNewCity()} >
                <Form.Group inline>
                    <Form.Input label='New City'
                        placeholder='Enter City Name'
                        value={this.state.newCity}
                        onChange={this.handleNewCityChange}
                    />
                    <Form.Button>Add</Form.Button>
                </Form.Group>
              </Form>
            </Grid>

             {this.state.error &&
            <Card centered>
            <Message
                          error
                          header='Error'
                          content={this.state.error}
                        />
            </Card>
            }

            <Grid columns='4' stackable stretched centered>
             {listItems}
            </Grid>
        </div>
    );
  }
}

export default Home;