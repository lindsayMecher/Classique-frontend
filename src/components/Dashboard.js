import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
const USERS = "http://localhost:3000/users";
const POSTS = "http://localhost:3000/posts"

class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      posts: []
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


  renderPosts = () => {
    // this.props.fetchPosts()
    console.log("post!")
    return this.state.posts.map(post => {
      return(
        <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites}/>
      )
    })
  }

  render(){
    console.log(this.props.loggedUser)
    return(
      <div className="dashboard">
        <h1>Welcome, {this.props.loggedUser.first_name}!</h1>
        {this.renderPosts()}
      </div>
    )
  }
}

export default Dashboard;
