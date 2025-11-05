import React, { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import MyPosts from "./components/MyPosts";
import EditUser from "./components/EditUser";
import About from "./components/About";
import New from "./components/New";
import Favorites from "./components/Favorites";
import { Jumbotron } from "./components/Jumbotron";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LOCALHOST_API, ENDPOINTS } from "./constants/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorited_posts, setFavoritedPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    fetch(`${LOCALHOST_API}${ENDPOINTS.POSTS}`)
      .then((resp) => resp.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => alert(err));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setPosts([]);
    setFavorites([]);
    setFavoritedPosts([]);
    setLoggedUser(null);
    alert("Logged Out");
    window.location.href = "http://localhost:3001/home";
  };

  const handleSignup = (e, userObj) => {
    // scrape form data and save it into an object to post to the db as a new user.
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        honorific: userObj.honorific,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        voice_type: userObj.voice_type,
        email: userObj.email,
        password: userObj.password,
        pronouns: userObj.pronouns,
      }),
    };

    fetch(`${LOCALHOST_API}${ENDPOINTS.USERS}`, reqObj)
      .then((resp) => resp.json())
      .then(() => {
        alert("Successfully registered! Enter email and password to log in.");
      })
      .catch((err) => alert(err));
    e.target.reset();
    alert("Signup Successful!");
    window.location.href = "http://localhost:3001/";
  };

  const addToFavorites = (e, post) => {
    const postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: loggedUser.id,
        post_id: post.id,
      }),
    };
    fetch(`${LOCALHOST_API}${ENDPOINTS.FAVORITES}`, postObj)
      .then((resp) => resp.json())
      .then((new_fave) => {
        // CHECK FOR THE FAVORITE OBJ TO ADD TO THE FAVORITES STATE
        const faveObj = {
          id: new_fave.id,
          user_id: loggedUser.id,
          post_id: new_fave.post.id,
        };
        setFavoritedPosts([...favorited_posts, new_fave.post]);
        setFavorites([...favorites, faveObj]);
      })
      .catch((err) => alert(err));
  };

  const removeFromFavorites = (e, post) => {
    // take the favorite Id from the favorites state array,
    // delete from favorites using that id
    // receive that obj back from the db, and then remove that obj from the favorites and favorited_posts
    // collect the fave id of this post.
    const findFavorite = favorites.filter(
      (favorite) => favorite.post_id === post.id
    );
    const favoriteId = findFavorite[0].id;
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const faveObj = {
    //   id: new_fave.id,
    //   user_id: loggedUser.id,
    //   post_id: new_fave.post.id
    // }
    fetch(`${LOCALHOST_API}${ENDPOINTS.FAVORITES}/${favoriteId}`, reqObj)
      .then((resp) => resp.json())
      .then((obj) => {
        // obj coming back is the fave that just got deleted.
        // remove the fave from the favorites array,
        // remove the fave from the favorited posts array also and update state
        const newFaves = favorites.filter((fave) => fave.id !== obj.id);
        const filteredFP = favorited_posts.filter(
          (fp) => fp.id !== obj.post.id
        );
        setFavorites(newFaves);
        setFavoritedPosts(filteredFP);
        // refresh the page so the favorites reload.
      })
      .catch((err) => alert(err));
  };

  const updateUser = (data) => {
    setLoggedUser(data["user"]);
    setFavorites(data["favorites"]);
    setFavoritedPosts(data["favorited_posts"]);
  };

  const handleEdit = (e, userObj) => {
    e.preventDefault();
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        honorific: userObj.honorific,
        headshot: userObj.headshot,
        resume: userObj.resume,
        degree: userObj.degree,
        institution: userObj.institution,
        voice_type: userObj.voice_type,
        biography: userObj.biography,
        website: userObj.website,
        pronouns: userObj.pronouns,
      }),
    };

    fetch(`${LOCALHOST_API}${ENDPOINTS.USERS}/${loggedUser.id}`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        setLoggedUser(user);
        setPosts(user.posts);
        setFavorites(user.favorites);
        setFavoritedPosts(user.favorited_posts);
      })
      .catch((err) => alert(err));
    alert("Successfully updated!");
  };

  // const updateFavorites = (data) => {
  //   setFavorites(data["favorites"]);
  //   setFavoritedPosts(data["favorited_posts"]);
  // };

  const handleNewPost = (e, postObj) => {
    e.preventDefault();
    // use loggedUser ID to post new post to database. post to /posts with user_id: loggedUser.id
    //  when sending to back end, send contact info as loggedUser.first_name etc.
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        performance_type: postObj.performanceType,
        voice_type: postObj.voiceType,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venueName,
        street_address: postObj.streetAddress,
        address_line_two: postObj.streetAddress2,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        contact_first_name: loggedUser.first_name,
        contact_last_name: loggedUser.last_name,
        contact_email: loggedUser.email,
        user_honorific: loggedUser.honorific,
        paid: postObj.paid,
        user_id: loggedUser.id,
      }),
    };
    fetch(`${LOCALHOST_API}${ENDPOINTS.POSTS}`, reqObj)
      .then((resp) => resp.json())
      .then((post) => {
        setPosts([...posts, post]);
        alert("Successfully created!");
        window.location.href = "http://localhost:3001/my-posts";
      })
      .catch((err) => alert(err));
  };

  const deletePost = (e, postId) => {
    const deleteObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(`${LOCALHOST_API}${ENDPOINTS.POSTS}/${postId}`, deleteObj)
      .then((resp) => resp.json())
      .then(() => {
        alert("Successfully Deleted");
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((err) => alert(err));
  };

  const editPost = (e, postObj) => {
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        performance_type: postObj.performanceType,
        voice_type: postObj.voiceType,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venueName,
        street_address: postObj.streetAddress,
        address_line_two: postObj.streetAddress2,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        user_honorific: loggedUser.honorific,
        contact_first_name: loggedUser.first_name,
        contact_last_name: loggedUser.last_name,
        contact_email: loggedUser.email,
        paid: postObj.paid,
      }),
    };

    fetch(`${LOCALHOST_API}${ENDPOINTS.POSTS}/${postObj.postId}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        alert("Successfully Updated");
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === data.id ? data : post))
        );
      })
      .catch((err) => alert(err));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar loggedUser={loggedUser} handleLogOut={handleLogOut} />
        <Jumbotron />
        <Layout>
          <Routes>
            <Route path="/" element={<Home updateUser={updateUser} />} />
            <Route
              path="/signup"
              element={<Signup handleSignup={handleSignup} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  updateUser={updateUser}
                  posts={posts}
                  loggedUser={loggedUser}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  favorited_posts={favorited_posts}
                />
              }
            />
            <Route
              path="/my-posts"
              element={
                <MyPosts
                  deletePost={deletePost}
                  editPost={editPost}
                  updateUser={updateUser}
                  posts={posts}
                  loggedUser={loggedUser}
                />
              }
            />
            <Route
              path="/edit-user"
              element={
                <EditUser
                  updateUser={updateUser}
                  loggedUser={loggedUser}
                  handleEdit={handleEdit}
                />
              }
            />
            <Route
              path="/new-post"
              element={
                <New updateUser={updateUser} handleNewPost={handleNewPost} />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  updateUser={updateUser}
                  posts={posts}
                  loggedUser={loggedUser}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  favorites={favorites}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
