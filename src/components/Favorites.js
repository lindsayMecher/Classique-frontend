import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

function Favorites({ favorites, posts, loggedUser, addToFavorites, removeFromFavorites, updateUser }) {

  const navigate = useNavigate();
      
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      } else {
        const reqObj = {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
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

  const renderFavorites = () => {
    // stringify methods exist on posts objects.
    // this.props.fetchFavorites()
    // const filteredPosts = this.props.posts.filter(post => post.id === )
    // select the posts that are currently one of my favorite posts.
    // or make a stringified_date and time function
    if (favorites.length === 0 ) {
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
      return posts.map(post => {
        const filteredPosts = favorites.filter(fave => fave.post_id === post.id)
        if (filteredPosts.length === 1) {
          const included = true
          return(
            <Post key={post.id} post={post} loggedUser={loggedUser} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} included={included} />
          )
        } else {
          return null
        }
      })

    }

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
                <h1>{loggedUser.first_name}'s Favorites</h1>
                <br/>
                <br/>
                <br/>
              </div>
              {renderFavorites()}
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

export default Favorites;
