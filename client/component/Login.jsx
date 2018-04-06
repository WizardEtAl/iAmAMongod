import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

  }

  onChangeHandler (e) {
    this.setState(
      { [e.target.name]: e.target.value}
    );
    console.log('this is state', this.state);
  }

  onSignUpHandler() {
    console.log('fired sign up handler');
    const payload = {
      username: this.state.username,
      password: this.state.password    
    };
    axios.post('/api/user/signup', payload)
      .then( response => {
        console.log('Server replied with ...', response );
      })
      .catch( err => {
        console.log('Server errored with ...', err);
      });
  }

  onLoginHandler () {
    console.log('fired login handler');
    axios.get(`/api/user/login/${this.state.username}/${this.state.password}`)
      .then( response => {
        console.log('Server replied with ...', response );
        console.log('is logged in?', response.status === 202 );
        response.status === 202 && this.props.toggleLoggedIn();
      })
      .catch( err => {
        console.log('Server errored with ...', err);
      });   
  }

  render() {
    return (
      <div>
        <div>Username: </div>
        <input name='username' onChange={this.onChangeHandler.bind(this)}/>
        <br/><br/>
        <div>Password: </div>
        <input name='password' type='password' onChange={this.onChangeHandler.bind(this)}/>
        <br/><br/>
        <button onClick={this.onSignUpHandler.bind(this)}>Sign Up</button>
        <button onClick={this.onLoginHandler.bind(this)}>Login</button>
      </div>
    );
  }
}

export default Login;