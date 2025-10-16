import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
        const filteredPosts = this.props.posts.filter(post => post.user_id === this.props.loggedUser.id)
        if (filteredPosts.length === 0) {
          return(
            <>
              <br/>
              <br/>
              <h3 className="headers">
                You don't have any current posts. <Link to="/new-post">Make a new post!</Link>
              </h3>
              <br/>
              <br/>
              <br/>
              <br/>
            </>
          )
        }
        return filteredPosts.map(post => {
            return <Post key={post.id} post={post} updateUser={this.props.updateUser} deletePost={this.props.deletePost} editPost={this.props.editPost} loggedUser={this.props.loggedUser} />
        })
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
                  </div>  
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