import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import Filter from "./Filter";
import styled from "styled-components";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .headers {
    text-align: center;
  }
`;

function Dashboard({
  updateUser,
  posts,
  loggedUser,
  addToFavorites,
  removeFromFavorites,
  favorited_posts,
}) {
  const [searchTermVoiceType, setSearchTermVoiceType] = useState("All");
  const [searchTermCity, setSearchTermCity] = useState("");
  const [searchTermRepertoire, setSearchTermRepertoire] = useState("");
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
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  const clearSearchTerms = () => {
    setSearchTermVoiceType("All");
    setSearchTermCity("");
    setSearchTermRepertoire("");
  };

  const renderPosts = () => {
    let filteredPosts = posts.filter((post) => post.user_id !== loggedUser.id);

    if (searchTermVoiceType !== "All") {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.voice_type.toLowerCase() === searchTermVoiceType.toLowerCase(),
      );
    }

    if (searchTermCity.toLowerCase() !== "") {
      filteredPosts = filteredPosts.filter((post) => {
        return (
          post.city.toLowerCase().indexOf(searchTermCity.toLowerCase()) !== -1
        );
      });
    }

    if (searchTermRepertoire.toLowerCase() !== "") {
      filteredPosts = filteredPosts.filter((post) => {
        return (
          post.repertoire
            .toLowerCase()
            .indexOf(searchTermRepertoire.toLowerCase()) !== -1
        );
      });
    }

    if (filteredPosts.length === 0) {
      return (
        <div>
          <h3 className="headers">No matching opportunities</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    }

    return filteredPosts.map((post) => {
      const included = !!favorited_posts.find(
        (favePost) => favePost.id === post.id,
      );
      // const filtered = favorites.filter(favePost => favePost.id === post.id);
      return (
        <Post
          key={post.id}
          post={post}
          updateUser={updateUser}
          loggedUser={loggedUser}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          included={included}
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
              <br />
              <br />
              <h1>Available Opportunities</h1>
              <br />
              <br />
              <br />
              <Filter
                clearSearchTerms={() => clearSearchTerms()}
                searchTermVoiceType={searchTermVoiceType}
                setSearchTermVoiceType={setSearchTermVoiceType}
                searchTermCity={searchTermCity}
                setSearchTermCity={setSearchTermCity}
                searchTermRepertoire={searchTermRepertoire}
                setSearchTermRepertoire={setSearchTermRepertoire}
              />
            </div>
            {renderPosts()}
            <br />
            <br />
            <br />
            <br />
          </div>
        </Styles>
      ) : null}
    </>
  );
}

export default Dashboard;
