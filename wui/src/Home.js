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
    fetch('/cities/', {
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
    var home = this;
    fetch('/cities/'+ city.id + '/', {
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
        home.setState({error: 'Failed to get list of cities'})
      });
  }

  render() {
    const cities = this.state.cities;
    const listItems = cities.map((c) =>
        <City city={c} token={this.props.state.token} deleteCity={(c) => this.handleDeleteCity(c)}/>
    );
    console.log('Home.render');
    console.log(listItems);
    console.log(this.state);
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
            <Grid columns="1" centered>
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
            <Grid columns="3" centered>
            <Message
                          error
                          header='Error'
                          content={this.state.error}
                        />
            </Grid>
            }
        </div>
    );
  }
}

export default Home;