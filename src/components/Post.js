import React from 'react';

class Post extends React.Component {
  renderFavorites = () => {
    // if this post matches one of this users favorites, the button should say remove from favorites, else say add to favorites
    const userFaves = this.props.loggedUser.favorited_posts
    const filteredFaves = userFaves.filter(fave => fave.id == this.props.post.id)
    // if this post is included in filtered faves then the button should say remove from favorites

    if (filteredFaves.length === 0) {
      return <button onClick={(event, post) => this.props.addToFavorites(event, this.props.post)}>Add To Favorites</button>
    } else {
      return <button onClick={(event, post) => this.props.removeFromFavorites(event, this.props.post)}>Remove From Favorites</button>
    }
    // ternary if true render Add to Faves if false render remove from faves
  }
  render(){
    console.log(this.props.loggedUser.favorited_posts)
    console.log(this.props.post)
    return(
      <div className="post">
        <h2>{this.props.post.voice_type} needed for {this.props.post.performance_type} on {this.props.post.stringified_date} at {this.props.post.stringified_time}</h2>
        <p>Repertoire: {this.props.post.repertoire}</p>
        <p>Venue Name: {this.props.post.venue_name}</p>
        <p>Address: {this.props.post.street_address}, {this.props.post.city}, {this.props.post.state} {this.props.post.zip}</p>
        <p>Contact: {this.props.post.contact_first_name} {this.props.post.contact_last_name} by email at {this.props.post.contact_email}</p>
        <p>Additional Notes: {this.props.post.notes}</p>
        <p>This is {this.props.post.paid === true ? "a paid" : "an unpaid"} opportunity.</p>
        <button><a href={`mailto:${this.props.post.contact_email}?Subject=Application to ${this.props.post.performance_type} Posting on Classical Singer Connection`} target="_top">Apply By Email</a></button>
        {this.renderFavorites()}
      </div>
    )
  }
}

export default Post;

// the post will an interpolated paragraph using the info the user posted. The info is detailed and can be filtered based on all criteria.  ie. voice type, date, city, etc.
