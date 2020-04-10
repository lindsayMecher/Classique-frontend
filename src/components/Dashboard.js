import React from 'react';
import Post from './Post';
const API = "http://localhost:3000";

class Dashboard extends React.Component {

  componentDidMount(){
    if (this.props.loggedUser !== null) {
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
    } else {
      this.props.history.push('/')
    }
  }

  renderPosts = () => {
    return this.props.posts.map(post => {
      const included = !!this.props.favorited_posts.find(favePost => favePost.id === post.id)
      // const filtered = this.props.favorites.filter(favePost => favePost.id === post.id)
      return(
        <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
      )
    })
  }

  redirect = () => {
    this.props.history.push('/')
  }

  render(){
    return(
      <div className="dashboard">
        { localStorage.token && this.props.loggedUser !== null ?
          (
            <div>
              <h1>Welcome, {this.props.loggedUser.first_name}!</h1>
              {this.renderPosts()}
            </div>
          )
          :
            this.redirect()
        }

      </div>
    )
  }
}

export default Dashboard;
