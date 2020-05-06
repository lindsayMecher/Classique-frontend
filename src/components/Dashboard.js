import React from 'react';
import Post from './Post';
import Filter from './Filter';
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
    let filteredPosts = this.props.posts.filter(post => post.user_id !== this.props.loggedUser.id)

    // if(this.props.searchTermVoiceType === "All"){
    //   return filteredPosts;
    // }

    if(this.props.searchTermVoiceType !== "All") {
      filteredPosts = filteredPosts.filter(post => post.voice_type.toLowerCase() === this.props.searchTermVoiceType.toLowerCase())
    }

    if(this.props.searchTermCity.toLowerCase() !== "") {
      filteredPosts = filteredPosts.filter(post => {
        return post.city.toLowerCase().indexOf(this.props.searchTermCity.toLowerCase()) !== -1
      })
    }

    if(this.props.searchTermRepertoire.toLowerCase() !== "") {
      filteredPosts = filteredPosts.filter(post => {
        return post.repertoire.toLowerCase().indexOf(this.props.searchTermRepertoire.toLowerCase()) !== -1
      })
    }

    if (filteredPosts.length === 0) {
      return(
        <div>
          <h3 className="headers">No matching opportunities</h3>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
    )
    }

    return filteredPosts.map(post => {
      const included = !!this.props.favorited_posts.find(favePost => favePost.id === post.id)
      // const filtered = this.props.favorites.filter(favePost => favePost.id === post.id)
      return(
        <Post key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} included={included} />
      )
    })
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
                  <Filter handleChange={this.props.handleChange} clearSearchTerms={this.props.clearSearchTerms} />
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
