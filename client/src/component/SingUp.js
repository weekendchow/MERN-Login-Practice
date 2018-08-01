import React, { Component } from 'react';
import { signupApi } from '../utils/APIhelper'

class SignUp extends Component {
  state = {
    isLoading: false,
    signUpError: '',
    signUpFirstName: '',
    signUpLastName: '',
    signUpEmail: '',
    signUpPassword: '',
  }

  onTextboxChangeSignUpEmail = e => {
    this.setState({
      signUpEmail: e.target.value,
    });
  }

  onTextboxChangeSignUpPassword = e => {
    this.setState({
      signUpPassword: e.target.value,
    });
  }

  onTextboxChangeSignUpFirstName = e => {
    this.setState({
      signUpFirstName: e.target.value,
    });
  }

  onTextboxChangeSignUpLastName = e => {
    this.setState({
      signUpLastName: e.target.value,
    });
  }
  onSignUp = e => {
    e.preventDefault();
    //Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true
    })
    //POST request to backend
    signupApi(signUpFirstName, signUpLastName, signUpEmail, signUpPassword)
      .then(json => {
        console.log('json', json);
        if(json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpLastName: '',
            signUpFirstName: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }

      });
  }

  render() {
    const {
      isLoading,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    if(isLoading)
      return(<div><p>Loading...</p></div>);

    return(
      <div>
      {
        (signUpError) ? (
          <p>{signUpError}</p>
        ) : (null)
      }
        <p>Sign Up</p>
        <input
          type="text"
          placeholder="First Name"
          value={signUpFirstName}
          onChange={this.onTextboxChangeSignUpFirstName}
          />
          <br />
        <input
          type="text"
          placeholder="Last Name"
          value={signUpLastName}
          onChange={this.onTextboxChangeSignUpLastName}
          />
          <br />
        <input
          type="email"
          placeholder="Email"
          value={signUpEmail}
          onChange={this.onTextboxChangeSignUpEmail}
          />
          <br />
        <input
          type="password"
          placeholder="Password"
          value={signUpPassword}
          onChange={this.onTextboxChangeSignUpPassword}
          />
          <br />
        <button onClick={this.onSignUp}>Sign Up</button>
      </div>
    )
  }
}

export default SignUp
