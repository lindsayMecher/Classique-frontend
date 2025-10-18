import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

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

function Myposts({ deletePost, editPost, updateUser,
  posts, loggedUser }){

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/");
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      };
      fetch(`${LOCALHOST_API}${ENDPOINTS.CURRENT_USER}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
          updateUser(data);
        })
        .catch(err => console.log(err))
    }
  }, [navigate]);
    
  const renderPosts = () => {
    const filteredPosts = posts.filter(post => post.user_id === loggedUser.id)
    if (filteredPosts.length === 0) {
      return(
        <>
          <br/>
          <br/>
          <h3 className="headers">
            You don&apos;t have any current posts. <Link to="/new-post">Make a new post!</Link>
          </h3>
          <br/>
          <br/>
          <br/>
          <br/>
        </>
      )
    }
    return filteredPosts.map(post => {
      return <Post key={post.id} post={post} updateUser={updateUser} deletePost={deletePost} editPost={editPost} loggedUser={loggedUser} />
    })
  }
  return(
    <>
      { loggedUser ?
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
              {renderPosts()}
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

export default Myposts;