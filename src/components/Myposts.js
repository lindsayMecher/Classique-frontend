import React from 'react';
import MyPost from './MyPost';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
const API = "http://localhost:3000";

const Styles = styled.div`
    .headers {
        text-align: center;

    }
    
`;

class Myposts extends React.Component {

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
        const filteredPosts = this.props.posts.filter(post => post.user_id == this.props.loggedUser.id)
        return filteredPosts.map(post => {
            return <MyPost key={post.id} post={post} loggedUser={this.props.loggedUser} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} />
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
                      <h1>My Posts</h1>
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

export default Myposts;