import React from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Edituser from './components/Edituser';
import New from './components/New';
import Favorites from './components/Favorites';
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
const USERS = "http://localhost:3000/users";
const POSTS = "http://localhost:3000/posts";
const FAVORITES = "http://localhost:3000/favorites";

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      users: [],
      posts: [],
      favorites: [],
      loggedUser: null,
      first_name: "",
      last_name: "",
      headshot: "",
      resume: "",
      degree: "",
      institution: "",
      website: "",
      voice_type: "",
      email: "",
      password: "",
      biography: "",

    }
  }

  componentDidMount(){
    fetch(USERS)
      .then(resp => resp.json())
      .then(users => {
        this.setState({
          ...this.state,
          users: users
        })
      })
      .catch(err => console.log(err))

  }

  fetchPosts = () => {
    fetch(POSTS)
      .then(resp => resp.json())
      .then(posts => console.log(posts))
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  handleLogin = (e, props) => {
    e.preventDefault()
    console.log("EVENT", e)
    console.log("PROPS", props)
    // collect the email and password from the form, then check if the email matches a user email, then check that the password for that same user is the one entered. If both match, then redirect to their dashboard.
    const email = e.target.email.value.toLowerCase()
    const password = e.target.password.value.toLowerCase()
    const filteredUser = this.state.users.filter(user => user.email.toLowerCase() === email)
    if (filteredUser[0] == undefined) {
      alert("Not a valid email")
      return
    } else {
      const userObj = filteredUser[0]
      const digest = userObj.password_digest
      // find a way to verify password digest!
      this.setState({
        ...this.state,
        loggedUser: userObj,
        favorites: userObj.favorited_posts
      })
    }
    props.history.push('/dashboard')
  }

  handleLogOut = (e, props) => {
    console.log(e.target)
    this.setState({
      posts: [],
      favorites: [],
      email: "",
      password: "",
      loggedUser: null
    })
    window.location.href = "http://localhost:3001/"
  }

  handleSignup = (e, props) => {
    // scrape form data and save it into an object to post to the db as a new user.
    e.preventDefault()
    const first_name = e.target.first_name.value
    const last_name = e.target.last_name.value
    const voice_type = e.target.voice_type.value
    const email = e.target.email.value
    const password = e.target.password.value
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        voice_type: voice_type,
        email: email,
        password_digest: password
      })
    }
    fetch(USERS, reqObj)
      .then(resp => resp.json())
      .then(users => {
        this.setState({
          ...this.state,
          users: users,
          first_name: "",
          last_name: "",
          voice_type: "",
          email: "",
          password: ""
        })
      })
      .catch(err => console.log(err))
      e.target.reset()
      props.history.push('/dashboard')
  }

  addToFavorites = (e, post) => {
    //patch to add this post to users favorites
    // create a new instance of favorite with the logged user ID and the post id.
    console.log("ADD TO FAVORITES")
    console.log(post)
    const postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.loggedUser.id,
        post_id: post.id
      })
    }
      fetch(FAVORITES, postObj)
        .then(resp => resp.json())
        .then(favorites => {
          this.setState({
            ...this.state,
            favorites: favorites
          })
        })
        .catch(err => console.log(err))
  }

  removeFromFavorites = (e, post) => {
    // delete request to /favorites to remove this post from users favorites
    // find the favorite with this post id associated and delete that instance of favorite.
    console.log("REMOVE FROM FAVORITES")
    console.log(post)
    const findFavorite = this.state.favorites.filter(favorite => favorite.id === post.id)
    const favoriteId = findFavorite[0].id
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch(`${FAVORITES}/${favoriteId}`, reqObj)
      .then(resp => resp.json())
      .then(message => console.log(message))
      .catch(err => console.log(err))

  }

  render(){
    return (
      <Router>
        <div className="App">
          <Nav loggedUser={this.state.loggedUser} handleLogOut={this.handleLogOut}/>
          <Switch>
            <Route
              exact path='/'
              render={(props) => <Home {...props} email={this.state.email} password={this.state.password} loggedUser={this.state.loggedUser} handleChange={this.handleChange} handleLogin={this.handleLogin}/>}
              />
            <Route
              exact path='/signup'
              render={(props) => <Signup {...props} users={this.state.users} handleChange={this.handleChange} handleSignup={this.handleSignup} first_name={this.state.first_name} last_name={this.state.last_name} voice_type={this.state.voice_type} email={this.state.email} password={this.state.password}/>}
              />
            <Route
              exact path='/dashboard'
              render={(props) => <Dashboard {...props} users={this.state.users} fetchPosts={this.fetchPosts} loggedUser={this.state.loggedUser} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites}/>}
              />
            <Route
              exact path='/edit-user'
              render={(props) => <Edituser {...props} users={this.state.users} loggedUser={this.state.loggedUser} handleChange={this.handleChange} first_name={this.state.first_name} last_name={this.state.last_name} voice_type={this.state.voice_type} email={this.state.email} password={this.state.password} headshot={this.state.headshot} resume={this.state.resume} degree={this.state.degree} institution={this.state.institution} website={this.state.website} biography={this.state.biography}/>}
              />
            <Route
              exact path='/new-post'
              render={(props) => <New {...props} users={this.state.users} loggedUser={this.state.loggedUser} handleChange={this.handleChange}/>}
              />
            <Route
              exact path='/favorites'
              render={(props) => <Favorites {...props} loggedUser={this.state.loggedUser} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites}/>}
              />
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// loggedUser: {
//   id: 12,
//   first_name: "Lindsay",
//   last_name: "Mecher",
//   email: "lindsaymecher@gmail.com",
//   password_digest: "$2a$10$LglO.KlIYToo0Ekw7baSN.VyBKfbBpUewp5hwdGi4dl9r38dykBiO",
//   voice_type: "Mezzo-Soprano",
//   biography: "American Mezzo-Soprano",
//   degree: "Master's",
//   institution: "UNC School of the Arts",
//   website: "www.lindsaymecher.com"
// }
