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
          this.props.updateUser(data)
        })
        .catch(err => console.log(err))
    }
  }

  renderFavorites = () => {
    // stringify methods exist on posts objects.
    // this.props.fetchFavorites()
    // const filteredPosts = this.props.posts.filter(post => post.id === )
    // select the posts that are currently one of my favorite posts.
    // or make a stringified_date and time function


    return this.props.posts.map(post => {
      console.log(this.props.favorites)
      console.log("POST", post)
      const filteredPosts = this.props.favorites.filter(fave => fave.post_id === post.id)
      if (filteredPosts.length === 1) {
        const included = true
        return(
          <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
        )
      } else {
        return
      }
    })
  }

  redirect = () => {
    this.props.history.push('/')
  }

    // renderPosts = () => {
    //   return this.props.posts.map(post => {
    //     const included = !!this.props.favorited_posts.find(favePost => favePost.id === post.id)
    //     // const filtered = this.props.favorites.filter(favePost => favePost.id === post.id)
    //     return(
    //       <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
    //     )
    //   })
    // }

  render(){
    return(
      <div className="favorites">
        { this.props.loggedUser ?
          (
            <div>
              <h1>My Favorites</h1>
              {this.renderFavorites()}
            </div>
          )
          :
           null
        }
      </div>
    )
  }
}

export default Favorites;
