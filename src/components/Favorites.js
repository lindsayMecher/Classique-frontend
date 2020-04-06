import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
const USERS = "http://localhost:3000/users";
const POSTS = "http://localhost:3000/posts"

class Favorites extends React.Component {
  constructor(){
    super()
    this.state = {
      favorited_posts: []
    }
  }

  componentDidMount(){
    fetch(`${USERS}/${this.props.loggedUser.id}`)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          favorited_posts: user.favorited_posts
        })
      })
      .catch(err => console.log(err))
  }

  renderPosts = () => {
    console.log("post!")
    return this.state.favorited_posts.map(post => {
      return(
        <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites}/>
      )
    })
  }

  render(){
    return(
      <div className="dashboard">
        <h1>My Favorites</h1>
        {this.renderPosts()}
      </div>
    )
  }
}

export default Favorites;
