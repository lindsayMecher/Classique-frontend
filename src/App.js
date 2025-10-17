import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Myposts from './components/Myposts';
import Edituser from './components/Edituser';
import About from './components/About';
import New from './components/New';
import Favorites from './components/Favorites';
import { Jumbotron } from './components/Jumbotron';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

const localHost = "http://localhost:3000";
const USERS = `${localHost}/users`;
const POSTS = `${localHost}/posts`;
const FAVORITES = `${localHost}/favorites`;

function App() {

  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorited_posts, setFavoritedPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    fetch(POSTS)
      .then(resp => resp.json())
      .then(posts => {
        setPosts(posts);
      })
      .catch(err => console.log(err))
  }, []);

  const fetchPosts = () => {
    fetch(POSTS)
      .then(resp => resp.json())
      .then(posts => {
        setPosts(posts);
      })
      .catch(err => console.log(err))
  }

  const handleLogOut = () => {

    localStorage.removeItem('token');
    setPosts([]);
    setFavorites([]);
    setFavoritedPosts([]);
    setLoggedUser(null);
    // TODO: fix this
    window.location.href = "http://localhost:3001/home";
  }

  const handleSignup = (e, userObj) => {
    // scrape form data and save it into an object to post to the db as a new user.
    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        honorific: userObj.honorific,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        voice_type: userObj.voice_type,
        email: userObj.email,
        password: userObj.password,
        pronouns: userObj.pronouns
      })
    }
    console.log(userObj);
    fetch(USERS, reqObj)
      .then(resp => resp.json())
      .then(() => {
        console.log('successfully registered')
        alert("Successfully registered! Enter email and password to log in.")
      })
      .catch(err => console.log(err))
      e.target.reset();
      // TODO FIX THIS REDIRECT... ON THE CHILD COMPONENT???
      // navigate('/');
  }

  const addToFavorites = (e, post) => {

    const postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: loggedUser.id,
        post_id: post.id
      })
    }
      fetch(FAVORITES, postObj)
        .then(resp => resp.json())
        .then(new_fave => {
          // CHECK FOR THE FAVORITE OBJ TO ADD TO THE FAVORITES STATE
          const faveObj = {
            id: new_fave.id,
            user_id: loggedUser.id,
            post_id: new_fave.post.id
          }
          setFavoritedPosts([...favorited_posts, new_fave.post]);
          setFavorites([...favorites, faveObj]);
        })
        .catch(err => console.log(err))
  }

  const removeFromFavorites = (e, post) => {
    // take the favorite Id from the favorites state array,
    // delete from favorites using that id
    // receive that obj back from the db, and then remove that obj from the favorites and favorited_posts
    // collect the fave id of this post.
    const findFavorite = favorites.filter(favorite => favorite.post_id === post.id)
    const favoriteId = findFavorite[0].id
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    // const faveObj = {
    //   id: new_fave.id,
    //   user_id: loggedUser.id,
    //   post_id: new_fave.post.id
    // }
    fetch(`${FAVORITES}/${favoriteId}`, reqObj)
      .then(resp => resp.json())
      .then(obj => {
        // obj coming back is the fave that just got deleted.
        // remove the fave from the favorites array,
        // remove the fave from the favorited posts array also and update state
        const newFaves = favorites.filter(fave => fave.id !== obj.id)
        const filteredFP = favorited_posts.filter(fp => fp.id !== obj.post.id)
        setFavorites(newFaves);
        setFavoritedPosts(filteredFP);
        // refresh the page so the favorites reload.
      })
      .catch(err => console.log(err))

  }

  const updateUser = (data) => {
    setLoggedUser(data['user']);
    setFavorites(data['favorites']);
    setFavoritedPosts(data['favorited_posts']);
  }

  const handleEdit = (e, userObj) => {
    e.preventDefault()
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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
        pronouns: userObj.pronouns
      })
    }

    fetch(`${USERS}/${loggedUser.id}`, reqObj)
      .then(resp => resp.json())
      .then(user => {
        setLoggedUser(user);
        setPosts(user.posts);
        setFavorites(user.favorites);
        setFavoritedPosts(user.favorited_posts);
      })
      .catch(err => console.log(err))
      alert("Successfully updated!");
  }

  const updateFavorites = (data) => {
    setFavorites(data['favorites']);
    setFavoritedPosts(data['favorited_posts']);
  }

  const handleNewPost = (e, postObj) => {
    e.preventDefault();
    // use loggedUser ID to post new post to database. post to /posts with user_id: loggedUser.id
    //  when sending to back end, send contact info as loggedUser.first_name etc.
    const contact_first_name = loggedUser.first_name;
    const contact_last_name = loggedUser.last_name;
    const contact_email = loggedUser.email;
    const user_honorific = loggedUser.honorific;
    const user_id = loggedUser.id;
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        performance_type: postObj.performance_type,
        voice_type: postObj.voice_type,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venue_name,
        street_address: postObj.street_address,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        contact_first_name: contact_first_name,
        contact_last_name: contact_last_name,
        contact_email: contact_email,
        user_honorific: user_honorific,
        paid: postObj.paid,
        user_id
      })
    }
    fetch(POSTS, reqObj)
      .then(resp => resp.json())
      .then(post => {
        setPosts([...posts, post]);
      })
      .catch(err => console.log(err))
      // TODO FIX THIS
      // navigate('/dashboard');
  }

  const deletePost = (e, postId) => {
    const deleteObj = {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }
    fetch(`${POSTS}/${postId}`, deleteObj)
      .then(resp => resp.json())
      .then(message => {
        console.log(message);
        fetch(POSTS)
            .then(resp => resp.json())
            .then(data => {
              setPosts(data);
            })
      })
      .catch(err => console.log(err))
  }

  const editPost = (e, postObj, props) => {
    e.preventDefault();
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: postObj.postId,
        performance_type: postObj.performance_type,
        voice_type: postObj.voice_type,
        date: postObj.date,
        time: postObj.time,
        venue_name: postObj.venue_name,
        street_address: postObj.street_address,
        address_line_two: postObj.address_line_two,
        city: postObj.city,
        state: postObj.state,
        zip: postObj.zip,
        repertoire: postObj.repertoire,
        notes: postObj.notes,
        user_honorific: loggedUser.honorific,
        contact_first_name: loggedUser.first_name,
        contact_last_name: loggedUser.last_name,
        contact_email: loggedUser.email,
        paid: postObj.paid
      })
    }
    fetch(`${POSTS}/${postObj.postId}`, reqObj)
      .then(resp => resp.json())
      .then(postData => {
          console.log(postData)
          fetch(POSTS)
            .then(resp => resp.json())
            .then(data => {
              setPosts(data);
            })
      })
      .catch(err => console.log(err))
      window.location.href = "http://localhost:3001/my-posts"
  }

    return (
      <React.Fragment>
        <Router>
          <div className="App">
            <NavigationBar loggedUser={loggedUser} handleLogOut={handleLogOut}/>
            <Jumbotron />
            <Layout>
              <Routes>
                <Route
                  path='/'
                  element={<Home updateUser={updateUser} loggedUser={loggedUser} />}
                />
                <Route
                  path="/signup"
                  element={<Signup handleSignup={handleSignup} />}
                />
                <Route
                  path='/dashboard'
                  element={
                    <Dashboard updateUser={updateUser}
                      posts={posts} loggedUser={loggedUser} addToFavorites={addToFavorites}
                      removeFromFavorites={removeFromFavorites} favorited_posts={favorited_posts} />
                    }
                  />
                <Route
                  path='/my-posts'
                  element={
                    <Myposts deletePost={deletePost} editPost={editPost} updateUser={updateUser} fetchPosts={fetchPosts}
                    posts={posts} loggedUser={loggedUser} addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites} favorites={favorites} favorited_posts={favorited_posts}/>
                  }
                  />
                <Route
                  path='/edit-user'
                  element={<Edituser updateUser={updateUser} loggedUser={loggedUser} handleEdit={handleEdit} />}
                  />
                <Route
                  path='/new-post'
                  element={<New updateUser={updateUser} loggedUser={loggedUser} handleNewPost={handleNewPost} />}
                  />
                <Route
                  path='/favorites'
                  element={
                    <Favorites updateUser={updateUser} updateFavorites={updateFavorites}
                    posts={posts} loggedUser={loggedUser} addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites} favorites={favorites} favorited_posts={favorited_posts} />
                  }
                  />
                <Route
                  path='/about'
                  element={<About />}
                  />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </React.Fragment>
    );
}

export default App;
