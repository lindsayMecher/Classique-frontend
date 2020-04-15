import React from 'react';
import Post from './Post';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
const API = "http://localhost:3000";

const Styles = styled.div`
    .headers {
        text-align: center;

    }
    
`;

class Dashboard extends React.Component {

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
      <>
        { this.props.loggedUser ?
          (
            <Styles>
              <Container>
                <div className="headers">
                  <br/>
                  <br/> 
                  <h1>Available Opportunities</h1>
                  <br/>
                  <br/>
                  <br/>
                </div>
                {this.renderPosts()}
                <br/>
                <br/>
                <br/>
                <br/>  
              </Container>  
            </Styles>
          )
          :
            null
        }

      </>
    )
  }
}

export default Dashboard;
