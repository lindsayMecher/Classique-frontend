import React from 'react';
import Post from './Post';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const API = "http://localhost:3000";

const Styles = styled.div`
    .headers {
        text-align: center;

        a {
          color: #612da1;
        }
      
        a:hover {
           color: #612da1;
        }
    }   
`;

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
    if (this.props.favorites.length === 0 ) {
      return (
        <>
        <br/>
        <br/>
        <h3 className="headers" >You currently don't have any favorites!<br/>Head over to the <Link to="/dashboard">Dashboard</Link> to browse opportunities.</h3>
        <br/>
        <br/>
        </>
        )
    } else {
      return this.props.posts.map(post => {
        const filteredPosts = this.props.favorites.filter(fave => fave.post_id === post.id)
        if (filteredPosts.length === 1) {
          const included = true
          return(
            <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
          )
        } else {
          return null
        }
      })

    }

  }

  render(){
    return(
      <>
        { this.props.loggedUser ?
          (
            <Styles>
              <div className="container">
                <div className="headers">
                  <br/>
                  <br/>
                  <h1>{this.props.loggedUser.first_name}'s Favorites</h1>
                  <br/>
                  <br/>
                  <br/>
                </div>
                {this.renderFavorites()}
              </div>
              <br/>
              <br/>
              <br/>
              <br/> 
            </Styles>
          )
          :
          null
        }

      </>
    )
  }
}

export default Favorites;
