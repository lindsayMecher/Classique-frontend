import React from 'react';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Myposts from './components/Myposts';
import Edituser from './components/Edituser';
import About from './components/About';
import New from './components/New';
import Favorites from './components/Favorites';
import { Jumbotron } from './components/Jumbotron';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
const USERS = "http://localhost:3000/users";
const POSTS = "http://localhost:3000/posts";
const FAVORITES = "http://localhost:3000/favorites";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      posts: [],
      favorites: [],
      favorited_posts: [],
      loggedUser: null,
      searchTermVoiceType: "All",
      searchTermCity: "",
      searchTermRepertoire: ""
    }
  }

  componentDidMount(){
    fetch(POSTS)
      .then(resp => resp.json())
      .then(posts => {
        this.setState({
          ...this.state,
          posts: posts
        })
      })
      .catch(err => console.log(err))

  }

  fetchPosts = () => {
    fetch(POSTS)
      .then(resp => resp.json())
      .then(posts => {
        this.setState({
          ...this.state,
          posts: posts
        })
      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogOut = () => {

    localStorage.removeItem('token')
    this.setState({
      posts: [],
      favorites: [],
      favorited_posts: [],
      loggedUser: null
    })
    window.location.href = "http://localhost:3001/home"
  }

  handleSignup = (e, props, userObj) => {
    // scrape form data and save it into an object to post to the db as a new user.
    e.preventDefault()
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        honorific: userObj.honorific,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        voice_type: userObj.voice_type,
        email: userObj.email,
        password: userObj.password,
        pronouns: userObj.pronouns
      })
    }
    console.log(userObj)
    fetch(USERS, reqObj)
      .then(resp => resp.json())
      .then(user => {
        console.log('successfully registered')
        alert("Successfully registered! Enter email and password to log in.")
      })
      .catch(err => console.log(err))
      e.target.reset()
      props.history.push('/')
  }

  addToFavorites = (e, post) => {

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
        .then(new_fave => {
          // CHECK FOR THE FAVORITE OBJ TO ADD TO THE FAVORITES STATE
          const faveObj = {
            id: new_fave.id,
            user_id: this.state.loggedUser.id,
            post_id: new_fave.post.id
          }
          this.setState({
            favorited_posts: [...this.state.favorited_posts, new_fave.post],
            favorites: [...this.state.favorites, faveObj]
          })
        })
        .catch(err => console.log(err))
  }

  removeFromFavorites = (e, post) => {
    // take the favorite Id from the favorites state array,
    // delete from favorites using that id
    // receive that obj back from the db, and then remove that obj from the favorites and favorited_posts
    // collect the fave id of this post.
    const findFavorite = this.state.favorites.filter(favorite => favorite.post_id === post.id)
    const favoriteId = findFavorite[0].id
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    // const faveObj = {
    //   id: new_fave.id,
    //   user_id: this.state.loggedUser.id,
    //   post_id: new_fave.post.id
    // }
    fetch(`${FAVORITES}/${favoriteId}`, reqObj)
      .then(resp => resp.json())
      .then(obj => {
        // obj coming back is the fave that just got deleted.
        // remove the fave from the favorites array,
        // remove the fave from the favorited posts array also and update state
        const newFaves = this.state.favorites.filter(fave => fave.id !== obj.id)
        const filteredFP = this.state.favorited_posts.filter(fp => fp.id !== obj.post.id)
        this.setState({
          favorites: newFaves,
          favorited_posts: filteredFP
        })
        // refresh the page so the favorites reload.
      })
      .catch(err => console.log(err))

  }

  updateUser = (data) => {
    console.log("updating user");
    this.setState({
      ...this.state,
      loggedUser: data['user'],
      favorites: data['favorites'],
      favorited_posts: data['favorited_posts']
    })
    console.log(this.state);
  }

  handleEdit = (e, props, userObj) => {
    e.preventDefault()
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        honorific: userObj.honorific,
        headshot: userObj.headshot,
        resume: userObj.resume,
        degree: userObj.degree,
        institution: userObj.institution,
        voice_type: userObj.voice_type,
        biography: userObj.biography,
        website: userObj.website,
        pronouns: userObj.pronouns
      })
    }

    fetch(`${USERS}/${this.state.loggedUser.id}`, reqObj)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          loggedUser: user,
          posts: user.posts,
          favorites: user.favorites,
          favorited_posts: user.favorited_posts
        })
      })
      .catch(err => console.log(err))
      alert("Successfully updated!")
  }

  updateFavorites = (data) => {
    this.setState({
      ...this.state,
      favorites: data['favorites'],
      favorited_posts: data['favorited_posts']
    })
  }

  handleNewPost = (e, props, postObj) => {
    e.preventDefault()
    // use this.props.loggedUser ID to post new post to database. post to /posts with user_id: loggedUser.id
    //  when sending to back end, send contact info as this.props.loggedUser.first_name etc.
    const contact_first_name = this.state.loggedUser.first_name
    const contact_last_name = this.state.loggedUser.last_name
    const contact_email = this.state.loggedUser.email
    const user_honorific = this.state.loggedUser.honorific
    const user_id = this.state.loggedUser.id
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        performance_type: postObj.performance_type,
        voice_type: postObj.voice_type,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venue_name,
        street_address: postObj.street_address,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        contact_first_name: contact_first_name,
        contact_last_name: contact_last_name,
        contact_email: contact_email,
        user_honorific: user_honorific,
        paid: postObj.paid,
        user_id: user_id
      })
    }
    fetch(POSTS, reqObj)
      .then(resp => resp.json())
      .then(post => {
        this.setState({
          posts: [...this.state.posts, post]
        })
      })
      .catch(err => console.log(err))
      props.history.push('/dashboard')
  }

  clearSearchTerms = (e) => {
    this.setState({
      searchTermVoiceType: "All",
      searchTermCity: "",
      searchTermRepertoire: ""
    })
  }

  deletePost = (e, postId) => {
    const deleteObj = {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }
    fetch(`${POSTS}/${postId}`, deleteObj)
      .then(resp => resp.json())
      .then(message => {
        console.log(message)
        fetch(POSTS)
            .then(resp => resp.json())
            .then(data => {
              this.setState({
                posts: data
              })
            })
      })
      .catch(err => console.log(err))
  }

  editPost = (e, postObj, props) => {
    e.preventDefault()
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: postObj.postId,
        performance_type: postObj.performance_type,
        voice_type: postObj.voice_type,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venue_name,
        street_address: postObj.street_address,
        address_line_two: postObj.address_line_two,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        user_honorific: this.state.loggedUser.honorific,
        contact_first_name: this.state.loggedUser.first_name,
        contact_last_name: this.state.loggedUser.last_name,
        contact_email: this.state.loggedUser.email,
        paid: postObj.paid
      })
    }
    fetch(`${POSTS}/${postObj.postId}`, reqObj)
      .then(resp => resp.json())
      .then(postData => {
          console.log(postData)
          fetch(POSTS)
            .then(resp => resp.json())
            .then(data => {
              this.setState({
                posts: data
              })
            })
      })
      .catch(err => console.log(err))
      window.location.href = "http://localhost:3001/my-posts"
  }

  render(){
    return (
      <React.Fragment>
        <Router>
          <div className="App">
            <NavigationBar loggedUser={this.state.loggedUser} handleLogOut={this.handleLogOut}/>
            <Jumbotron />
            <Layout>
              <Routes>
                <Route
                  path='/'
                  element={<Home updateUser={this.updateUser} loggedUser={this.state.loggedUser} />}
                />
                <Route
                  path="/signup"
                  element={<Signup handleSignup={this.handleSignup} />}
                />
                <Route
                  path='/dashboard'
                  element={
                    <Dashboard clearSearchTerms={this.clearSearchTerms} handleChange={this.handleChange}
                      searchTermVoiceType={this.state.searchTermVoiceType} searchTermCity={this.state.searchTermCity}
                      searchTermRepertoire={this.state.searchTermRepertoire} updateUser={this.updateUser} fetchPosts={this.fetchPosts}
                      posts={this.state.posts} loggedUser={this.state.loggedUser} addToFavorites={this.addToFavorites}
                      removeFromFavorites={this.removeFromFavorites} favorites={this.state.favorites} favorited_posts={this.state.favorited_posts} />
                    }
                  />
                <Route
                  path='/my-posts'
                  element={
                    <Myposts deletePost={this.deletePost} editPost={this.editPost} updateUser={this.updateUser} fetchPosts={this.fetchPosts}
                    posts={this.state.posts} loggedUser={this.state.loggedUser} addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites} favorites={this.state.favorites} favorited_posts={this.state.favorited_posts}/>
                  }
                  />
                <Route
                  path='/edit-user'
                  element={<Edituser updateUser={this.updateUser} loggedUser={this.state.loggedUser} handleEdit={this.handleEdit} />}
                  />
                <Route
                  path='/new-post'
                  element={<New updateUser={this.updateUser} loggedUser={this.state.loggedUser} handleNewPost={this.handleNewPost} />}
                  />
                <Route
                  path='/favorites'
                  element={
                    <Favorites fetchFavorites={this.fetchFavorites} updateUser={this.updateUser} updateFavorites={this.updateFavorites}
                    posts={this.state.posts} loggedUser={this.state.loggedUser} addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites} favorites={this.state.favorites} favorited_posts={this.state.favorited_posts} />
                  }
                  />
                <Route
                  path='/about'
                  element={<About />}
                  />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
            
          </div>
          
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
