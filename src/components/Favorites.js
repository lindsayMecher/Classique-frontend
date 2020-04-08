import React from 'react';
import Post from './Post';
const API = "http://localhost:3000";

class Favorites extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('token')
    if (!token) {
      this.props.history.push('/')
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };
      fetch(`${API}/current_user`, reqObj)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
    }
  }

  renderFavorites = () => {
    console.log(this.props.favorited_posts)
    debugger
    return this.props.favorited_posts.map(post => {
      const included = !!this.props.posts.find(favePost => favePost.id === post.id)
      return(
        <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
      )
    })
  }

  render(){
    return(
      <div className="dashboard">
        <h1>My Favorites</h1>
        {this.renderFavorites()}
      </div>
    )
  }
}

export default Favorites;
