import React, { Component } from 'react';
import { getFromStorage } from '../utils/storage';

import { verifyApi, logoutApi } from '../utils/APIhelper';
import SignIn from './SingIn';
import SignUp from './SingUp';


class Home extends Component {
  state = {
    isLoading: true,
    token: '',
  };

  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      // verify token
      verifyApi(token)
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

  logout = e => {
    this.setState({
      isLoading: true
    })
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token) {
      const { token } = obj;
      // verify token
      logoutApi(token)
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
    } = this.state;

    if(isLoading)
      return(<div><p>Loading...</p></div>);


    if(!token)
      return (
        <div>
          <SignIn/>
          <SignUp/>
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
