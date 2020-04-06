import React from 'react';

import { Link } from 'react-router-dom';
const USERS = "http://localhost:3000/users";
const POSTS = "http://localhost:3000/posts";

class Auth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: undefined
    }
  }

  render(){
    return(
      <div className="auth">
        auth
      </div>
    )
  }
}

export default Auth;
