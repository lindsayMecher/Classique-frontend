import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     email: "",
  //     password: ""
  //   }
  // }
  //
  //
  // handleLogin = (e, props) => {
  //   e.preventDefault()
  //   axios.post('/getToken', {
  //     email: this.state.email,
  //     password: this.state.password
  //   })
  //     .then(resp => localStorage.setItem('cool-jwt', resp.data))
  // }
  //
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  //   console.log(e.target.value)
  // }

  render(){
    return(
      <div className="home">
        <h1>Classical Singer Connection</h1>
        <h2>Enter email and password to log in.</h2>
        <form onSubmit={(event, props) => this.props.handleLogin(event, this.props)} className="login">
          <label>E-mail:
            <input onChange={this.props.handleChange} type="text" name="email" value={this.props.email} />
          </label><br/>
          <label>Password:
            <input onChange={this.props.handleChange} type="password" name="password" value={this.props.password} />
          </label><br/>
          <input type="submit" name="login" value="Log In!" />
        </form>
        <h2>New here?</h2>
        <Link to ="/signup">Sign Up!</Link>
      </div>
    )
  }
}

export default Home;
