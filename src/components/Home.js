import React from 'react';
import { Link } from 'react-router-dom';
const API = "http://localhost:3000";

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }


  handleLogin = (e, props) => {
    //  scrape form data and send it to the back end for authentication
    //  send a request to the backend with this email and password, back end will check if this is a valid email and password,
    //  if yes send the object back to front end and save in redux store, else send a message letting the user know it's incorrect credentials

    e.preventDefault()
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    fetch(`${API}/auth`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          alert(data.error)
        } else {
          this.props.updateUser(data)
          localStorage.setItem('token', data.token)
          // token is also expected from the backend, update localStorage to have this token.
          this.props.history.push('/dashboard')
        }
        //  check if user was authenticated on the back end. if yes, save that user to the store state
        // then redirect to /dashboard page.
        // if invalid credentials, display message to user.
      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div className="home">
        <h1>Classical Singer Connection</h1>
        <h2>Enter email and password to log in.</h2>
        <form onSubmit={(event, props) => this.handleLogin(event, this.props)} className="login">
          <label>E-mail:
            <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
          </label><br/>
          <label>Password:
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
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
