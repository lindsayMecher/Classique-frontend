const fetchPostsSuccess = (posts) => {
   return {
      type: 'FETCH_POSTS_SUCCESS',
      posts: posts
    }
}


export const thunkFetchPosts = () => {
  return function(dispatch) {
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(posts => {
      console.log('POSTS', posts)
      dispatch(fetchPostsSuccess(posts))
    })
  };
}
