import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .headers {
    text-align: center;
    padding: 5rem;

    a {
      color: #612da1;
    }

    a:hover {
      color: #612da1;
    }
  }
`;

function MyPosts({ deletePost, editPost, updateUser, posts, loggedUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${LOCALHOST_API}${ENDPOINTS.CURRENT_USER}`, reqObj)
        .then((resp) => resp.json())
        .then((data) => {
          updateUser(data);
        })
        .catch((err) => alert(err));
    }
  }, [navigate]);

  const renderPosts = () => {
    const filteredPosts = posts.filter(
      (post) => post.user_id === loggedUser.id
    );
    if (filteredPosts.length === 0) {
      return (
        <>
          <h3 className="headers">
            You don&apos;t have any current posts.{" "}
            <Link to="/new-post">Make a new post!</Link>
          </h3>
        </>
      );
    }
    return filteredPosts.map((post) => {
      return (
        <Post
          key={post.id}
          post={post}
          updateUser={updateUser}
          deletePost={deletePost}
          editPost={editPost}
          loggedUser={loggedUser}
        />
      );
    });
  };
  return (
    <>
      {loggedUser ? (
        <Styles>
          <div className="container">
            <div className="headers">
              <h1>My Posts</h1>
            </div>
            {renderPosts()}
          </div>
        </Styles>
      ) : null}
    </>
  );
}

export default MyPosts;
