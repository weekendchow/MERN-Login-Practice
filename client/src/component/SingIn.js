import React, { Component } from 'react';
import { setInStorage } from '../utils/storage';
import { signinApi } from '../utils/APIhelper'

class SignIn extends Component {
  state = {
    isLoading: false,
    signInError: '',
    signInEmail: '',
    signInPassword: '',
  }

  onTextboxChangeSignInEmail = e => {
    this.setState({
      signInEmail: e.target.value,
    });
  }

  onTextboxChangeSignInPassword = e => {
    this.setState({
      signInPassword: e.target.value,
    });
  }

  onSignIn = e => {
    e.preventDefault();
    //Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true
    })
    //POST request to backend
    signinApi(signInEmail, signInPassword)
      .then(json => {
        if(json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }

      });
  }

  render() {
    const {
      isLoading,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if(isLoading)
      return(<div><p>Loading...</p></div>);

    return(
      <div>
        {
          (signInError) ? (
            <p>{signInError}</p>
          ) : (null)
        }
      <p>Sign In</p>
        <input
          type="email"
          placeholder="Email"
          value={signInEmail}
          onChange={this.onTextboxChangeSignInEmail}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={signInPassword}
          onChange={this.onTextboxChangeSignInPassword}
          />
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
      </div>
    )
  }
}


export default SignIn;
