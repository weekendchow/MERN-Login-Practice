import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../utils/storage';

class Home extends Component {
  state = {
    isLoading: true,
    token: '',
    signUpError: '',
    signInError: '',
    signInEmail: '',
    signInPassword: '',
    signUpFirstName: '',
    signUpLastName: '',
    signUpEmail: '',
    signUpPassword: ''
  };

  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
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

  onSignIn = e => {
    //Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true
    })
    //POST request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);
        if(json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }

      });
  }

  onSignUp = e => {
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
    fetch('/api/account/signup', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      })
    })
      .then(res => res.json())
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

  logout = e => {
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render(){
    const {
      isLoading,
      token,
      signInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    if(isLoading)
      return(<div><p>Loading...</p></div>);


    if(!token)
      return (
        <div>
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
              <button onClick={this.onSignIn}>Sign Up</button>
          </div>
          <br />
          <br />
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
        </div>
      );


    return(
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }


}

export default Home;
